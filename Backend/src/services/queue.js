import amqplib from 'amqplib';

let connection = null;
let confirmChannel = null;
let consumerChannel = null;

async function connectWithRetry(url, retries = 10, delayMs = 2000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const conn = await amqplib.connect(url);
      conn.on('error', (e) => console.error('RabbitMQ connection error:', e.message));
      conn.on('close', () => console.error('RabbitMQ connection closed'));
      return conn;
    } catch (e) {
      attempt++;
      console.error(`RabbitMQ connect failed (attempt ${attempt}/${retries}):`, e.message);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Failed to connect to RabbitMQ');
}

export async function getConfirmChannel() {
  const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  if (!connection) {
    connection = await connectWithRetry(url);
  }
  if (!confirmChannel) {
    confirmChannel = await connection.createConfirmChannel();
    const queueName = process.env.QUEUE_RESUME_PARSE || 'resumes.parse';
    await confirmChannel.assertQueue(queueName, { durable: true });
  }
  return confirmChannel;
}

export async function getConsumerChannel() {
  const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  if (!connection) {
    connection = await connectWithRetry(url);
  }
  if (!consumerChannel) {
    consumerChannel = await connection.createChannel();
    const queueName = process.env.QUEUE_RESUME_PARSE || 'resumes.parse';
    await consumerChannel.assertQueue(queueName, { durable: true });
    await consumerChannel.prefetch(1);
  }
  return consumerChannel;
}
