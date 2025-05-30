const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body); // Debug log

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    console.log('Attempting to send email...'); // Debug log

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully'); // Debug log
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact route:', error); // Debug log
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;