import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const [subheading, setSubheading] = useState("");
  const [radiobutton, setRadiobutton] = useState(false);
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const handleSubheading = (e) => setSubheading(e.target.value);
  const handleRadioButton = (e) => setRadiobutton(e.target.checked);
  const handleHeading = (e) => setHeading(e.target.value);
  const handleParagraph = (e) => setParagraph(e.target.value);
  const handleButtonText = (e) => setButtonText(e.target.value);
  const handleButtonShow = (e) => setButtonShow(e.target.checked);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(e.target.files[0].name);
    } else {
      setFileName("Choose File");
    }
  };

  const handleSubmit = async () => {
    const bannerData = new FormData();
    bannerData.append("subheading", subheading);
    bannerData.append("radiobutton", radiobutton);
    bannerData.append("heading", heading);
    bannerData.append("paragraph", paragraph);
    bannerData.append("buttonText", buttonText);
    bannerData.append("buttonShow", buttonShow);
    if (image) {
      bannerData.append("image", image);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:8000/banner/${id}`, bannerData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Data updated successfully!");
      } else {
        await axios.post("http://localhost:8000/banner", bannerData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Data created successfully!");
      }
    } catch (error) {
      toast.error("Error submitting data!");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/banner");
        setSubheading(data.subheading);
        setRadiobutton(data.radiobutton);
        setHeading(data.heading);
        setParagraph(data.paragraph);
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setId(data._id);
        if (data.image) {
          setImagePreview(`http://localhost:8000/uploads/${data.image}`);
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="banner">
        <div className="banner-form">
          <h2>Banner Section</h2>
          <div className="form-group">
            <label htmlFor="subheading">Subheading</label>
            <input
              value={subheading}
              onChange={handleSubheading}
              type="text"
              id="subheading"
              placeholder="Enter Subheading"
            />
          </div>
          <div className="form-group">
            <label>Radio Button</label>
            <input
              type="checkbox"
              checked={radiobutton}
              onChange={handleRadioButton}
            />
          </div>
          <div className="form-group">
            <label htmlFor="heading">Heading</label>
            <input
              value={heading}
              onChange={handleHeading}
              type="text"
              id="heading"
              placeholder="Enter Heading"
            />
          </div>
          <div className="form-group">
            <label htmlFor="paragraph">Paragraph</label>
            <textarea
              value={paragraph}
              onChange={handleParagraph}
              id="paragraph"
              placeholder="Enter Paragraph"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="button-text">Button Text</label>
            <input
              value={buttonText}
              onChange={handleButtonText}
              type="text"
              id="button-text"
              placeholder="Enter Button Text"
            />
          </div>
          <div className="form-group">
            <label>Show Button</label>
            <input
              type="checkbox"
              checked={buttonShow}
              onChange={handleButtonShow}
            />
          </div>
          <div className="form-group file-upload-group">
            <label htmlFor="file-upload">Upload File</label>
            <div className="custom-file-upload">
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {fileName}
              </label>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" width="200" />
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
