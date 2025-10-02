import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanFilter.css"; // Create this CSS file for styling

function LoanFilter() {
  const [allLoans, setAllLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
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
          alert("Please log in to view loans");
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
            alert("Please log in to view loans");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        setAllLoans(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLoans();
  }, [navigate]);

  // Filter logic
  const filteredLoans = allLoans.filter((loan) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (loan._id?.toString().toLowerCase().includes(searchLower) || // Convert _id to string
      loan.loanType?.toLowerCase().includes(searchLower)) &&
      (status === "All" || loan.status === status);
    return matchesSearch;
  });

  return (
    <div className="container my-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          {/* Filter Controls */}
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="🔍 Search by Loan ID or Type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <select
                className="form-select rounded-pill"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Loans</option>
                <option value="Active">Active Loans</option>
                <option value="Closed">Closed Loans</option>
                <option value="Pending">Pending Loans</option>
                <option value="Approved">Approved Loans</option>
                <option value="Rejected">Rejected Loans</option>
              </select>
            </div>
          </div>

          {/* Filtered Loans Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-dark">
                <tr>
                  <th>Loan ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Remaining</th>
                  <th>EMI</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <tr key={loan._id}>
                      <td>{loan._id}</td>
                      <td>{loan.loanType}</td>
                      <td>₹{loan.amount.toLocaleString()}</td>
                      <td>{loan.status}</td>
                      <td>{new Date(loan.startDate).toLocaleDateString()}</td>
                      <td>₹{loan.remainingAmount.toLocaleString()}</td>
                      <td>₹{loan.emi.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted">
                      ❌ No loans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default LoanFilter;