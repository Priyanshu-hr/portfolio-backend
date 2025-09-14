const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST: Add a new contact
router.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body); // Debug log

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contact = await prisma.contact.create({
      data: { name, email, message }
    });
    res.status(200).json({ message: 'Contact details received successfully', contact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// GET: Get all contacts
router.get('/api/contact', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ users: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;