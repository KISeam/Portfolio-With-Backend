import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog")
      .then((response) => {
        console.log("Blogs received:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className="blog">
      <div className="container">
        <div className="subheading">
          <div className="round">
            <div className="round-inner"></div>
          </div>
          <h6>I AM DESIGNER</h6>
        </div>
        <h2 className="section-title">Latest Blog</h2>
        <div className="blog-boxs">
          {blogs.map((blog) => (
            <div className="box" key={blog._id}>
              {blog.imageUrl ? (
                <img
                  src={`http://localhost:8000${blog.imageUrl}`}
                  alt={blog.title}
                />
              ) : (
                <p>No image available</p>
              )}
              <div className="box-details">
                <p>{new Date(blog.date).toLocaleDateString()}</p>
                <h3>{blog.title}</h3>
                <div className="button">
                  <a href={`/blog/${blog._id}`}>Read More</a>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
