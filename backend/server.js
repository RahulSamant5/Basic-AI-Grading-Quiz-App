require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // adjust front-end URL
app.use(express.json());

// === MongoDB Connection ===
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_demo_db";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error:", err));

// === Answer Schema ===
const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model("Answer", answerSchema);

// === Save Answers ===
app.post("/api/save-answer", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const saved = await Answer.findOneAndUpdate(
      { question },
      { answer },
      { upsert: true, new: true }
    );
    res.json({ success: true, saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// === Grade Answers ===
app.get("/api/grade-answers", async (req, res) => {
  try {
    const answers = await Answer.find().sort({ createdAt: -1 }).limit(30);

    if (!answers.length) {
      return res.json({ success: false, message: "No answers to grade." });
    }

    const studentAnswers = answers.map(a => ({
      question: a.question,
      answer: a.answer
    }));

    const py = spawn(process.env.PYTHON_PATH || "python3", ["grade.py"]);
    let output = "";
    let error = "";

    py.stdout.on("data", data => output += data.toString());
    py.stderr.on("data", data => error += data.toString());

    py.stdin.write(JSON.stringify(studentAnswers));
    py.stdin.end();

    py.on("close", code => {
      if (code !== 0 || error) {
        console.error("Python grading error:", error);
        return res.status(500).json({ success: false, error });
      }
      try {
        const grading = JSON.parse(output);
        res.json({ success: true, grading });
      } catch (e) {
        res.status(500).json({ success: false, error: "Failed to parse grading result", details: output });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// === Test Route ===
app.get("/", (req, res) => res.send("Server is running!"));

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
