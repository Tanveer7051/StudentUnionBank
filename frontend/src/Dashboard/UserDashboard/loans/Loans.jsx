import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Loans.css"; // Create or update this CSS file for styling

function Loan() {
  const [allLoanData, setAllLoanData] = useState(null);
  const [filteredLoans, setFilteredLoans] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check authentication status
        const authResponse = await fetch("http://localhost:8080/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const authData = await authResponse.json();

        if (!authData.isAuthenticated) {
          alert("Please log in to view loan records");
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
            alert("Please log in to view loan records");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch loan records");
        }

        const data = await response.json();
        setAllLoanData(data);
        setFilteredLoans(data); // Initialize filteredLoans with all data
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching loan data:", err);
        setError(err.message || "Failed to fetch loan records");
        setAllLoanData([]);
        setFilteredLoans([]);
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, [navigate]);

  // Filter logic
  useEffect(() => {
    const filtered = allLoanData
      ? allLoanData.filter((loan) => {
          const searchLower = search.toLowerCase();
          const matchesSearch =
            (loan._id?.toString().toLowerCase().includes(searchLower) ||
              loan.loanType?.toLowerCase().includes(searchLower)) &&
            (status === "All" || loan.status === status);
          return matchesSearch;
        })
      : [];
    setFilteredLoans(filtered);
  }, [search, status, allLoanData]);

  // Rendering Logic
  if (isLoading) {
    return <h4 className="text-center p-4">Loading loan records...</h4>;
  }

  if (error) {
    return <h4 className="text-center p-4 text-danger">Error: {error}</h4>;
  }

  const tableBodyContent = filteredLoans && filteredLoans.length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center">
        No loan records found
      </td>
    </tr>
  ) : (
    filteredLoans.map((loan) => (
      <tr key={loan._id}>
        <td>{loan._id}</td>
        <td>{loan.loanType}</td>
        <td>-</td>
        <td>₹{loan.amount.toLocaleString()}</td>
        <td>{loan.interestRate}%</td>
        <td>{loan.duration} months</td>
        <td>{loan.status}</td>
        <td>{new Date(loan.startDate).toLocaleDateString()}</td>
        <td>₹{loan.remainingAmount.toLocaleString()}</td>
        <td>₹{loan.emi.toLocaleString()}</td>
      </tr>
    ))
  );

  return (
    <div className="container loanDataContainer my-4">
      {/* Filter Controls */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control loanFormControl rounded-pill"
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

      {/* Existing Table */}
      <div className="table-responsive">
        <table className="table loanTable table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Interest Rate (%)</th>
              <th>Duration (Months)</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Remaining Amount</th>
              <th>EMI</th>
            </tr>
          </thead>
          <tbody>{tableBodyContent}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Loan;