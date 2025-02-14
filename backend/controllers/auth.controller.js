const emailValidator = require('email-validator'); 
const User = require('../models/user.model.js'); 
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../utils/generateToken.js');

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!emailValidator.validate(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already in use.' });
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const token = generateToken(newUser.id);
        return res.status(201).json({ success: true, message: "User created successfully", token, name });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: "Invalid password" });
        }

        const token = generateToken(user.id);

        const name = user.name;

        return res.status(200).json({ success: true, message: "Login successful", token, name });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { signup, login };
