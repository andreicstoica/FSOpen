import express from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatient } from '../types';
import { Response } from 'express';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatient(req.body);

    const addedPatientEntry: NewPatient = patientService.addPatient(newPatientEntry);

    res.json(addedPatientEntry);
});

export default router;