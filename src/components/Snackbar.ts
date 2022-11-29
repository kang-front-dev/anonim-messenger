import { SetStateAction, Dispatch } from 'react';

export interface ISnackbar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | Function;
  alertMessage: string;
  setAlertMessage: Dispatch<SetStateAction<string>> | Function;
  severity: string;
  setSeverity: Dispatch<SetStateAction<string>> | Function;
}
export class Snackbar implements ISnackbar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | Function;
  alertMessage: string;
  setAlertMessage: Dispatch<SetStateAction<string>> | Function;
  severity: string;
  setSeverity: Dispatch<SetStateAction<string>> | Function;

  constructor(options: ISnackbar) {
    this.open = options.open;
    this.setOpen = options.setOpen;
    this.alertMessage = options.alertMessage;
    this.setAlertMessage = options.setAlertMessage;
    this.severity = options.severity;
    this.setSeverity = options.setSeverity;
  }
}
