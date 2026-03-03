export default function App() {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return (
      <div style={{ color: "white" }}>
        <button onClick={() => setHasAccess(true)}>
          Unlock
        </button>
      </div>
    );
  }

  return <div style={{ color: "white" }}>CHECKER LOADED</div>;
}
