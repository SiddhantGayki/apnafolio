// // src/components/Spinner.jsx
// export default function Spinner() {
//   return (
//     <div style={{ textAlign: "center", padding: 10 }}>
//       <div className="loader" />
//       <style>{`
//         .loader {
//           width: 28px;
//           height: 28px;
//           border: 4px solid rgba(0,0,0,0.1);
//           border-top-color: #121212;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//           display:inline-block;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// // }
// export default function Spinner({ size = 48, label }) {
//   return (
//     <div className="af-spinner-wrap">
//       <div
//         className="af-spinner"
//         style={{ width: size, height: size }}
//       />

//       {label && <p className="af-spinner-text">{label}</p>}

//       <style>{`
//         .af-spinner-wrap {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 14px;
//           padding: 20px;
//         }

//         .af-spinner {
//           position: relative;
//           border-radius: 50%;
//           border: 3px solid rgba(255,255,255,0.12);
//           border-top-color: #4f6fff;
//           animation: spin 0.9s linear infinite;

//           background: radial-gradient(
//             circle at center,
//             rgba(79,111,255,0.25),
//             rgba(5,8,22,0.95)
//           );

//           box-shadow:
//             0 0 18px rgba(79,111,255,0.6),
//             inset 0 0 12px rgba(255,255,255,0.08);
//         }

//         /* Glow pulse ring */
//         .af-spinner::after {
//           content: "";
//           position: absolute;
//           inset: -6px;
//           border-radius: 50%;
//           border: 2px solid rgba(79,111,255,0.35);
//           animation: pulse 1.6s ease-out infinite;
//         }

//         .af-spinner-text {
//           font-size: 0.95rem;
//           font-weight: 500;
//           color: #aab1ff;
//           letter-spacing: 0.2px;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         @keyframes pulse {
//           0% {
//             transform: scale(0.85);
//             opacity: 0.6;
//           }
//           100% {
//             transform: scale(1.35);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }







export default function Spinner({
  size = 48,
  label,
  overlay = false,
  inline = false
}) {
  return (
    <div
      className={`af-spinner-wrap 
        ${overlay ? "af-overlay" : ""} 
        ${inline ? "af-inline" : ""}`}
    >
      <div
        className="af-spinner"
        style={{ width: size, height: size }}
      />

      {label && !inline && (
        <p className="af-spinner-text">{label}</p>
      )}

      <style>{`
        .af-spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        /* INLINE MODE (inside button) */
        .af-inline {
          display: inline-flex;
          padding: 0;
          gap: 0;
        }

        /* OVERLAY MODE */
        .af-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,8,22,0.85);
          backdrop-filter: blur(6px);
          z-index: 99999;
        }

        .af-spinner {
          position: relative;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.12);
          border-top-color: #4f6fff;
          animation: spin 0.9s linear infinite;

          background: radial-gradient(
            circle at center,
            rgba(79,111,255,0.25),
            rgba(5,8,22,0.95)
          );

          box-shadow:
            0 0 18px rgba(79,111,255,0.6),
            inset 0 0 12px rgba(255,255,255,0.08);
        }

        .af-spinner::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(79,111,255,0.35);
          animation: pulse 1.6s ease-out infinite;
        }

        .af-spinner-text {
          font-size: 0.95rem;
          font-weight: 500;
          color: #aab1ff;
          letter-spacing: 0.2px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
