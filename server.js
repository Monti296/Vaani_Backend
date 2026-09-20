import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "/home/ubuntu/vaani-env/.env",
});
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./Routes/chat.js";
import openAiResponse from "./Utils/openai.js"

const app = express();
const PORT = 8181;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log("Hello i am here on 8181");
  dbConection();
});

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connection is secured!");
  } catch (err) {
    console.log(err);
  }
};

app.get("/test", async (req, res) => {
  
const output=await openAiResponse("tell me how to introduce my self in 10 lines.");
res.send(output);
});