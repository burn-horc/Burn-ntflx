import { useState } from "react";

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return (
      <div style={{ color: "black" }}>
        <button onClick={() => setHasAccess(true)}>
          Unlock
        </button>
      </div>
    );
  }

  return <div style={{ color: "black" }}>CHECKER LOADED</div>;
}

