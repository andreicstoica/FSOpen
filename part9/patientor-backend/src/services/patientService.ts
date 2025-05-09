import data from '../../data/patients.ts';
import { Patient } from '../types';

const patients: Patient[] = data;

const getPatients = (): Patient[] => {
    return patients;
};

export default {
    getPatients,
};