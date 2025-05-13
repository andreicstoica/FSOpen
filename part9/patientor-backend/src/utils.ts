import { Gender, NewPatient } from './types';
import z from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    occupation: z.string(),
});


export const toNewPatientEntry = (object: unknown): NewPatient => {
   return NewPatientSchema.parse(object);
};
