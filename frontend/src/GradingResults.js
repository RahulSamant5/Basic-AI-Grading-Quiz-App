import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function GradingResults() {
const navigate = useNavigate();
const [grading, setGrading] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);



const fetchGrading = async () => {
setLoading(true);
setError(null);

try {
console.log("Fetching grading results...");

const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/grade-answers`);




console.log("Response:", res.data);

if (res.data.success) {
setGrading(res.data.grading);
} else {
setError(res.data.message || "Grading failed.");
}
} catch (error) {
console.error("Grading error:", error);
setError(error.response?.data?.error || "Failed to get grading results.");
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchGrading();
}, []);

const getScoreColor = (similarity) => {
if (similarity >= 0.7) return "#10b981"; // green
if (similarity >= 0.5) return "#f59e0b"; // orange
return "#ef4444"; // red
};

const calculateStats = () => {
if (!grading) return { correct: 0, incorrect: 0, total: 0, percentage: 0 };

const correct = grading.filter(g => g.grading.result.includes("✅")).length;
const total = grading.length;
const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

return { correct, incorrect: total - correct, total, percentage };
};

const stats = calculateStats();

return (
<div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
<h1 style={{ color: "white" }}>Grading Results</h1>
<button
className="submit-button"
onClick={() => navigate('/')}
style={{ background: "#6b7280" }}
>
Back to Quiz
</button>
</div>

{loading && (
<div style={{ textAlign: "center", color: "white", fontSize: "18px" }}>
<p>Evaluating answers with AI...</p>
<p style={{ fontSize: "14px", marginTop: "10px" }}>This may take a moment...</p>
</div>
)}

{error && (
<div style={{
background: "#fee2e2",
color: "#991b1b",
padding: "20px",
borderRadius: "12px",
marginBottom: "20px"
}}>
<h3>Error</h3>
<p>{error}</p>
<button
className="submit-button"
onClick={fetchGrading}
style={{ marginTop: "10px" }}
>
Retry
</button>
</div>
)}

{grading && !loading && (
<>
{/* Stats Summary */}
<div style={{
background: "white",
padding: "30px",
borderRadius: "12px",
marginBottom: "30px",
boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
}}>
<h2 style={{ marginBottom: "20px" }}>Summary</h2>
<div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
<div>
<p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "5px" }}>Total Questions</p>
<p style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937" }}>{stats.total}</p>
</div>
<div>
<p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "5px" }}>Correct</p>
<p style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}>{stats.correct}</p>
</div>
<div>
<p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "5px" }}>Incorrect</p>
<p style={{ fontSize: "32px", fontWeight: "bold", color: "#ef4444" }}>{stats.incorrect}</p>
</div>
<div>
<p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "5px" }}>Score</p>
<p style={{ fontSize: "32px", fontWeight: "bold", color: "#4f46e5" }}>{stats.percentage}%</p>
</div>
</div>
</div>

{/* Individual Results */}
<div>
<h2 style={{ color: "white", marginBottom: "20px" }}>Detailed Results</h2>
{grading.map((item, index) => (
<div
key={index}
style={{
background: "white",
padding: "25px",
borderRadius: "12px",
marginBottom: "20px",
boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
}}
>
<div style={{ marginBottom: "15px" }}>
<span style={{
background: "#e5e7eb",
padding: "5px 12px",
borderRadius: "20px",
fontSize: "12px",
fontWeight: "600"
}}>
Question {index + 1}
</span>
</div>

<h3 style={{ marginBottom: "15px", color: "#1f2937" }}>
{item.question}
</h3>

<div style={{
background: "#f9fafb",
padding: "15px",
borderRadius: "8px",
marginBottom: "15px"
}}>
<p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "5px" }}>
Your Answer:
</p>
<p style={{ color: "#374151" }}>{item.answer}</p>
</div>

<div style={{
display: "flex",
alignItems: "center",
gap: "15px",
flexWrap: "wrap"
}}>
<span style={{
fontSize: "18px",
fontWeight: "bold",
padding: "8px 16px",
borderRadius: "8px",
background: item.grading.result.includes("✅") ? "#d1fae5" : "#fee2e2",
color: item.grading.result.includes("✅") ? "#065f46" : "#991b1b"
}}>
{item.grading.result}
</span>

<span style={{
fontSize: "14px",
padding: "6px 12px",
borderRadius: "6px",
background: "#f3f4f6",
color: getScoreColor(item.grading.similarity),
fontWeight: "600"
}}>
Similarity: {(item.grading.similarity * 100).toFixed(0)}%
</span>
</div>

{item.grading.expected && (
<div style={{
marginTop: "15px",
padding: "15px",
background: "#eff6ff",
borderRadius: "8px",
borderLeft: "4px solid #3b82f6"
}}>
<p style={{ fontSize: "14px", color: "#1e40af", marginBottom: "5px", fontWeight: "600" }}>
Expected Answer:
</p>
<p style={{ color: "#1e3a8a" }}>{item.grading.expected}</p>
</div>
)}
</div>
))}
</div>

<div style={{ textAlign: "center", marginTop: "40px" }}>
<button
className="submit-button"
onClick={fetchGrading}
style={{ marginRight: "15px" }}
>
Refresh Results
</button>
<button
className="submit-button"
onClick={() => navigate('/')}
style={{ background: "#6b7280" }}
>
Back to Quiz
</button>
</div>
</>
)}
</div>
);
}