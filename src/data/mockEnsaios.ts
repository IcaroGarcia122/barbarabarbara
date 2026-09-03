import { Ensaio } from '../types';
import { getStoredEnsaios } from '../utils/storage';

export const SAMPLE_CODES = [
  'SOLAR-818T',
  'OK-15-VALENTINA',
  'OK-CASAMENTO-LUCAS',
  'OK-15-MARYANA',
  'SOLAR-JTBO',
];

export const getEnsaioByCode = (code: string): Ensaio | undefined => {
  const ensaios = getStoredEnsaios();
  const normalized = code.trim().toUpperCase();
  return ensaios[normalized];
};

export const getAllEnsaiosList = (): Ensaio[] => {
  const ensaios = getStoredEnsaios();
  return Object.values(ensaios);
};
