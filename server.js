const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});


app.get('/', (req, res) => {
    res.json({ message: 'Portfolio backend is running!' });
});


app.post('/api/contact', async (req, res) => {
    console.log('Received contact form submission:', req.body); // Debug log

    try {
        const { name, email, message } = req.body;
        
       
        if (!name || !email || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false,
                message: 'Please provide name, email and message.' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
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

    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        
        res.status(200).json({ 
            success: true,
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error sending message. Please try again.',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Email configuration:', {
        service: 'gmail',
        user: process.env.EMAIL_USER ? '✓ Set' : '✗ Missing',
        pass: process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing'
    });
});