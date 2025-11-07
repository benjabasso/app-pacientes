// Patient model for PostgreSQL using Sequelize

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    social_security: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    doctorId: {   // Foreign key to User (doctor)
        type: DataTypes.INTEGER, 
        allowNull: false,
    }
    }, {
        tableName: 'patients',
        timestamps: true,
    });

export default Patient;