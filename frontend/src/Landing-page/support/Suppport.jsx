import React from "react";
import "./LandingSupport.css";
import LeftComponent from "../features/LeftComponent";
import Footer from "../Footer";
import NavBar from "../Navbar";
function LandingSupport() {
  return (
    <>

    <div className=" container support-container">
      <div className="row">
           <h2 className="support-title">📞 Contact & Support</h2>
        <p className="support-subtitle">
          Need help? Reach out to us anytime. Our support team is always ready to assist.
        </p>
      </div>


      <div className="row">

        <LeftComponent
          title="Contact Information"
          image="CustomerSupport.png"
          alt="Customer Support Image"
          paragraphFirst={

            <>
              <p style={{ textAlign: "start", lineHeight: "1.8", marginTop: "2rem", paddingLeft: "1rem" }}>
                ✔️ Live chat support </p>
              <p style={{ textAlign: "start", lineHeight: "1.8", paddingLeft: "1rem" }}>
                ✔️ Email & phone assistance  </p>
              <p style={{ textAlign: "start", lineHeight: "1.8", paddingLeft: "1rem" }}>
                ✔️ Quick resolution for all queries
              </p>
            </>
          }
          paragraphSecond={
            <ul style={{ listStyle: "none", textAlign: "start", paddingTop: "1rem", marginBottom: "4rem", lineHeight: "1.8" }}>
              <li><strong>Address:</strong> 123, Student Street, College City</li>
              <li><strong>Email:</strong> support@studentunionbank.com</li>
              <li><strong>Alternate Phone:</strong> +91-9876543211</li>
              <li><strong>Phone:</strong> +91-9876543210</li>
            </ul>
          }
        />
      </div>


      <div className="row  support-card">


          <h4 className="card-title">Send us a Message</h4>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control custom-input" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control custom-input" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <textarea className="form-control custom-input" rows="4" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
      </>
 
  );
}

export default LandingSupport;
