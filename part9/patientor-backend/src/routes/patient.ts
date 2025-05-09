import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (_req, res) => {
    res.send();
});

export default router;