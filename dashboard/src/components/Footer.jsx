import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [id, setId] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setFileName("Choose File");
      setImagePreview("");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("paragraph", paragraph);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("location", location);
      if (image) {
        formData.append("image", image);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        await axios.put(`http://localhost:8000/footer/${id}`, formData, config);
        toast.success("Footer updated successfully!");
      } else {
        await axios.post("http://localhost:8000/footer", formData, config);
        toast.success("Footer created successfully!");
      }
    } catch (err) {
      toast.error("Error saving data!");
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("http://localhost:8000/footer");
        if (data) {
          setParagraph(data.paragraph);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          setLocation(data.location);
          setId(data._id);
          if (data.image) {
            setImagePreview(`http://localhost:8000/uploads/${data.image}`);
            setFileName(data.image);
          }
        }
      } catch (err) {
        toast.error("Error fetching data!");
      }
    }
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="dashboard">
        <div className="dashboard-form">
          <h2>Footer Dashboard Input</h2>
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
            <label htmlFor="paragraph">Paragraph</label>
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              id="paragraph"
              placeholder="Write a paragraph"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              id="text"
              placeholder="Enter Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              id="phone-number"
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
