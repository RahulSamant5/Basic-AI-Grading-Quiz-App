export default function QuestionCard({ question, onAnswer }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={{ color: "white", fontSize: "18px" }}>{question}</p>
      <textarea
        rows={3}
        placeholder="Type your answer here..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          resize: "vertical"
        }}
        onChange={(e) => onAnswer(e.target.value)}
      />
    </div>
  );
}
