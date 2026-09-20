import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./Routes/chat.js";

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
  res.send("Working");
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "llama-3.3-70b-versatile",
  //     messages: [
  //       {
  //         role: "user",
  //         content: "Hii tell me about India",
  //       },
  //     ],
  //   }),
  // };

  // try {
  //   const response = await fetch(
  //     "https://api.groq.com/openai/v1/chat/completions",
  //     options
  //   );

  //   const data = await response.json();

  //   if (!response.ok) {
  //     return res.status(response.status).json(data);
  //   }

  //   res.json(data);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({
  //     error: "Something went wrong",
  //   });
  // }
});