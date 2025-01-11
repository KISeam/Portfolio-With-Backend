import React, { useState, useEffect } from "react";
import axios from "axios";

const Resume = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/resume");
        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setList(data);
          setTitle(data[0]?.title);
          setSubtitle(data[0]?.subtitle);
        } else {
          setList([]);
          setTitle("");
          setSubtitle("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTitle("Error Loading Title");
        setSubtitle("Error Loading Subtitle");
      }
    };

    fetchData();
  }, []);

  return (
    <section className="resume">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h2 className="section-title">{title}</h2>
        <h3 className="section-subtitle">{subtitle}</h3>
        <div className="grid">
          {list.map((item, index) => (
            <div key={index} className="card">
              <h4>{item.heading}</h4>
              <p>{item.subheading}</p>
              <p>{item.paragraph}</p>
            </div>
          ))}
          {list.length === 0 && <p>No data available.</p>}
        </div>
      </div>
    </section>
  );
};

export default Resume;
