import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'
function FooterCard({ title, links }) {
    return (
        <>
        <div className="footer_container">
            <h1>{title}</h1>
            <div className="row">
                <div className="col">
                    {links.map((link, index) => (
                        <p key={index}>
                            <Link style={{textDecoration:"none", color:"inherit" }} to={link.to}>{link.label}</Link>
                        </p>
                    ))}
                </div>
            </div>
        </div>
            
        </>
    );
}

export default FooterCard;
