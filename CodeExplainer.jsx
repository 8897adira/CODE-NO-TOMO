// CodeExplainer.jsx
import React, { useState } from "react";
import "./CodeExplainer.css";
import axios from "axios";

function CodeExplainer() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setError("Please enter some code to explain.");
      return;
    }

    setLoading(true);
    setExplanation("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/explain", {
        code: trimmedCode,
      });
      setExplanation(res.data.explanation);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explainer-container">
      <h1>🧠✨ Kawaii Code Explainer ✨💻</h1>
      <textarea
        placeholder="Paste your magical code here... 💫"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
      />
      <button onClick={handleExplain} disabled={loading || !code.trim()}>
        {loading ? "🔮 Explaining..." : "🌸 Explain with Magic"}
      </button>

      {explanation && (
        <div className="output-box">
          <h2>🌟 Explanation:</h2>
          <pre>{explanation}</pre>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CodeExplainer;
