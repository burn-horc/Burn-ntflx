import { useState } from "react";

export default function AccessGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const correctCode = "test123";

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
        
        <button onClick={handleUnlock}>Unlock</button>

<div style={{marginTop:"10px", textAlign:"center"}}>
  <p style={{color:"#aaa", fontSize:"13px", marginBottom:"6px"}}>
    Join our community
  </p>

  <a
    href="https://www.facebook.com/burn024/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
      width="22"
    />
  </a>
</div>
      </div>
    </div>
  );
}
