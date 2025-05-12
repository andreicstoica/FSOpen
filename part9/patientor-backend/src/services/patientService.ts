import patientData from '../../data/patients.ts';
import { Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient: Patient = {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};