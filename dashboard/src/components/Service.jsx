import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Model from "./Model";

const Service = () => {
  let [title, setTitle] = useState("");
  let [subTitle, setsubTitle] = useState("");
  let [isShowImage, setIsShowImage] = useState(false);
  let [list, setList] = useState([]);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [id, setId] = useState("");

  let openModal = (item) => {
    setTitle(item.title);
    setsubTitle(item.subTitle);
    setIsShowImage(item.isShowImage);
    setId(item._id);
    setIsModalOpen(true);
  };

  let closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setsubTitle("");
    setIsShowImage("");
    setId("");
  };

  let handleTitle = (e) => {
    setTitle(e.target.value);
  };

  let handlesubTitle = (e) => {
    setsubTitle(e.target.value);
  };

  let handleShowImage = (e) => {
    setIsShowImage(e.target.checked);
  };

  let handleSubmit = () => {
    if (id) {
      axios
        .put(`http://localhost:8000/service/${id}`, {
          title,
          subTitle,
          isShowImage,
        })
        .then((res) => {
          toast.success("Data updated successfully!");
          setIsModalOpen(false);
          axios.get("http://localhost:8000/service/").then((res) => {
            setList(res.data);
            setTitle("");
            setsubTitle("");
            setIsShowImage(false);
          });
        })
        .catch((err) => {
          toast.error("Error updating data!");
        });
    } else {
      axios
        .post("http://localhost:8000/service", {
          title,
          subTitle,
          isShowImage,
        })
        .then(() => {
          setTitle("");
          setsubTitle("");
          setIsShowImage(false);
          toast.success("Data uploaded successfully!");
        })
        .catch((err) => {
          toast.error("Error uploading data!");
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/service").then((res) => {
      setList(res.data);
    });
  }, []);

  let handleDelete = (item) => {
    axios
      .delete("http://localhost:8000/service/" + item._id)
      .then((res) => {
        setList(list.filter((el) => el._id !== item._id));
        toast.success("Data deleted successfully!");
        axios.get("http://localhost:8000/service/").then((res) => {
          setList(res.data);
        });
      })
      .catch((err) => {
        toast.error("Error deleting data!");
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="service">
        <div>
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
                  <th>Button Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.isShowImage ? (
                        <img
                          src="https://via.placeholder.com/100"
                          alt="Example"
                          className="table-image"
                        />
                      ) : (
                        "No image available"
                      )}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.subTitle}</td>
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

export default Service;
