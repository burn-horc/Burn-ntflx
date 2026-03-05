import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import AccessPage from "./AccessPage";
import CheckerPage from "./CheckerPage";

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const savedCode = localStorage.getItem("access_code");
        if (!savedCode) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.rpc(
          "verify_access_code",
          { input_code: savedCode }
        );

        if (!error && data?.success) {
          setHasAccess(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) return null;

  return hasAccess ? (
    <CheckerPage />
  ) : (
    <AccessPage
      onAccessGranted={(code) => {
        localStorage.setItem("access_code", code);
        setHasAccess(true);
      }}
    />
  );
}
