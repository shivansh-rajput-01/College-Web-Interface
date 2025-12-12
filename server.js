const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Set EJS
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/collegeProject')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    role: String
});

const User = mongoose.model('User', UserSchema);

// --- ROUTES ---

// 1. Signup Route (UPDATED)
app.post('/signup', async (req, res) => {
    // Role bhi receive kar rahe hain
    const { name, username, email, mobile, password, role } = req.body;

    try {
        // Role save kar rahe hain DB mein
        const newUser = new User({ name, username, email, mobile, password, role });
        await newUser.save();
        res.json({ success: true, message: "Signup Successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Username or Email already exists!" });
    }
});

// 2. Login Route (Same as last time, but logic explained)
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Role input nahi le rahe
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ 
                success: true, 
                user: { 
                    name: user.name, 
                    username: user.username,
                    role: user.role // DB se jo role nikla wahi bhej rahe hain
                } 
            });
        } else {
            res.json({ success: false, message: "Wrong Username or Password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// 3. Dashboard Route (MOVED UP)
app.get('/dashboard', (req, res) => {
    const { username, role, name } = req.query;

    if (!username || !role) {
        return res.redirect('/login.html');
    }

    res.render('dashboard', { 
        username: username, 
        role: role, 
        name: name 
    });
});

// --- SERVER START (Hamesha last mein) ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
