import React from "react";
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FooterCard from "./FooterCard";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <footer >
                <main className="footerCard">
                    <FooterCard
                    title="Quick Links"
                    links={[
                        { label: "Home", to: "/" },
                        { label: "About Us", to: "/aboutUs" },
                        { label: "Service", to: "/feature" }
                    ]}
                />

                <FooterCard
                    title="Help & Resources"
                    links={[
                        { label: "Contact Support", to: "/contact&support" },
                        { label: "Blog", to: "/blog" },
                        { label: "Give Feedback", to: "/services" }
                    ]}
                />

                <FooterCard
                    title="Terms & Policies"
                    links={[
                        { label: "Cookie Policy", to: "/cookiepolicy" },
                        { label: "Privacy Policy", to: "/privacypolicy" },
                        { label: "Terms & Conditions", to: "/terms&condition" }
                    ]}
                />

                <FooterCard
                    title="Contact Us"
                    links={[
                        { label:
                            <>
                            <PhoneIcon/>
                             +917051793578
                             </>
                        },
                        { label:
                            <>
                            <EmailIcon/>
                            studentunionbank@gmail.com
                            </>
                        },
                        { label:
                            <>
                            <LocationPinIcon/>
                            Nadika,Khari,Ramban J&K
                            </> }
                    ]}
                />
                 <FooterCard
  title="Follow Us"
  links={[
    {
      label: (
        <>
          <FacebookIcon style={{ verticalAlign: "middle", marginRight: "8px" }} />
          Facebook
        </>
      ),
      to: "/"
    },
    {
      label: (
        <>
          <InstagramIcon style={{ verticalAlign: "middle", marginRight: "8px" }} />
          Instagram
        </>
      ),
      to: "/aboutUs"
    },
    {
      label: (
        <>
          <WhatsAppIcon style={{ verticalAlign: "middle", marginRight: "8px" }} />
          WhatsApp
        </>
      ),
      to: "/services"
    }
  ]}
                />
                </main>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="allRightReserved">&copy; Student Union Bank. All Right Reserved.
                            </p>
                        </div>
                    </div>
                </div>
                
            </footer>


        </>
    );
}

export default Footer;