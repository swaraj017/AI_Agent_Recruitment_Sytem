import express from "express";
import { configDotenv } from "dotenv";
import DB_CON from "./src/db/connection.js";
import authRoute from "./src/routes/userRoutes.js";
import hrRoutes from "./src/routes/hr.js";


import jobApplicationRoutes from "./src/routes/jobSeeker.js";

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


app.use("/api/auth", authRoute);
app.use("/api/hr", hrRoutes);
app.use("/api/applications", jobApplicationRoutes);



async function startServer() {
    await DB_CON();
    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
