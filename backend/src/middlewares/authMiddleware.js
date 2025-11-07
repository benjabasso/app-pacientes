// Middlware to authenticate requests using JWT
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";

export const protect = catchAsync(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || "";

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new AppError("Invalid token. Please log in again.", 401));
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
        return next(new AppError("The user belonging to this token no longer exists.", 401));
    }

    req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    next();
    }
);

