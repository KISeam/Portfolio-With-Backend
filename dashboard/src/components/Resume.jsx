import React, { useState, useEffect } from "react";
import Model from "./Model";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Resume = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");

  const resetFields = () => {
    setTitle("");
    setSubtitle("");
    setHeading("");
    setSubheading("");
    setParagraph("");
    setId("");
  };

  const openModal = (item) => {
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setHeading(item.heading);
    setSubheading(item.subheading);
    setParagraph(item.paragraph);
    setId(item._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/resume");
        setList(res.data);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:8000/resume/${id}`, {
          title,
          subtitle,
          heading,
          subheading,
          paragraph,
        });
        toast.success("Data updated successfully!");
        closeModal();
        axios.get("http://localhost:8000/resume/").then((res) => {
          setList(res.data);
          resetFields();
        });
      } else {
        await axios.post("http://localhost:8000/resume", {
          title,
          subtitle,
          heading,
          subheading,
          paragraph,
        });
        toast.success("Data created successfully!");
        resetFields();
      }
    } catch (error) {
      toast.error("Error submitting data!");
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:8000/resume/${item._id}`);
      toast.success("Data deleted successfully!");
    } catch (error) {
      toast.error("Error deleting data!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="resume_section">
        <div className="banner-form resume">
          <h2>Resume Dashboard Input Form</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter Subtitle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter Heading"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subheading">Subheading</label>
            <input
              type="text"
              id="subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="Enter Subheading"
            />
          </div>
          <div className="form-group">
            <label htmlFor="paragraph">Paragraph</label>
            <textarea
              id="paragraph"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              placeholder="Enter Paragraph"
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
                <th>Subtitle</th>
                <th>Heading</th>
                <th>Subheading</th>
                <th>Paragraph</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.subtitle}</td>
                  <td>{item.heading}</td>
                  <td>{item.subheading}</td>
                  <td>{item.paragraph}</td>
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
        </div>

        {isModalOpen && (
          <Model isOpen={isModalOpen} onClose={closeModal}>
            <div className="form-section">
              <h2>Edit Item</h2>
              <div className="form-group">
                <label htmlFor="subtitle">Subtitle</label>
                <input
                  type="text"
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter Subtitle"
                />
              </div>
              <div className="form-group">
                <label htmlFor="heading">Heading</label>
                <input
                  type="text"
                  id="heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  placeholder="Enter Heading"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subheading">Subheading</label>
                <input
                  type="text"
                  id="subheading"
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  placeholder="Enter Subheading"
                />
              </div>
              <div className="form-group">
                <label htmlFor="paragraph">Paragraph</label>
                <textarea
                  id="paragraph"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                  placeholder="Enter Paragraph"
                />
              </div>
              <div className="form-group">
                <button onClick={handleSubmit}>Save Changes</button>
              </div>
            </div>
          </Model>
        )}
      </div>
    </>
  );
};

export default Resume;
