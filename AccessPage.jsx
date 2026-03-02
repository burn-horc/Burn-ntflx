import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AccessPage({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    if (!code.trim()) return;

    setLoading(true);

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

      localStorage.setItem("private_access", "true");
      onAccessGranted();
    } else {
      alert("Invalid or already used code");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h2>Private Access</h2>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Access Code"
      />
      <br /><br />
      <button onClick={handleUnlock}>
        {loading ? "Checking..." : "Unlock"}
      </button>
    </div>
  );
}
