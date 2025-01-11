import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/testimonial/")
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch(() => {
        console.log("Failed to fetch testimonials");
      });
  }, []);

  return (
    <section className="testimonial">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h2 className="section-title">CLIENT FEEDBACK</h2>
        <div className="feedback-grid">
          {testimonials.map((item, index) => (
            <div className="feedback-card" key={item._id || index}>
              <div className="feedback-card-top">
                {item.isShowImage && (
                  <div>
                    <img
                      src={
                        item.imageUrl
                          ? `http://localhost:8000${item.imageUrl}`
                          : "./assets/images/fallback.png"
                      }
                      alt={item.title || "Client"}
                    />
                  </div>
                )}
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.subTitle}</p>
                </div>
              </div>
              <p>{item.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
