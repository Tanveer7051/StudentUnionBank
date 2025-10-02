import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flash from "../../Flash/Flash"; // Adjust path as necessary

function EditProfile() {
  const navigate = useNavigate();

  const [flash, setFlash] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    state: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/dashboard/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();

        setFormData({
          firstName: data.user.firstName || "",
          middleName: data.user.middleName || "",
          lastName: data.user.lastName || "",
          dob: data.user.dob?.slice(0, 10) || "",
          gender: data.user.gender || "",
          state: data.user.state || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setFlash({ type: "error", message: "Error loading profile" });
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:8080/dashboard/profile/edit", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to update profile");

      setFlash({ type: "success", message: "Profile updated successfully!" });

      setTimeout(() => {
        setFlash({ type: "", message: "" });
        navigate("/dashboard/profile");
      }, 1500);
    } catch (err) {
      console.error("Update error:", err);
      setFlash({ type: "error", message: err.message || "Update failed" });
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <>{flash.message && <Flash type={flash.type} message={flash.message} />}
    <div className="container my-5 p-4 shadow rounded-3 bg-light">
      <h2 className="mb-4 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              className="form-control"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d{10}"
            title="Phone must be 10 digits"
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Update Profile
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default EditProfile;
