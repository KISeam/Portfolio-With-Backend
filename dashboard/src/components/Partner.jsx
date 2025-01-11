import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Partner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState("Choose File");
  const [selectedFilesForUpdate, setSelectedFilesForUpdate] = useState({});
  const [updateImagePreview, setUpdateImagePreview] = useState({});

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/partner");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "Choose File");

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateFileChange = (e, imageId) => {
    const file = e.target.files[0];
    setSelectedFilesForUpdate((prevFiles) => ({
      ...prevFiles,
      [imageId]: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateImagePreview((prevPreviews) => ({
          ...prevPreviews,
          [imageId]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("http://localhost:8000/partner", formData);
      setSelectedFile(null);
      setFileName("Choose File");
      setImagePreview(null);
      fetchImages();
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/partner/${id}`);
      fetchImages();
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  const handleUpdate = async (id) => {
    const file = selectedFilesForUpdate[id];
    if (!file) {
      toast.warn("Please select a file to update.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    formData.append("name", "New Image Name");

    try {
      await axios.put(`http://localhost:8000/partner/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFilesForUpdate((prev) => {
        const updatedFiles = { ...prev };
        delete updatedFiles[id];
        return updatedFiles;
      });
      setUpdateImagePreview((prev) => {
        const updatedPreviews = { ...prev };
        delete updatedPreviews[id];
        return updatedPreviews;
      });
      fetchImages();
      toast.success("Image updated successfully!");
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="dashboard">
        <main className="main-content">
          <header className="header">
            <h1>Partner Section Image Upload</h1>
          </header>

          <section className="upload-section">
            <div className="form-group file-upload-group">
              <label htmlFor="file-upload" className="custom-file-label">
                {fileName}
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <h3>Preview:</h3>
                <img src={imagePreview} alt="Preview" width="200" />
              </div>
            )}

            <button className="btn-primary" onClick={handleUpload}>
              Upload New Image
            </button>
          </section>

          <section className="uploaded-images">
            <h2>Uploaded Images</h2>
            <div className="images-grid">
              {images.map((image) => (
                <div key={image._id} style={{ margin: "20px" }}>
                  <img
                    src={`http://localhost:8000/${image.path}`}
                    alt={image.name}
                    width="200"
                  />
                  <p>{image.name}</p>
                  <div className="form-group file-upload-group">
                    <label
                      htmlFor={`file-upload-${image._id}`}
                      className="custom-file-label"
                    >
                      Update Image
                    </label>
                    <input
                      type="file"
                      id={`file-upload-${image._id}`}
                      onChange={(e) => handleUpdateFileChange(e, image._id)}
                      className="file-input"
                    />
                  </div>

                  {updateImagePreview[image._id] && (
                    <div className="image-preview">
                      <h3>Preview:</h3>
                      <img
                        src={updateImagePreview[image._id]}
                        alt="Preview"
                        width="200"
                      />
                    </div>
                  )}

                  <button
                    className="btn-primary"
                    onClick={() => handleUpdate(image._id)}
                  >
                    Update Image
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(image._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Partner;
