// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/explain", async (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "Invalid or empty code provided." });
  }

  // 👇 MOCK response for testing without OpenAI
  const mockResponse = `🔧 This is a mock explanation for the code:\n\n${code}\n\nIt would normally explain how the code works.`;

  return res.json({ explanation: mockResponse });
});

  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
