import React, { useState, useEffect } from "react";
import axios from "axios";

const Partner = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/partner");
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
    <section className="partners">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h2 className="section-title">REPUTED PARTNER</h2>
        <div className="partner-logos">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image._id} className="partner-logo">
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

export default Partner;
