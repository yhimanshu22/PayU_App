import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Account from '../models/accountModel.js';
import { authMiddleware } from '../middleware.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yourjwtsecret';

// Schemas
const signupSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    email: z.string().email()
});

const signinSchema = z.object({
    username: z.string(),
    password: z.string().min(6)
});

const updateSchema = z.object({
    password: z.string().min(6).optional(),
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional()
});

// Signup route
router.post('/signup', async (req, res) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Inputs!', errors: result.error.errors });
    }

    const { username, password, firstName, lastName, email } = req.body;

    try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'User with this email already exists!' });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'User with this username already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User Created Successfully!',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Signin route
router.post('/signin', async (req, res) => {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Inputs!', errors: result.error.errors });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id ,email:user.email}, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'User logged in',token });
        }

        res.status(401).json({ message: 'Invalid credentials!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update user route
router.put('/', authMiddleware, async (req, res) => {
    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid update information', errors: result.error.errors });
    }

    const { userId } = req.user;
    const updateData = req.body;

    try {
        await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get users with filtering
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
