import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";

export default function QuizPage() {
  const navigate = useNavigate();

  const questions = [
    "What is a star, and how does it produce energy?",
    "What is nuclear fusion, and why is it essential for stars?",
    "What determines the color and temperature of a star?",
    "What is a light-year, and what does it measure?",
    "What is a galaxy, and which galaxy is Earth located in?",
    "How is a black hole formed?",
    "What is an exoplanet, and how do scientists detect them?",
    "Explain Node.js.",
    "What is Express.js?",
    "Define REST API.",
    "What is useState?",
    "What is useEffect?",
    "What is the Big Bang Theory, and what evidence supports it?",
    "Why separate frontend and backend?",
    "What is dark matter, and why do scientists believe it exists?",
    "Define middleware in Express.",
    "What is a database schema?",
    "What is redshift, and what does it tell us about the universe?",
    "What are the stages in the life cycle of a star?",
    "Explain the difference between a planet and a dwarf planet?",
    "What is a supernova, and what causes it?",
    "What is the Doppler effect, and how is it used in astronomy?",
    "What is a light curve in astronomy?",
    "Define a photon and its significance in physics.",
    "What is gravitational lensing?",
    "What are the primary colors of visible light?",
    "Explain the difference between synchronous and asynchronous code in JavaScript.",
    "What is a closure in JavaScript?",
    "What is the significance of cosmic microwave background radiation?",
    "What is a nebula, and how does it relate to star formation?"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const submitAllAnswers = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < questions.length; i++) {
        if (answers[i].trim().length > 0) {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/save-answer`, {
            question: questions[i],
            answer: answers[i],
          });
         


        }
      }
      alert("All answers saved to MongoDB!");
    } catch (error) {
      console.error(error);
      alert("Failed to save answers.");
    } finally {
      setLoading(false);
    }
  };

  const goToGrading = () => {
    navigate('/grading');
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>30-Question AI Quiz</h1>
      {questions.map((q, index) => (
        <QuestionCard
          key={index}
          question={q}
          onAnswer={(value) => handleAnswerChange(index, value)}
        />
      ))}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button className="submit-button" onClick={submitAllAnswers} disabled={loading}>
          {loading ? "Saving..." : "Save All Answers"}
        </button>
        <button
          className="submit-button"
          style={{ marginLeft: "20px", background: "#4A40FF" }}
          onClick={goToGrading}
        >
          View Grading Results
        </button>
      </div>
    </div>
  );
}
