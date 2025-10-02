import React from "react";
import Hero from "./Hero";
import OpenAccount from "./OpenAccount";
import NavBar from "../Navbar";
import Footer from "../Footer";
import GettingStarted from "../GettingStarted/GettingHomePage";
import { Outlet } from "react-router-dom";
function HomePage() {
    return ( 
        <>
        <Hero/>
        <OpenAccount/>
        <GettingStarted/>
        </>
     );
}

export default HomePage;