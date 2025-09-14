
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Import contact routes
const contactRoutes = require('./routes/contactRoutes');
app.use(contactRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Portfolio backend is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Email configuration:', {
        service: 'outlook',
        user: process.env.EMAIL_USER ? '✓ Set' : '✗ Missing',
        pass: process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing'
    });
});