import { createContext } from 'react';
import { Snackbar } from './Snackbar';

export const SnackbarContext = createContext(
  new Snackbar({
    open: false,
    setOpen: returnFalse,
    alertMessage: '',
    setAlertMessage: returnString,
    severity: 'success',
    setSeverity: returnString,
  })
);

function returnFalse() {
  return false;
}
function returnString() {
  return '';
}
