import React from "react";
import Hero from '../home/Hero.jsx';
import './About.css'
function AboutHero() {
    return ( 
        <>
            <Hero/>
        
        <div className="container  aboutUsContainer">
            <div className="row">
        <div className="col">
          <h2 className="text-center mb-4">About Us</h2>
        </div>
      </div>
            <div className="row">
                <div className="col">
                    <h2 className="aboutText1">Student Union Bank Number One Trusted Platform In The World</h2>
                </div>
            </div>
        </div>
       </>
     );
}
export default AboutHero;