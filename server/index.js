const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://rahilahmed.vercel.app",
    credentials: true,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully." });
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      replyTo: email,
      to: "rahilahmed1720@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Sending Failed:", error.message);
        return res.status(500).json({
          message: "Failed to send the email. Please try again later.",
        });
      }
      console.log("Email Sent:", info.response);
      res
        .status(200)
        .json({ message: "Your message has been sent successfully." });
    });
  } catch (error) {
    console.error("Error Saving to Database or Sending Email:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
