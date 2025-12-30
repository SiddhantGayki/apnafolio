// src/components/Spinner.jsx
export default function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: 10 }}>
      <div className="loader" />
      <style>{`
        .loader {
          width: 28px;
          height: 28px;
          border: 4px solid rgba(0,0,0,0.1);
          border-top-color: #121212;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display:inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
