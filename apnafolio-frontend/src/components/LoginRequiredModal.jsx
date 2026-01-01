import { Link } from "react-router-dom";
import "./LoginRequiredModal.css";

export default function LoginRequiredModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Login Required</h3>
        <p>
          Please login to use your personal data and preview this template.
        </p>

        <div className="modal-actions">
          <Link to="/login" className="modal-btn primary">
            Login Now
          </Link>
          <button className="modal-btn ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
