const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Improved CORS configuration
app.use(cors({
  origin: ['https://priyanshu-hr.github.io/Priyanshu-portfolio', 'http://localhost:3000'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// Improved email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true // Add this for debugging
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio backend is running!' });
});

// Improved contact form endpoint with better error handling
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Please provide name, email and message.' 
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Verify email configuration
    await transporter.verify();
    
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      message: 'Error sending message. Please try again.',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});