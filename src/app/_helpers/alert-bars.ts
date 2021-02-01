import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertBars {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {
  }
  openSuccessSnackBar = (message: string = 'Operación exitosa', action: string = 'Cerrar') => {
   return  this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'success-mat',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openErrorSnackBar = (message: string = 'Operación fallada', action: string = 'Cerrar') => {
   return this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'error-mat',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSendingSnackBar = (message: string = 'Enviando...', action: string = '') => {
   return this._snackBar.open(message, action, {
      panelClass: 'loading-mat',
     horizontalPosition: this.horizontalPosition,
     verticalPosition: this.verticalPosition,
    });
  }
}
