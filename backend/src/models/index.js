// Sequalize initialization
import sequelize from '../config/db.js';
import User from './User.js';
import Patient from './Patient.js';


// Define associations if any
User.hasMany(Patient, { foreignKey: 'doctorId', as: 'patients', onDelete: 'CASCADE' }); // A user (doctor) can have many patients
Patient.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' }); // A patient belongs to a user (doctor)

export { sequelize, User, Patient };