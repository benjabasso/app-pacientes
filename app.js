import express from 'express';
import fs, { stat, write } from 'fs';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const server = express(); //Initialize express server
server.use(cors()); 
server.use(express.json()); 

// Status
server.get("/", (request, response) => {
    response.json({status: false});
});

// Mongoose schema
const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    history: {type: String, required: true},
    dni: {type: String, required: true, unique: true},
    social_security: {type: String, required: true},
    email: {type: String, required: true, unique: true}
}, {versionKey: false});

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {versionKey: false});

// Mongoose model
const Patient = mongoose.model("Patient", patientSchema);
const User = mongoose.model("User", userSchema);

// Connect to MongoDB
const connectDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("Connected to MongoDB");
}

// Authentication middleware
const authMiddleware = (request, response, next) => {

    // Token validation logic here - session validation
    const token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({error: "Unauthorized"}); //If no token provided, respond with 401 error
    }

    const decoded = jwt.verify(token, "secret_key"); //Verify token using secret key
    next(); 
}

// User registration
server.post("/auth/register", async (request, response) => {
    const body = request.body; 

    const user = await User.findOne({email: body.email}); 
    if (user) {
        return response.status(400).json({error: "User already exists"}); 
    }

    const hash = await bcrypt.hash(body.password, 10); //Hash the password 

    const newUser = new User ({
        email: body.email,
        password: hash
    }); 

    await newUser.save(); 
    response.json(newUser);
});

// User login
server.post("/auth/login", async (request, response) => {
    const body = request.body; 

    const user = await User.findOne({email: body.email}); 
    if (!user) {
        return response.status(401).json({error: "Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password); 
    if (!isPasswordValid) {
        return response.status(401).json({error: "Invalid email or password"}); 
    }

    const token = jwt.sign({id: user.id, email: user.email}, "secret_key", {expiresIn: "1h"}) 

    response.json({token});
});

// Get Patients
server.get("/patients", authMiddleware,  async (request, response) => {
    const patients = await Patient.find(); 
    response.json(patients); 
});

// Add Patient
server.post("/patients", authMiddleware, async (request, response) => {
    const body = request.body; 
    const {name, age, history, dni, social_security, email} = body; 


    if (!name || !age || !history || !dni || !social_security || !email) {
        return response.status(400).json({error: "Missing required fields"}); 
    }
    if (age < 0) {
        return response.status(400).json({error: "Age must be non-negative"}); 
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return response.status(400).json({error: "Invalid email format"}); 
    }
    
    const existingPatient = await Patient.findOne({ dni });
    if (existingPatient) {
        return response.status(400).json({error: "Patient already exists with same dni or email, please change your email or try to login"}); 
    }

    const newPatient = new Patient({
        name,
        age,
        history,
        dni,
        social_security,
        email
    }); 

    await newPatient.save(); 

    response.json(newPatient); 
});

// Update Patient
server.patch("/patients/:id", authMiddleware, async (request, response) => {
    const body = request.body; 
    const id = request.params.id;

    const updatePatient = await Patient.findByIdAndUpdate(id, body, {new: true}); 
    if (!updatePatient) {
        return response.status(404).json({error: "Patient not found"}); 
    }
    
    response.json(updatePatient); 
});

// Delete Patient
server.delete("/patients/:id", authMiddleware, async (request, response) => {
    const id = request.params.id;

    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
        return response.status(404).json({error: "Patient not found"}); 
    }

    response.json(deletedPatient);
});


// Start server 
server.listen(3000, () => {
    connectDb()
    console.log('Server is running on http://localhost:3000');
});

