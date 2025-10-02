import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./OpenAccount.css";
import Flash from "../../Flash/Flash"; // ✅ Import Flash

function AccountOpenForm() {
  const [formChanges, setFormChanges] = useState({ Tpin: "" });
  const [flash, setFlash] = useState({ type: "", message: "" }); // ✅ Flash state
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    dob: "",
    idProof: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8080/loan/user-info", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const userInfo = await res.json();
          setUserDetails({
            fullName: userInfo.fullName || "",
            phone: userInfo.phone || "",
            address: userInfo.address || "",
            dob: userInfo.dob?.slice(0, 10) || "",
            idProof: userInfo.idProof || "",
          });
        } else {
          setFlash({ type: "error", message: "Failed to fetch user info." });
        }
      } catch (err) {
        setFlash({ type: "error", message: "Error fetching user info." });
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormChanges((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFlash({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:8080/oppenaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: "Pending",
          Tpin: formChanges.Tpin,
        }),
      });

      if (response.ok) {
        setFlash({ type: "success", message: "Account created successfully!" });
        setTimeout(() => navigate("/dashboard"), 2000); // delay for flash
      } else {
        const errorData = await response.json();
        setFlash({ type: "error", message: errorData.message || "One user can open only one account." });
      }
    } catch (error) {
      setFlash({ type: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}
      <form onSubmit={handleSubmit}>
        <div className="container createAccount-container">
          <div className="createAccount-info">
            <h2>You Are Few Steps Away From Creating an Account</h2>
          </div>

          <div className="createAccount-row">
            <div className="createAccount-col">
              <label>Account Number</label>
              <input type="text" className="createAccount-input" value="Generated automatically" disabled />
            </div>
            <div className="createAccount-col">
              <label>Balance</label>
              <input type="text" className="createAccount-input" value="Generated automatically" disabled />
            </div>
          </div>

          <div className="createAccount-row">
            <div className="createAccount-col">
              <label htmlFor="Tpin">Tpin</label>
              <input
                type="password"
                name="Tpin"
                id="Tpin"
                placeholder="Enter 4 to 6 digit Tpin"
                value={formChanges.Tpin}
                onChange={handleChange}
                required
                pattern="\d{4,6}"
                maxLength="6"
                minLength="4"
                className="createAccount-input"
                inputMode="numeric"
                title="Tpin must be a number between 4 to 6 digits"
              />
            </div>
          </div>

          {/* Read-only user info */}
          <div className="createAccount-row">
            <div className="createAccount-col">
              <label>Full Name</label>
              <input type="text" value={userDetails.fullName} className="createAccount-input" readOnly />
            </div>
            <div className="createAccount-col">
              <label>Phone</label>
              <input type="text" value={userDetails.phone} className="createAccount-input" readOnly />
            </div>
          </div>

          <div className="createAccount-row">
            <div className="createAccount-col">
              <label>Address</label>
              <input type="text" value={userDetails.address} className="createAccount-input" readOnly />
            </div>
            <div className="createAccount-col">
              <label>Date of Birth</label>
              <input type="date" value={userDetails.dob} className="createAccount-input" readOnly />
            </div>
          </div>

          <div className="createAccount-row">
            <div className="createAccount-col">
              <label>ID Proof</label>
              <input type="text" value={userDetails.idProof} className="createAccount-input" readOnly />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="createAccount-checkbox">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="check2" required />
              <label className="form-check-label" htmlFor="check2">
                I agree with <Link to="/privacypolicy">Privacy Policy</Link> and <Link to="/terms&condition">Terms and Conditions</Link>
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="check3" required />
              <label className="form-check-label" htmlFor="check3">
                I understand that misuse of account may lead to termination
              </label>
            </div>
          </div>

          <div className="createAccount-submit">
            <button className="createAccount-btn" type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AccountOpenForm;
