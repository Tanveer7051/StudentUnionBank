import React from "react";
import DashboardHome from "../DashboardHome/DashboardHome";   
import Footer from "../../../Landing-page/Footer";

const UserLayout = ({ children,showNavBar = true }) => {
  return (
    <>
      <DashboardHome />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;