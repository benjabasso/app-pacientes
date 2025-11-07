// Controller for patient operations

import { where } from 'sequelize';
import { Patient } from '../models/index.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllPatients = catchAsync(async (req, res, next) => {
    const patients = await Patient.findAll({ where: {doctorId: req.user.id} });
    res.status(200).json({
        status: 'success',
        data: patients
    });
});

export const getPatientById = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({ where: { id: req.params.id, doctorId: req.user.id } });
    if (!patient) return next(new AppError('Patient not found', 404));

    res.status(200).json({
        status: 'success',
        data: patient
    });
});

export const createPatient = catchAsync(async (req, res, next) => {
    const payload = { ...req.body, doctorId: req.user.id };
    const newPatient = await Patient.create(payload);
    res.status(201).json({
        status: 'success',
        data: newPatient
    });
});

export const updatePatient = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({ where: { id: req.params.id, doctorId: req.user.id } });
    if (!patient) return next(new AppError('Patient not found', 404));
    
    await patient.update(req.body);
    res.status(200).json({
        status: 'success',
        data: patient
    });
});

export const deletePatient = catchAsync(async (req, res, next) => {
    const patient = await Patient.findOne({ where: { id: req.params.id, doctorId: req.user.id } });
    if (!patient) return next(new AppError('Patient not found', 404));

    await patient.destroy();
    res.status(204).json({
        status: 'success',
        data: null
    });
});