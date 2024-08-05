const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "https://rahilsamani.github.io/portfolio",
    credentials: true,
  })
);
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected Successfully"))
  .catch((error) => {
    console.log("DB Connection Failed");
    console.log(error);
    process.exit(1);
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Routes
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    subject,
    message,
  });

  try {
    await newContact.save();

    // Send email
    const mailOptions = {
      from: email,
      to: "rahilahmed1720@gmail.com",
      subject: `New contact form submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "There was a problem delivering your message." });
      } else {
        res.status(200).json({ message: "Your message has been sent." });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a problem delivering your message." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
