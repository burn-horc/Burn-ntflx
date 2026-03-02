import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AccessPage({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleUnlock = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError(false);

    const { data } = await supabase
      .from("access_codes")
      .select("*")
      .eq("code", code)
      .eq("is_used", false)
      .single();

    if (data) {
      await supabase
        .from("access_codes")
        .update({ is_used: true })
        .eq("id", data.id);

      setFadeOut(true);

      setTimeout(() => {
        localStorage.setItem("private_access", "true");
        onAccessGranted();
      }, 600);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className={`card ${error ? "shake" : ""} ${fadeOut ? "fade" : ""}`}>
        <h2>Private Access</h2>
        <p className="subtitle">Enter your private invite code</p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access Code"
        />

        <button onClick={handleUnlock}>
          {loading ? "Checking..." : "Unlock"}
        </button>
      </div>

      <style>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f0f0f, #1c1c1c, #0a0a0a);
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .card {
          background: #161616;
          padding: 40px 30px;
          border-radius: 20px;
          width: 320px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          transition: all 0.4s ease;
        }

        h2 {
          margin-bottom: 5px;
          font-weight: 600;
          color: white;
        }

        .subtitle {
          color: #888;
          font-size: 14px;
          margin-bottom: 25px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #333;
          background: #0f0f0f;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        input:focus {
          border: 1px solid #5c6cff;
          box-shadow: 0 0 10px rgba(92,108,255,0.6);
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #5c6cff;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background: #7d8aff;
          transform: translateY(-2px);
        }

        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
          100% { transform: translateX(0); }
        }

        .fade {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
