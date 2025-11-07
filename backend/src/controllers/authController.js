// Controller for authentication operations

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';


const signToken = (user) =>
    jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );


// User registration

export const register = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) return next(new AppError('Email and password are required', 400));

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return next(new AppError('Email already in use', 400));

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = signToken(newUser);
    res.status(201).json({
        status: 'success',
        user: {
            id: newUser.id,
            email: newUser.email
        }
    });
});

// User login

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) return next(new AppError('Email and password are required', 400));

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new AppError('Incorrect email or password', 401));

    const token = signToken(user);
    res.status(200).json({
        status: 'success',
        token,
        user: {
            id: user.id,
            email: user.email
        }
    });
});
