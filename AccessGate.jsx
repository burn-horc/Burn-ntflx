import { useState } from "react";

export default function AccessGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const correctCode = "x-murex"; // change this

  const handleUnlock = () => {
    if (code === correctCode) {
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 400);
    }
  };

  if (unlocked) return children;

  return (
    <div className="gate-wrapper">
      <div className={`gate-card ${error ? "shake" : ""}`}>
        <h1>Private Access</h1>
        <p>Enter your private invite code</p>

        <input
          type="password"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={handleUnlock}>Unlock</button>
      </div>
    </div>
  );
}
