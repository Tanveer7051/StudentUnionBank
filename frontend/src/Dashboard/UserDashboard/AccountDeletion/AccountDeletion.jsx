import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Flash from "../../../Flash/Flash";

function AccountDeletion() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [flash, setFlash] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setFlash({ type: "", message: "" });
    setError("");

    if (!reason.trim()) {
      setError("Please provide a reason for account deletion.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to permanently delete your account?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/accountdeletion", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }), // ⬅️ Include reason in request body
      });

      const data = await res.json();

      if (res.ok) {
        setFlash({ type: "success", message: data.message || "Account deleted successfully." });
        setIsAuthenticated(false);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setFlash({ type: "error", message: data.message || "Failed to delete account." });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setFlash({ type: "error", message: "Network error while deleting account." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 p-4 shadow rounded-4 bg-light" style={{ maxWidth: "600px" }}>
      {flash.message && <Flash type={flash.type} message={flash.message} />}

      <h2 className="mb-3 text-danger text-center">Account Deletion</h2>
      <p className="text-center text-muted mb-4">
        This action is <strong>permanent</strong> and will delete all your data. Please tell us why you're leaving:
      </p>

      {/* Reason Input */}
      <div className="mb-3">
        <label htmlFor="reason" className="form-label fw-semibold">Reason for deleting your account</label>
        <textarea
          id="reason"
          className="form-control"
          rows="3"
          placeholder="Please let us know your reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        {error && <small className="text-danger">{error}</small>}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={handleDelete}
          className="btn btn-danger px-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Deleting...
            </>
          ) : (
            "Delete My Account"
          )}
        </button>
      </div>
    </div>
  );
}

export default AccountDeletion;
