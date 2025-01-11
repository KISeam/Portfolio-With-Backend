import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const About = () => {
  const [subheading, setSubheading] = useState("");
  const [radiobutton, setRadiobutton] = useState(false);
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [image, setImage] = useState(null);
  const [iconBox, setIconBox] = useState(false);
  const [iconHeading, setIconHeading] = useState("");
  const [iconSubheading, setIconSubheading] = useState("");
  const [iconButtonText, setIconButtonText] = useState("");

  useEffect(() => {
    async function fatchData() {
      try {
        let { data } = await axios.get("http://localhost:8000/about");
        setSubheading(data.subheading);
        setRadiobutton(data.radiobutton);
        setHeading(data.heading);
        setParagraph(data.paragraph);
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setImage(data.image);
        setIconBox(data.iconBox);
        setIconHeading(data.iconHeading);
        setIconSubheading(data.iconSubheading);
        setIconButtonText(data.iconButtonText);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    }
    fatchData();
  }, []);

  return (
    <section className="about">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-left">
            <div className="img">
              {image ? (
                <img
                  src={`http://localhost:8000/uploads/${image}`}
                  alt="About Images"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
          </div>
          <div className="about-right">
            <div className="subheading">
              {radiobutton && (
                <div className="round">
                  <div className="round-inner"></div>
                </div>
              )}
              <h6>{subheading}</h6>
            </div>
            <h1>{heading}</h1>
            <p>{paragraph}</p>
            <div className="project">
              <div className="project-wrapper">
                <div className="project-left">
                  {iconBox && (
                    <div className="icon-box">
                      <img src="./assets/icons/Group 14.png" alt="Icon" />
                    </div>
                  )}
                  <div className="project-content">
                    <h3>{iconHeading}</h3>
                    <h3>{iconSubheading}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="later-text">
              <div className="later-top-text">
                <img src="./assets/icons/check2-square 1.png" alt="Check" />
                <h5>{iconButtonText}</h5>
              </div>
            </div>
            {buttonShow && <button className="common_btn">{buttonText}</button>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
