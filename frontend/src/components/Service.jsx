import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Service = () => {
  let [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/service").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <section className="services">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h1 className="section-title">SERVICES I OFFER</h1>
        <div className="services-grid">
          {list.map((item) => (
            <div className="service-card">
              <div className="icon">
                {item.isShowImage ? (
                  <img
                    src="./assets/icons/Group 17.png"
                    alt="Example 1"
                    class="table-image"
                  />
                ) : (
                  "No image available"
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
