// Patient model 
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({

    name: {type: String, required: true},
    age: {type: Number, required: true},
    history: {type: String, required: true},
    dni: {type: String, required: true, unique: true},
    social_security: {type: String, required: true},
    email: {type: String, required: true, unique: true}

}, 
    {versionKey: false}
);

export default mongoose.model("Patient", patientSchema);