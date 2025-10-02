import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCard from "./SummaryCard"; // Adjust path as needed
import "./LoanSummaryCards.css";

function LoanSummaryCards() {
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
          alert("Please log in to view loan summary");
          navigate("/login");
          return;
        }

        // Fetch loan data
        const response = await fetch("http://localhost:8080/loansdata", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Please log in to view loan summary");
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

  // Compute summary using fetched data
  const activeLoans = loans.filter((loan) => loan.status === "Active").length;
  const closedLoans = loans.filter((loan) => loan.status === "Closed").length;
  
  // Sum amount and remainingAmount only for Approved and Active loans
  const totalAmount = loans
    .filter((loan) => ["Approved", "Active"].includes(loan.status))
    .reduce((acc, loan) => acc + loan.amount, 0);
  const totalRemaining = loans
    .filter((loan) => ["Approved", "Active"].includes(loan.status))
    .reduce((acc, loan) => acc + loan.remainingAmount, 0);

  return (
    <div className="container my-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 text-center mb-3">
            <SummaryCard value={activeLoans} title="Active Loans" color="#d4edda" icon="🟢" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 text-center mb-3">
            <SummaryCard value={closedLoans} title="Closed Loans" color="#f8d7da" icon="🔴" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 text-center mb-3">
            <SummaryCard value={totalAmount.toLocaleString()} title="Total Amount" color="#d1ecf1" icon="💰" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6 text-center mb-3">
            <SummaryCard value={totalRemaining.toLocaleString()} title="Total Remaining" color="#fff3cd" icon="💸" />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanSummaryCards;