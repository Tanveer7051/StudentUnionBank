import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EMIReminder.css"; // Create this CSS file for styling

function EMIReminder() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Check authentication status
        const authResponse = await fetch("http://localhost:8080/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const authData = await authResponse.json();

        if (!authData.isAuthenticated) {
          alert("Please log in to view EMI reminders");
          navigate("/login");
          return;
        }

        // Fetch loan data
        const response = await fetch("http://localhost:8080/loansdata", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Send session cookie
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Please log in to view EMI reminders");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        setLoans(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLoans();
  }, [navigate]);

  const activeLoans = loans.filter((loan) => loan.status === "Active");

  return (
    <div className="container my-5 p-4 shadow rounded-4 bg-light">
      <h4 className="text-center text-primary fw-bold mb-4">🔔 EMI Reminders</h4>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : activeLoans.length > 0 ? (
        <ul className="list-group">
          {activeLoans.map((loan) => (
            <li
              key={loan._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{loan.loanType}</strong> (Loan ID: {loan._id})
              </span>
              <span className="badge bg-warning text-dark">
                Next EMI: ₹{loan.emi.toLocaleString()} (Due soon)
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted">✅ No active EMIs pending.</p>
      )}
    </div>
  );
}

export default EMIReminder;