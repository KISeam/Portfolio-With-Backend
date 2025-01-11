import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await axios.get("http://localhost:8000/footer");
        setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            {footerData.image && (
              <img
                src={`http://localhost:8000/uploads/${footerData.image}`}
                alt="Logo"
              />
            )}
            <p>{footerData.paragraph}</p>
            <h2>{footerData.email}</h2>
          </div>

          <div className="footer-links">
            <h4>Explore Link</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Resume</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-services">
            <h4>My Services</h4>
            <ul>
              <li>
                <a href="#">UI/UX Design</a>
              </li>
              <li>
                <a href="#">Mobile App</a>
              </li>
              <li>
                <a href="#">Graphics Design</a>
              </li>
              <li>
                <a href="#">Web Developer</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Follow me</h4>
            <div className="social-icons">
              <div className="icon-box">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="icon-box">
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className="icon-box">
                <i className="fa-solid fa-basketball"></i>
              </div>
              <div className="icon-box">
                <i className="fa-brands fa-behance"></i>
              </div>
            </div>
            <div className="footer-box">
              <img src="./assets/icons/Icon (4).png" alt="Location" />
              <p>{footerData?.location}</p>
            </div>
            <div className="footer-box">
              <img src="./assets/icons/Group 106.png" alt="Phone" />
              <p>{footerData.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-wrapper">
            <div className="footer-bottom-left">
              <p>All rights reserved &copy; 2023 CreDesign</p>
            </div>
            <div className="footer-bottom-right">
              <a href="#">Terms & Condition</a>
              <a href="#">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
