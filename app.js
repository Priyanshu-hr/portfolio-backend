const cors = require('cors');

// Add this before your routes
app.use(cors({
    origin: ['http://localhost:3000', 
             'https://priyanshu-hr.github.io/Priyanshu-portfolio/'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));