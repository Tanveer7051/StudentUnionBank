import React, { useState, useEffect } from "react";
import ProjectTitle from "../../../ProjectTitle";
import "./LoanForm.css"; 
import SingleButton from "../SingleButton";
import Flash from "../../Flash/Flash";
import { useNavigate } from "react-router-dom";

function LoanForm() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    loanType: "Education",
    amount: "",
    interestRate: "7",  
    duration: "",       
    emi: "",            
    phone: "",
    idProof: "",
    dob: "",
  });

  // Function to calculate EMI
  const calculateEMI = (P, annualInterestRate, years) => {
    if (!P || !annualInterestRate || !years) return "";

    const principal = parseFloat(P);
    const r = parseFloat(annualInterestRate) / 12 / 100; // monthly interest rate
    const n = parseFloat(years) * 12; // total months

    if (r === 0) {
      // If interest rate is 0%, EMI is principal / n
      return (principal / n).toFixed(2);
    }

    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi.toFixed(2);
  };

  // Recalculate EMI whenever amount, interestRate, or duration changes
  useEffect(() => {
    const emi = calculateEMI(formData.amount, formData.interestRate, formData.duration);
    setFormData(prev => ({ ...prev, emi }));
  }, [formData.amount, formData.interestRate, formData.duration]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8080/loan/user-info", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const userInfo = await res.json();
          setFormData(prev => ({
            ...prev,
            fullName: userInfo.fullName || "",
            address: userInfo.address || "",
            dob: userInfo.dob?.slice(0, 10) || "",
            phone: userInfo.phone || "",
            idProof: userInfo.idProof || "",
          }));
        } else {
          console.error("Failed to fetch user info");
          setFlash({type:"error", message:"Failed to fetch user info!."});
        }
      } catch (err) {
        console.error("Error fetching user info", err);
        setFlash({type:"error", message:"Error fetching user info!."});
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setFlash({ type: "", message: "" });

  try {
    const response = await fetch("http://localhost:8080/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...formData, status: "Pending" }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Loan submitted:", data);
      setFlash({ type: "success", message: "Loan created successfully!" });

      setTimeout(() => {
        setFlash({ type: "", message: "" });
        navigate("/dashboard/loan");
      }, 1500);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);

      if (errorData.message === "You have already reached the maximum of 3 loans.") {
        setFlash({ type: "error", message: errorData.message });
        setTimeout(() => {
        setFlash({ type: "", message: "" });
        navigate("/dashboard/loan");
      }, 1500);
      } else {
        setFlash({ type: "error", message: "There was an error creating the loan!" });
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    setFlash({ type: "error", message: "There was an error with the network!" });
  }
};


  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}
      <ProjectTitle />
      <div className="container my-5 p-4 shadow rounded-4 bg-light loan-form-container">
        <h2 className="text-center text-primary fw-bold mb-4">Loan Application</h2>
        <form className="row g-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input type="text" className="form-control rounded-pill" id="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          {/* Address */}
          <div className="col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control rounded-pill" id="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required />
          </div>

          {/* Loan Type */}
          <div className="col-md-4">
            <label htmlFor="loanType" className="form-label">Loan Type</label>
            <select id="loanType" className="form-select rounded-pill" value={formData.loanType} onChange={handleChange} required>
              <option>Education</option>
              <option>Laptop</option>
              <option>Emergency</option>
              <option>Personal</option>
              <option>Other</option>
            </select>
          </div>

          {/* Amount */}
          <div className="col-md-4">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="number" className="form-control rounded-pill" id="amount" min="1000" value={formData.amount} onChange={handleChange} required />
          </div>

          {/* Interest Rate */}
          <div className="col-md-4">
            <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
            <input type="number" className="form-control rounded-pill" id="interestRate" min="1" max="50" value={formData.interestRate} onChange={handleChange} required readOnly />
          </div>

          {/* Duration */}
          <div className="col-md-6">
            <label htmlFor="duration" className="form-label">Duration (years)</label>
            <input type="number" className="form-control rounded-pill" id="duration" min="1" value={formData.duration} onChange={handleChange} required />
          </div>

          {/* EMI */}
          <div className="col-md-6">
            <label htmlFor="emi" className="form-label">EMI</label>
            <input type="text" className="form-control rounded-pill" id="emi" value={formData.emi} readOnly />
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="text" className="form-control rounded-pill" id="phone" maxLength="10" pattern="\d{10}" value={formData.phone} onChange={handleChange} required />
          </div>

          {/* ID Proof */}
          <div className="col-md-6">
            <label htmlFor="idProof" className="form-label">ID Proof</label>
            <input type="text" className="form-control rounded-pill" id="idProof" value={formData.idProof} onChange={handleChange} required readOnly />
          </div>

          {/* DOB */}
          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input type="date" className="form-control rounded-pill" id="dob" value={formData.dob} onChange={handleChange} required />
          </div>

          <SingleButton title="Submit Loan Request" />
        </form>
      </div>
    </>
  );
}

export default LoanForm;
