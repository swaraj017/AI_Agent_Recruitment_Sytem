import express from "express";
import { configDotenv } from "dotenv";
import DB_CON from "./src/db/connection.js";
import authRoute from "./src/routes/userRoutes.js";
import hrRoutes from "./src/routes/hr.js";
import resumeParsing from "./src/ai-model/parsing/upload/upload.js";

import jobApplicationRoutes from "./src/routes/jobSeeker.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import cors from "cors";  

configDotenv();

const app = express();
app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get("/", (req, res) => {
    res.send("Server Working");
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "Server is running",
        message: "AI Agent Recruitment System Backend",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        endpoints: {
            auth: "/api/auth",
            hr: "/api/hr",
            applications: "/api/applications",
            resumeParsing: "/api/resume/read-resume"
        }
    });
});


app.use("/api/auth", authRoute);
app.use("/api/hr", hrRoutes);
app.use("/api/applications", jobApplicationRoutes);
app.use('/api/upload', jobApplicationRoutes);
app.use('/api/resume', resumeParsing);
app.use("/api/resume", resumeRoutes);



async function startServer() {
    try {
        // Optional: Uncomment when MongoDB is ready
        // await DB_CON();
        console.log("Skipping database connection - focusing on parsing feature");
    } catch (err) {
        console.log("Database connection error (continuing without DB):", err.message);
    }
    
    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
