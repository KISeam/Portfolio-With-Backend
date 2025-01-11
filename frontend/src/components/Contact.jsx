import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    console.log(fullName, email, phoneNumber, subject, message);
    e.preventDefault();
    axios
      .post("http://localhost:8000/contact", {
        fullName,
        email,
        subject,
        phoneNumber,
        message,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="contact">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h2 className="section-title">I WANT TO HEAR FROM YOU</h2>
        <div className="contect-wrapper">
          <form className="contact-form">
            <div className="input-box-group">
              <input
                onChange={(e) => setFullName(e.target.value)}
                name="fullName"
                type="text"
                placeholder="Your name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="input-box-group">
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
                type="tel"
                placeholder="Your phone"
              />
              <input
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
                type="text"
                placeholder="Subject"
              />
            </div>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
            ></textarea>
            <div className="btn">
              <button onClick={handleSubmit} className="common_btn">
                Send Me Message
              </button>
            </div>
          </form>
          <div className="contact-info">
            <div className="project-left">
              <div className="icon-box">
                <img src="./assets/icons/Icon (4).png" alt="Location" />
              </div>
              <div className="project-content">
                <h3>Address</h3>
                <p>202 Dog Hill Lane Beloit, KS 67420</p>
              </div>
            </div>
            <div className="project-left">
              <div className="icon-box">
                <img src="./assets/icons/Group 106.png" alt="Phone" />
              </div>
              <div className="project-content">
                <h3>Phone</h3>
                <p>015********</p>
              </div>
            </div>
            <div className="project-left">
              <div className="icon-box">
                <img src="./assets/icons/Group (2).png" alt="Email" />
              </div>
              <div className="project-content">
                <h3>Email</h3>
                <p>seam9995@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
