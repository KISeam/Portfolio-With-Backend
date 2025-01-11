import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Service from "./components/Service";
import About from "./components/About";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import Partner from "./components/Partner";
import Blog from "./components/Blog";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";

function App() {
  let [activeMenu, setActiveMenu] = useState("Navbar");

  let handleActive = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="main">
      <div className="left">
        <ul>
          <li onClick={() => handleActive("Navbar")}>Navbar</li>
          <li onClick={() => handleActive("Banner")}>Banner</li>
          <li onClick={() => handleActive("About")}>About</li>
          <li onClick={() => handleActive("Services")}>Services</li>
          <li onClick={() => handleActive("Resume")}>Resume</li>
          <li onClick={() => handleActive("Portfolio")}>Portfolio</li>
          <li onClick={() => handleActive("Testimonial")}>Testimonial</li>
          <li onClick={() => handleActive("Partner")}>Partner</li>
          <li onClick={() => handleActive("Blog")}>Blog</li>
          <li onClick={() => handleActive("Footer")}>Footer</li>
        </ul>
      </div>
      <div className="right">
        {activeMenu === "Navbar" && <Navbar />}
        {activeMenu === "Banner" && <Banner />}
        {activeMenu === "About" && <About />}
        {activeMenu === "Services" && <Service />}
        {activeMenu === "Resume" && <Resume />}
        {activeMenu === "Portfolio" && <Portfolio />}
        {activeMenu === "Testimonial" && <Testimonial />}
        {activeMenu === "Partner" && <Partner />}
        {activeMenu === "Blog" && <Blog />}
        {activeMenu === "Footer" && <Footer />}
      </div>
    </div>
  );
}

export default App;
