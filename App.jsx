import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import AccessPage from "./AccessPage";
import CheckerPage from "./CheckerPage";

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [userRole, setUserRole] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const savedCode = localStorage.getItem("access_code");
      const savedRole = localStorage.getItem("role");

      if (!savedCode) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.rpc(
          "verify_access_code",
          { input_code: savedCode }
        );

        if (data?.success) {
          setHasAccess(true);
          setUserRole(savedRole || "free");
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    checkAccess();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_code");
    localStorage.removeItem("role");
    setHasAccess(false);
  };

  if (loading) return null;

  return hasAccess ? (
    <>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <button onClick={handleLogout}>
          Reset Access
        </button>
      </div>
      <CheckerPage userRole={userRole} />
    </>
  ) : (
    <AccessPage
      onAccessGranted={() => {
        const role = localStorage.getItem("role") || "free";
        setUserRole(role);
        setHasAccess(true);
      }}
    />
  );
}
