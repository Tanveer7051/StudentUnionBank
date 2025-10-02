import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import "./profile.css";
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/dashboard/profile", {
          method: "GET",
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profileData) {
    return <p>Profile data not available.</p>;
  }

  const { accountNumber, balance, user } = profileData;

 const handleClick = () => {
    navigate('/dashboard/profile/edit');
  };
  return (
    <div className="container mt-5 profileContainer">
      <h2>My Profile</h2>
      <hr />

      <div className="row profileRow">
         <div className="d-flex justify-content-end">
        <button className="loanApply mt-4 mb-4" onClick={handleClick}>
          <AddIcon /> Edit Profile
        </button>
      </div>
        <div className="col-md-6 col-lg-12 profileCol">
          <h4>Personal Details</h4>
          <p><strong>Name:</strong> {user.firstName} {user.middleName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Addressz:</strong> {user.address}</p>
          <p><strong>ID Proof:</strong> {user.idProof}</p>
        </div>
        <div className="row">Bank Account Details</div>
        <div className="col-md-6 col-lg-12 profileCol">
          <h4>Bank Account Details</h4>
          <p><strong>Account Number:</strong> {accountNumber}</p>
          <p><strong>Balance:</strong> ₹{balance.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
