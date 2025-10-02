import React from "react";
import NavBar from "../Navbar";   
import Footer from "../Footer";  

const Layout = ({ children,showNavBar = true }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;


