// Routes for patient-related operations
import { Router } from 'express';
import { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Protect all patient routes

router.get('/', getAllPatients); 
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.patch('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;