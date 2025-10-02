import React, { useState } from "react";
import "./DashboardSupport.css";

function DashboardSupport() {
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Loan EMI Issue", status: "Pending" },
    { id: 2, subject: "Profile Update", status: "Resolved" },
  ]);

  const [newTicket, setNewTicket] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTicket.trim() !== "") {
      setTickets([
        ...tickets,
        { id: tickets.length + 1, subject: newTicket, status: "Pending" },
      ]);
      setNewTicket("");
    }
  };

  return (
    <div className="dashboard-support">
      <h2 className="support-title">🛠 User Support Center</h2>
      <p className="support-subtitle">
        Submit your issue or check status of previous tickets.
      </p>

      <div className="row">
        {/* Submit Ticket */}
        <div className="col-md-5 mb-4">
          <div className="support-card">
            <h4 className="card-title">Create New Ticket</h4>
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control custom-input"
                rows="4"
                placeholder="Describe your issue..."
                value={newTicket}
                onChange={(e) => setNewTicket(e.target.value)}
              ></textarea>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Ticket List */}
        <div className="col-md-7 mb-4">
          <div className="support-card">
            <h4 className="card-title">Your Support Tickets</h4>
            <table className="table table-bordered ticket-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          ticket.status === "Resolved" ? "resolved" : "pending"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSupport;
