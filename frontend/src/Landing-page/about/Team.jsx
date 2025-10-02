import React from "react";

function Team() {
  return (
    <div className="contaner mb-4 p-4">
      <div className="row">
      <div className="col-lg-6  text-center mt-4">
  <img 
    src="CEO.jpg" 
    alt="CEO" 
    className="img-fluid rounded-circle mb-3 mt-4" 
    style={{ width: "9rem", height: "9rem", objectFit: "cover" }} 
  />
  <p className="fw-bold mb-0">Founder & CEO</p>
</div>
        <div className="col-lg-6 shadow-sm d-flex flex-column justify-content-center">
          <h2 className="fw-bold mt-4">Our Journey</h2>
          <p className="p-3">
        Student Union Bank was founded in <strong>2025</strong> with a vision to 
        make banking simpler, faster, and more accessible for everyone. What started 
        as a small idea among students has now grown into a trusted platform, 
        helping thousands manage their finances with confidence.
      </p>
      <p className="p-3">
        Hi, I’m <strong>Tanveer Ahmed</strong>, the founder and CEO of Student Union Bank. 
        As a student myself, I understood the struggles of managing money, savings, 
        and transactions with limited resources. That’s why I decided to build a 
        platform that puts <em>students and young professionals first</em>.
      </p>
      <p className="p-3">
        My mission is to ensure that banking feels easy, transparent, and 
        future-ready for the next generation. 🚀
      </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
