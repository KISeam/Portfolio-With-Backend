import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/images");
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="portfolio">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM A DESIGNER</h6>
        </div>
        <div className="gallery">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image._id} className="gallery-item">
                <img
                  src={`http://localhost:8000/${image.path}`}
                  alt={image.name}
                />
              </div>
            ))
          ) : (
            <p className="no-images">No images available in the portfolio.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
