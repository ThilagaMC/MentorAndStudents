import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON data

// MongoDB connection URI
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Express MongoDB App!');
});

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
