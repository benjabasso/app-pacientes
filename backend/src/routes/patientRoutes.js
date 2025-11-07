// Routes for patient-related operations
import { Router } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect); // Protect all patient routes

router.get('/', getAllPatients); 
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.patch('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;