import React from "react";
import './About.css'
function AboutUs() {
  return (
    <div className="container mb-4">
      <div className="row">
        {/* Right Column - Image  */}
        <div className="col-lg-6  col-12 col-sm-12 col-md-6 mb-3 mt-4 shadow-sm d-flex flex-column align-items-center justify-content-center">
          <p className="aboutUsText">
            Student Union Bank is committed to delivering secure, reliable, and
            user-friendly financial services. We believe in empowering students
            with banking solutions that fit their needs.
          </p>
          <p className="aboutUsText">
            Our mission is to create a trusted platform where young people can
            manage money smartly, learn financial literacy, and grow with
            confidence.
          </p>
        </div>
         <div className="col-lg-6 col-12 col-sm-12 col-md-6 mt-4 text-center">
          <img 
            src="./Student Bank Union.png"
            alt="About Us"
            className="img-fluid mb-3 mt-4"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
