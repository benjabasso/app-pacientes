// Controller for patient operations

import Patient from '../models/Patient.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// Get all patients

export const getAllPatients = catchAsync(async (req, res, next) => {
    const patients = await Patient.find();
    res.json(patients);
});

// Get patient by ID

export const getPatientById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    if (!patient) {
        throw new AppError('Patient not found', 404);
    }
    res.json(patient);
});

// Add a new patient

export const addPatient = catchAsync(async (req, res, next) => {
    const { name, age, history, dni, social_security, email } = req.body;

    if (!name || !age || !history || !dni || !social_security || !email) {
        throw new AppError('All fields are required', 400);
    }

    if (age < 0) {
        throw new AppError('Age must be non-negative', 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('Invalid email format', 400);
    }

    const existingPatient = await Patient.findOne({ $or: [{ dni }, { email }] });
    if (existingPatient) {
        throw new AppError('Patient already exists with same dni or email', 400);
    }

    const newPatient = await Patient.create({ name, age, history, dni, social_security, email });
    res.status(201).json(newPatient);
});

// Update a patient

export const updatePatient = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPatient) {
        throw new AppError('Patient not found', 404);
    }
    res.json(updatedPatient);
});

// Delete a patient

export const deletePatient = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
        throw new AppError('Patient not found', 404);
    }
    res.json(deletedPatient);
});

