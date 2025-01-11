import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuItem, setMenuItem] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [id, setId] = useState("");
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
      formData.append("menuItem", menuItem);
      formData.append("buttonText", buttonText);
      formData.append("buttonShow", buttonShow.toString());
      if (image) {
        formData.append("image", image);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        await axios.put(`http://localhost:8000/navbar/${id}`, formData, config);
        toast.success("Navbar updated successfully!");
      } else {
        await axios.post("http://localhost:8000/navbar", formData, config);
        toast.success("Navbar created successfully!");
      }
    } catch (err) {
      toast.error("Error saving data!");
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("http://localhost:8000/navitem");
        setMenuItem(data.menuItem);
        setButtonText(data.buttonText);
        setButtonShow(data.buttonShow);
        setId(data._id);
        if (data.image) {
          setImagePreview(`http://localhost:8000/uploads/${data.image}`);
          setFileName(data.image);
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
          <h2>Navbar Dashboard Input</h2>
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
            <label htmlFor="menu-item">Menu Item</label>
            <input
              value={menuItem}
              onChange={(e) => setMenuItem(e.target.value)}
              type="text"
              id="menu-item"
              placeholder="Menu Item"
            />
          </div>
          <div className="form-group">
            <label htmlFor="button-text">Button Text</label>
            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              type="text"
              id="button-text"
              placeholder="Button Text"
            />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                checked={buttonShow}
                onChange={(e) => setButtonShow(e.target.checked)}
                type="checkbox"
                id="button-show"
              />
              Button Show
            </label>
          </div>
          <div className="form-group">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
