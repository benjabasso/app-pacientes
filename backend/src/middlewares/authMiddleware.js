// Middlware to authenticate requests using JWT
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export default catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw new AppError("No token provided", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
});
