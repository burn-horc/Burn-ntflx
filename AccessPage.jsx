import { useState } from "react";
import { supabase } from "./supabase";

export default function AccessPage({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = async () => {
    if (!code.trim() || loading) return;

    try {
      setLoading(true);
      setError(false);

      const { data, error: rpcError } = await supabase.rpc(
        "use_access_code",
        { input_code: code }
      );

      if (rpcError || !data?.success) {
        throw new Error("Invalid code");
      }

      localStorage.setItem("access_code", code);
      localStorage.setItem("role", data.role);

      onAccessGranted(code);

    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0d0d0d", color: "white" }}>
      <div style={{ background: "#161616", padding: 40, borderRadius: 20, width: 320, textAlign: "center" }}>
        <h2>Private Access</h2>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access Code"
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            borderRadius: 10,
            border: "1px solid #333",
            background: "#0f0f0f",
            color: "white"
          }}
        />

        <button
          onClick={handleUnlock}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            borderRadius: 10,
            border: "none",
            background: "#5c6cff",
            color: "white",
            fontWeight: 600
          }}
        >
          {loading ? "Checking..." : "Unlock"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 15 }}>
            Invalid code
          </p>
        )}
      </div>
    </div>
  );
}
