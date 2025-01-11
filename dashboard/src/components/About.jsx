import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [id, setId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const handleSubheading = (e) => setSubheading(e.target.value);
  const handleRadioButton = (e) => setRadiobutton(e.target.checked);
  const handleHeading = (e) => setHeading(e.target.value);
  const handleParagraph = (e) => setParagraph(e.target.value);
  const handleButtonText = (e) => setButtonText(e.target.value);
  const handleButtonShow = (e) => setButtonShow(e.target.checked);
  const handleIconBox = (e) => setIconBox(e.target.checked);
  const handleIconHeading = (e) => setIconHeading(e.target.value);
  const handleIconSubheading = (e) => setIconSubheading(e.target.value);
  const handleIconButtonText = (e) => setIconButtonText(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setFileName("Choose File");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subheading", subheading);
    formData.append("radiobutton", radiobutton);
    formData.append("heading", heading);
    formData.append("paragraph", paragraph);
    formData.append("buttonText", buttonText);
    formData.append("buttonShow", buttonShow);
    formData.append("iconBox", iconBox);
    formData.append("iconHeading", iconHeading);
    formData.append("iconSubheading", iconSubheading);
    formData.append("iconButtonText", iconButtonText);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:8000/about/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("About data updated successfully!");
      } else {
        await axios.post("http://localhost:8000/about", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("About data saved successfully!");
      }
    } catch (error) {
      toast.error("Error saving data!");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/about");
        setSubheading(data.subheading);
        setRadiobutton(data.radiobutton);
        setHeading(data.heading);
        setParagraph(data.paragraph);
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setId(data._id);
        setIconBox(data.iconBox);
        setIconHeading(data.iconHeading);
        setIconSubheading(data.iconSubheading);
        setIconButtonText(data.iconButtonText);

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
          <h2>About Section</h2>
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

          <div className="form-group">
            <label>Show Icon Image Box</label>
            <input type="checkbox" checked={iconBox} onChange={handleIconBox} />
          </div>
          <div className="form-group">
            <label htmlFor="icon-heading">Icon Heading</label>
            <input
              value={iconHeading}
              onChange={handleIconHeading}
              type="text"
              id="icon-heading"
              placeholder="Enter Icon Heading"
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon-subheading">Icon Subheading</label>
            <input
              value={iconSubheading}
              onChange={handleIconSubheading}
              type="text"
              id="icon-subheading"
              placeholder="Enter Icon Subheading"
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon-button-text">Icon Button Text</label>
            <input
              value={iconButtonText}
              onChange={handleIconButtonText}
              type="text"
              id="icon-button-text"
              placeholder="Enter Icon Button Text"
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

export default About;
