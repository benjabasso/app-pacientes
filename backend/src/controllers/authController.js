// Controller for authentication operations

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';


// User registration

export const register = catchAsync(async (req, res, next) => {

    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', email: newUser.username });

});

// User login

export const login = catchAsync(async (req, res, next) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        throw new AppError('Invalid username or password', 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid username or password', 401);
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

});




