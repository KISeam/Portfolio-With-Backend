const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const Navbar = require("./model/navbarModel.js");
const Banner = require("./model/bannerModel.js");
const Service = require("./model/serviceModel.js");
const About = require("./model/aboutModel.js");
const Resume = require("./model/resumeModel.js");
const Portfolio = require("./model/portfolioModel.js");
const Partner = require("./model/partnerModel.js");
const Blog = require("./model/blogModel.js");
const Testimonial = require("./model/testimonialModel.js");
const Footer = require("./model/footerModel.js");
require("dotenv").config();

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Navbar Routes
app.get("/navitem", async (req, res) => {
  try {
    const data = await Navbar.findOne({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching navbar", error });
  }
});

app.post("/navbar", upload.single("image"), async (req, res) => {
  try {
    const navbarData = new Navbar({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });
    await navbarData.save();
    res.send({ message: "Navbar created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error creating navbar", error });
  }
});

app.put("/navbar/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    await Navbar.findByIdAndUpdate(req.params.id, updateData);
    res.send({ message: "Navbar updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating navbar", error });
  }
});

// Banner Routes
app.get("/banner", async function (req, res) {
  try {
    const data = await Banner.findOne({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching banner", error });
  }
});

app.post("/banner", upload.single("image"), async (req, res) => {
  try {
    const bannerData = new Banner({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });
    await bannerData.save();
    res.send({ message: "Banner created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error creating banner", error });
  }
});

app.put("/banner/:id", upload.single("image"), async function (req, res) {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Banner.findByIdAndUpdate(req.params.id, updateData);
    res.send({ message: "Banner Updated!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating banner", error });
  }
});

// About Routes
app.get("/about", async function (req, res) {
  try {
    const data = await About.findOne({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching about", error });
  }
});

app.post("/about", upload.single("image"), async (req, res) => {
  try {
    const aboutData = new About({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });
    await aboutData.save();
    res.send({ message: "About created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error creating about", error });
  }
});

app.put("/about/:id", upload.single("image"), async function (req, res) {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await About.findByIdAndUpdate(req.params.id, updateData);
    res.send({ message: "About Updated!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating about", error });
  }
});

// Resume Route
app.post("/resume", async function (req, res) {
  let data = new Resume(req.body);
  data.save();
  res.send("Resume Created!");
});

app.get("/resume", async function (req, res) {
  let data = await Resume.find({});
  res.send(data);
});

app.delete("/resume/:id", async function (req, res) {
  let data = await Resume.findByIdAndDelete(req.params.id);
  res.send({ message: "Resume deleted successfully!" });
});

app.put("/resume/:id", function (req, res) {
  Service.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send({ message: "Resume Updated!" });
  });
});

// Portfolio Route
app.post("/images", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Portfolio({
      name: req.file.originalname,
      path: req.file.path,
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", error: err });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await Portfolio.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err });
  }
});

app.put("/images/:id", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (file) updateFields.path = file.path;

    const updatedImage = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: "Error updating image", error: err });
  }
});

app.delete("/images/:id", async (req, res) => {
  try {
    const image = await Portfolio.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image", error: err });
  }
});

// Partner Route
app.post("/partner", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Partner({
      name: req.file.originalname,
      path: req.file.path,
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", error: err });
  }
});

app.get("/partner", async (req, res) => {
  try {
    const images = await Partner.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err });
  }
});

app.put("/partner/:id", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (file) updateFields.path = file.path;

    const updatedImage = await Partner.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: "Error updating image", error: err });
  }
});

app.delete("/partner/:id", async (req, res) => {
  try {
    const image = await Partner.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image", error: err });
  }
});

// Service Routes
app.post("/service", async function (req, res) {
  let data = new Service(req.body);
  data.save();
  res.send("Service Created!");
});

app.get("/service", async function (req, res) {
  let data = await Service.find({});
  res.send(data);
});

app.delete("/service/:id", async function (req, res) {
  let data = await Service.findByIdAndDelete(req.params.id);
  res.send({ message: "Service deleted successfully!" });
});

app.put("/service/:id", function (req, res) {
  Service.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send({ message: "Service Updated!" });
  });
});

// Blog Routes
app.post("/blog/", upload.single("image"), async (req, res) => {
  try {
    const { title, subTitle, isShowImage } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({ title, subTitle, isShowImage, imageUrl });
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Blog!", error: error.message });
  }
});

app.get("/blog/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Blog!", error: error.message });
  }
});

app.put("/blog/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, subTitle, isShowImage } = req.body;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, subTitle, isShowImage, imageUrl },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Service not found!" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully!", blog: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Blog!", error: error.message });
  }
});

app.delete("/blog/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Blog:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting Blog!", error: error.message });
  }
});

// Testimonial Routes
app.post("/testimonial/", upload.single("image"), async (req, res) => {
  try {
    const { title, subTitle, paragraph, isShowImage } = req.body; // Ensure paragraph is being passed
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Set image URL if uploaded

    const newTestimonial = new Testimonial({
      title,
      subTitle,
      paragraph, // Ensure paragraph is saved
      isShowImage,
      imageUrl,
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial created successfully!",
      testimonial: newTestimonial,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating testimonial!", error: error.message });
  }
});

// GET route to fetch all testimonials
app.get("/testimonial/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching testimonials!", error: error.message });
  }
});

// PUT route to update an existing testimonial
app.put("/testimonial/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      subTitle,
      paragraph,
      isShowImage,
      imageUrl: existingImageUrl,
    } = req.body;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : existingImageUrl; // If no new file, retain old imageUrl

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { title, subTitle, paragraph, isShowImage, imageUrl },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found!" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully!",
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating testimonial!", error: error.message });
  }
});

// DELETE route to delete a testimonial
app.delete("/testimonial/:id", async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found!" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully!" });
  } catch (error) {
    console.error("Error deleting testimonial:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting testimonial!", error: error.message });
  }
});

// Contacts Route
app.post("/contact", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "seam9995@gmail.com",
      pass: "qhol djwa kjwo corx",
    },
  });

  const info = await transporter.sendMail({
    from: "seam9995@gmail.com",
    to: "seam9995@gmail.com",
    subject: req.body.subject,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">New Message</h2>
      <p><strong>Name:</strong> ${req.body.fullName}</p>
      <p><strong>Email:</strong> ${req.body.email}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 10px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
        ${req.body.message}
      </div>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
    </div>
  `,
  });

  res.send({ message: "Email Sent!" });
});

// Foooter routes
app.get("/footer", async (req, res) => {
  try {
    const data = await Footer.findOne({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching Footer", error });
  }
});

app.post("/footer", upload.single("image"), async (req, res) => {
  try {
    const footerData = new Footer({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });
    await footerData.save();
    res.send({ message: "Footer created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error creating Footer", error });
  }
});

app.put("/footer/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedFooter = await Footer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.send({ message: "Footer updated successfully!", updatedFooter });
  } catch (error) {
    res.status(500).send({ message: "Error updating Footer", error });
  }
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
