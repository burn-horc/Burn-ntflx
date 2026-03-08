import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AccessPage({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleUnlock = async () => {
    if (!code.trim() || loading) return;

    try {
      setLoading(true);
      setError(false);

      const { data, error: rpcError } = await supabase.rpc("use_access_code", {
        input_code: code,
      });

      if (rpcError || !data?.success) {
        throw new Error(data?.error || "Invalid code");
      }

      setFadeOut(true);

      setTimeout(() => {
        localStorage.setItem("access_code", code);
        onAccessGranted();
      }, 800);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className={`card ${error ? "shake" : ""} ${fadeOut ? "fade" : ""}`}>
          <h2>Private Access</h2>
          <p className="subtitle">Enter your private invite code</p>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
          />

          <button onClick={handleUnlock} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Unlock"}
          </button>
        </div>

        <div className="community">
          <p>For private code</p>
          <p>Message me on</p>

          <div className="social-icons">

            <a
              href="https://www.facebook.com/burn024/"
              target="_blank"
              rel="noopener noreferrer"
              className="social fb"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg"
                alt="Facebook"
              />
            </a>

            <a
              href="https://t.me/BURNx24"
              target="_blank"
              rel="noopener noreferrer"
              className="social tg"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
              />
            </a>

          </div>
        </div>
      </div>

      <style>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background:
            radial-gradient(circle at 30% 30%, #1f2a55, transparent 40%),
            radial-gradient(circle at 70% 70%, #3b1f55, transparent 40%),
            #0d0d0d;
        }

        .card {
          background: rgba(22, 22, 22, 0.75);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 45px 35px;
          border-radius: 22px;
          width: 330px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7);
          transition: all 0.5s ease;
        }

        h2 {
          margin-bottom: 6px;
          font-weight: 600;
          color: white;
          letter-spacing: 0.5px;
        }

        .subtitle {
          color: #888;
          font-size: 14px;
          margin-bottom: 28px;
        }

        input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #333;
          background: #0f0f0f;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          margin-bottom: 22px;
          font-size: 15px;
        }

        input:focus {
          border: 1px solid #7c8cff;
          box-shadow: 0 0 14px rgba(124,140,255,0.7);
        }

        button {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-weight: 600;
          font-size: 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(90deg, #5c6cff, #8f5cff, #5c6cff);
          background-size: 200% 200%;
          animation: gradientMove 4s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(92,108,255,0.4);
        }

        button:active {
          transform: scale(0.97);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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

        .community {
          margin-top: 25px;
          text-align: center;
          color: #aaa;
        }

        .social-icons {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 22px;
        }

        .social {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          transition: all .3s ease;
          animation: float 4s ease-in-out infinite;
        }

        .social img {
          width: 24px;
          height: 24px;
        }

        .fb:hover {
          box-shadow: 0 0 15px rgba(24,119,242,0.8);
          transform: scale(1.15);
        }

        .tg:hover {
          box-shadow: 0 0 15px rgba(0,170,255,0.8);
          transform: scale(1.15);
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
