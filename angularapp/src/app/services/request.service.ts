import { Injectable } from '@angular/core';
import { ImportService } from '../import/import.service';
import { AppDataService } from './app-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tableScema } from '../models/tableScema';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private importService: ImportService, private appData: AppDataService, private http: HttpClient) { }


  //current State Endpoint
  async saveCurrentState(): Promise<string> {
    try {
      this.appData.setSpinner(true);
  
      const urlCurrentState = 'https://localhost:7169/api/CurrentState';
      const employeesList = this.importService.newFile.value.jsonData;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      await this.http.post<tableScema[]>(urlCurrentState, employeesList, httpOptions).toPromise();
      this.appData.setSpinner(false);
      return 'successfull';
    } catch (error) {
      console.error(error);
      this.appData.setSpinner(false);
      throw error;
    }
  }
}
