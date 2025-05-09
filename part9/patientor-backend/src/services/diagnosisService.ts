import data from '../../data/diagnoses.ts';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = data;

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses,
};