import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

interface response {
  item: any;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  state = 0;

  constructor(private _snackBar: MatSnackBar) { }

  setSpinner(status: boolean) {
    if (status) {
      // Wenn der Status true ist, füge ihn zum Array hinzu
      this.state += 1;
    } else {
      // Wenn der Status false ist, entferne ihn aus dem Array
      this.state -= 1;
    }
  }

  getSpinner() {
    // Der Gesamtstatus des Spinners ist true, wenn das Array mindestens einen true-Wert enthält
    return this.state;
  }


  openSnackbar(message: string, action: string){
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500
    });
  }
}
