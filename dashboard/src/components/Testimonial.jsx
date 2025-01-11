import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Model from "./Model";

const Testimonial = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [isShowImage, setIsShowImage] = useState(false);
  const [list, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");

  const openModal = (item) => {
    setTitle(item.title);
    setsubTitle(item.subTitle);
    setParagraph(item.paragraph);
    setIsShowImage(item.isShowImage);
    setId(item._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handlesubTitle = (e) => setsubTitle(e.target.value);
  const handleParagraph = (e) => setParagraph(e.target.value);
  const handleShowImage = (e) => setIsShowImage(e.target.checked);
  const handleImageUpload = (e) => setImage(e.target.files[0]);

  const resetForm = () => {
    setTitle("");
    setsubTitle("");
    setParagraph("");
    setIsShowImage(false);
    setImage(null);
    setId("");
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("paragraph", paragraph);
    formData.append("isShowImage", isShowImage);
    if (image && image instanceof File) {
      formData.append("image", image);
    }

    const url = id
      ? `http://localhost:8000/testimonial/${id}`
      : "http://localhost:8000/testimonial";
    const method = id ? "put" : "post";

    axios({
      method,
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        toast.success(
          id ? "Data updated successfully!" : "Data uploaded successfully!"
        );
        setIsModalOpen(false);
        fetchBlogs();
        resetForm();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        toast.error(id ? "Error updating data!" : "Error uploading data!");
      });
  };

  const fetchBlogs = () => {
    axios
      .get("http://localhost:8000/testimonial/")
      .then((res) => setList(res.data));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/testimonial/${item._id}`
      );

      toast.success(response.data.message || "Data deleted successfully!");

      setList((prevList) => prevList.filter((el) => el._id !== item._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting data!");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="service">
        <div>
          <div className="image-form">
            <h2>Testimonial Section</h2>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitle}
                placeholder="Enter Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subTitle">Subtitle</label>
              <input
                type="text"
                id="subTitle"
                value={subTitle}
                onChange={handlesubTitle}
                placeholder="Enter Subtitle"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subTitle">Paragraph</label>
              <input
                type="text"
                id="subTitle"
                value={paragraph}
                onChange={handleParagraph}
                placeholder="Enter Paragraph"
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  checked={isShowImage}
                  onChange={handleShowImage}
                  type="checkbox"
                  id="show-image"
                />
                Show Image
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="form-group">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>SR</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Paragraph</th>
                  <th>Button Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.isShowImage && item.imageUrl ? (
                        <img
                          src={`http://localhost:8000${item.imageUrl}`}
                          alt={item.title}
                          className="table-image"
                        />
                      ) : (
                        "No image available"
                      )}
                    </td>

                    <td>{item.title}</td>
                    <td>{item.subTitle}</td>
                    <td>{item.paragraph}</td>
                    <td>
                      <span>{item.isShowImage ? "Yes" : "No"}</span>
                    </td>
                    <td>
                      <div className="button-container">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openModal(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Model isOpen={isModalOpen} onClose={() => closeModal(false)}>
              <div className="image-form">
                <h2>Service Section</h2>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Enter Title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subTitle">Subtitle</label>
                  <input
                    type="text"
                    id="subTitle"
                    value={subTitle}
                    onChange={handlesubTitle}
                    placeholder="Enter Subtitle"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subTitle">Paragraph</label>
                  <input
                    type="text"
                    id="subTitle"
                    value={paragraph}
                    onChange={handleParagraph}
                    placeholder="Enter Paragraph"
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      checked={isShowImage}
                      onChange={handleShowImage}
                      type="checkbox"
                      id="show-image"
                    />
                    Show Image
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </Model>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
