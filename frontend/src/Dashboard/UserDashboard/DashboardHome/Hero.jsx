import React from "react";
import styles from './Hero.module.css';
function Hero() {
    return ( 
        <div className={styles.Hero}>
            <img src="/Project.png" alt="Bank Banner" className={styles.mobileImg} />
            <div className={styles.Home}>
            <h1 className={styles.Title}>Make Future,Secured.</h1>
            <h2 className={`d-inline ${styles.firstP} pe-3`}>Banking Made</h2>
            <p className={`d-inline ${styles.firstP}`}>Simple with Union Student Bank</p>
            <p className={styles.secondP}>Mange your finances effortlessly,anytime and anywhere</p>
            <a href="/signup" className={`btn ${styles.btn1}`}>Open an Account</a>
            <a href="/aboutus" className={`btn ${styles.btn2}`}>Learn More</a>
            </div>    
        </div>
    );
}

export default Hero;