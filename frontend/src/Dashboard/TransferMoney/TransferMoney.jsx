import { useState, useEffect } from "react";
import Flash from "../../Flash/Flash";
import "./TransferMoney.css";
import { useNavigate } from "react-router-dom";

function TransferMoney() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ toAccountNumber: "", amount: "", Tpin: "" });
  const [errors, setErrors] = useState({});
  const [flash, setFlash] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.toAccountNumber.trim()) {
      newErrors.toAccountNumber = "Receiver account number is required";
    } else if (!/^\d{15}$/.test(form.toAccountNumber)) {
      newErrors.toAccountNumber = "Account number must be exactly 15 digits";
    }

    if (!form.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.Tpin.trim()) {
      newErrors.Tpin = "TPIN is required";
    } else if (!/^\d{4,6}$/.test(form.Tpin)) {
      newErrors.Tpin = "TPIN must be 4 to 6 digit numeric value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash({ type: "", message: "" });

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:8080/transfer", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toAccountNumber: form.toAccountNumber,
          amount: Number(form.amount),
          Tpin: Number(form.Tpin),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFlash({ type: "success", message: data.message || "Transfer successful!" });
        setForm({ toAccountNumber: "", amount: "", Tpin: "" }); // Reset form

        // Optional redirect after success
        setTimeout(() => {
          setFlash({ type: "", message: "" });
          navigate("/dashboard"); // change if needed
        }, 2500);
      } else {
        setFlash({ type: "error", message: data.message || "Transfer failed" });
      }
    } catch (err) {
      console.error("Transfer failed", err);
      setFlash({ type: "error", message: "Something went wrong. Try again later." });
    }
  };

  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}

      <form onSubmit={handleSubmit}>
        <div className="container moneyTransferContainer">
          <h2>Send Money</h2>

          {/* Account Number */}
          <div className="form-group mt-4">
            <label htmlFor="toAccountNumber">Receiver Account Number</label>
            <input
              name="toAccountNumber"
              id="toAccountNumber"
              maxLength="15"
              className="form-control"
              placeholder="Enter 15-digit account number"
              value={form.toAccountNumber}
              onChange={handleChange}
            />
            {errors.toAccountNumber && <small className="text-danger">{errors.toAccountNumber}</small>}
          </div>

          {/* Amount */}
          <div className="form-group mt-4">
            <label htmlFor="amount">Enter Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-control"
              placeholder="Amount in ₹"
              value={form.amount}
              onChange={handleChange}
            />
            {errors.amount && <small className="text-danger">{errors.amount}</small>}
          </div>

          {/* TPIN */}
          <div className="form-group mt-4">
            <label htmlFor="Tpin">TPIN</label>
            <input
              type="password"
              name="Tpin"
              id="Tpin"
              autoComplete="new-password"
              className="form-control"
              placeholder="Enter your TPIN"
              value={form.Tpin}
              onChange={handleChange}
              maxLength="6"
            />
            {errors.Tpin && <small className="text-danger">{errors.Tpin}</small>}
          </div>

          {/* Submit Button */}
          <div className="form-group mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Send Money
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TransferMoney;
