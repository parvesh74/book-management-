// const express = require('express');
// const { fileAuth } = require('./auth');
// const booksRouter = require('./routes/books');

// const app = express();
// app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// })

// app.post('/login', (req, res) => {

//     const { username, password } = req.body;
//     // get user from file
//     const user = fileAuth(username, password);
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }
//     res.json({ message: 'Login successful' });

// });

// app.use('/books', booksRouter);


// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


//----------------------------------

const express = require('express');
const fs = require('fs');
const path = require('path');
const { fileAuth } = require('./auth');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login Attempt:', { username, password });

    const user = fileAuth(username, password);
    if (!user) {
        console.log('Invalid username or password');
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Login successful');
    res.json({ message: 'Login successful' });
});

// Books Route
app.use('/books', booksRouter);

// Users Route
app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'users.json');
    console.log('File Path:', filePath); // Log the file path to check if it's correct

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        try {
            const users = JSON.parse(data);
            console.log('Users Data:', users); // Log the users data to check if it's being read correctly
            res.json(users);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ message: 'Error parsing user data' });
        }
    });
});

// Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
