import React from "react";

function SummaryCard({ title, value, color, icon }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="card shadow-sm p-3 border-0 rounded text-center"
    >
      <div className="mb-2">
        <i className={`bi ${icon} fs-1 text-dark`}></i>
      </div>
      <h5 className="fw-bold text-primary">{icon}{title}</h5>
      <p className="fs-4 fw-semibold">₹{value}</p>
    </div>
  );
}

export default SummaryCard;
