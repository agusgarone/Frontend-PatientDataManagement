import {create} from 'zustand';
import {IPatient} from '../Common/Interfaces/patient.model';

interface IInitialValuesState {
  patientSelected: IPatient;
  patients: IPatient[];
  getPatientSelected: () => IPatient;
  setPatientSelected: (patient: IPatient) => void;
  addPatients: (patients: IPatient[]) => void;
  addPatient: (patient: IPatient) => void;
  updatePatient: (updatedPatient: IPatient) => void;
  deletePatient: (patientId: string) => void;
}

const useGlobalSessionState = create<IInitialValuesState>((set, get) => ({
  patientSelected: {
    avatar: '',
    createdAt: '',
    description: '',
    id: '',
    name: '',
    website: '',
  },
  patients: [],

  getPatientSelected: () => {
    return get().patientSelected;
  },

  setPatientSelected: (patient: IPatient) => {
    set({patientSelected: patient});
  },

  addPatients: (patients: IPatient[]) => {
    set(state => ({
      patients: [...state.patients, ...patients],
    }));
  },

  addPatient: (patient: IPatient) => {
    set(state => ({
      patients: [...state.patients, patient],
    }));
  },

  updatePatient: (updatedPatient: IPatient) => {
    set(state => ({
      patients: state.patients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient,
      ),
    }));
  },

  deletePatient: (patientId: string) => {
    set(state => ({
      patients: state.patients.filter(patient => patient.id !== patientId),
    }));
  },
}));

export default useGlobalSessionState;
