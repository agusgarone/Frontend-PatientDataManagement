import {Dispatch, SetStateAction} from 'react';
import {IPatient} from './patient.model';

export interface ICard {
  patient: IPatient;
  setShow: Dispatch<SetStateAction<boolean>>;
}
