import mongoose from "mongoose";

const DB_CON = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");
  } 
  catch (err)
   {
    console.error("DB connection faile", err);
   
  }
};

export default DB_CON;
