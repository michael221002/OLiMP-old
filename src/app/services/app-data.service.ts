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

  spinner: boolean = false;
  setSpinner(status: boolean){
    this.spinner = status;
  }
  getSpinner(){
    return this.spinner;
  }


  openSnackbar(message: string, action: string){
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500
    });
  }
  

  constructor(private _snackBar: MatSnackBar) { }
}
