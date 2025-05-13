import { z } from 'zod';
import { NewPatientSchema } from './utils';

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
};

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
};

export interface Patient {
    id: string;
    gender: string;
    name: string;
    ssn: string;
    occupation: string;
    dateOfBirth: string;
};

export type NewPatient = z.infer<typeof NewPatientSchema>;