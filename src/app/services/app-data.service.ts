import { Injectable } from '@angular/core';

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

  

  constructor() { }
}
