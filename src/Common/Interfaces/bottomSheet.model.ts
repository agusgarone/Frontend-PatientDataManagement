import {Dispatch, SetStateAction} from 'react';

export interface IBottomSheet {
  show: boolean;
  onDismiss: () => void;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  animation: boolean;
}
