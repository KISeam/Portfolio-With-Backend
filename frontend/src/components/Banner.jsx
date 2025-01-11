import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [subheading, setSubheading] = useState("");
  const [radiobutton, setRadiobutton] = useState(false);
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get("http://localhost:8000/banner");
        setSubheading(data.subheading);
        setRadiobutton(data.radiobutton);
        setHeading(data.heading);
        setParagraph(data.paragraph);
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setImage(data.image);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-left">
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
            {buttonShow && <button className="common_btn">{buttonText}</button>}
          </div>
          <div className="hero-right">
            <div className="img">
              {image ? (
                <img
                  src={`http://localhost:8000/uploads/${image}`}
                  alt="Hero"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
