import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [list, setList] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:8000/navitem");
        setList(data.menuItem.split(","));
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setImage(data.image); // Check if `data.image` is correctly populated from the backend.
      } catch (error) {
        console.error("Error fetching navbar data:", error);
      }
    }
    fetchData();
  }, []); // Added dependency array to prevent repeated execution.

  return (
    <header>
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            {image ? (
              <img src={`http://localhost:8000/uploads/${image}`} alt="Hero" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <nav>
            <ul>
              {list.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
          {buttonShow && <button className="common_btn">{buttonText}</button>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
