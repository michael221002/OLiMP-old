import { Injectable } from '@angular/core';
import { ImportService } from '../import/import.service';
import { AppDataService } from './app-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tableScema } from '../models/tableScema';
import { Observable, catchError } from 'rxjs';
import { saveChange } from '../models/saveChanges.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private importService: ImportService, private appData: AppDataService, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };


  //current State Endpoint
  async saveCurrentState(): Promise<string> {
    try {
      this.appData.setSpinner(true);
  
      const urlCurrentState = 'https://localhost:7169/api/CurrentState';
      const employeesList = this.importService.newFile.value.jsonData;
  
      await this.http.post<tableScema[]>(urlCurrentState, employeesList, this.httpOptions).toPromise();
      this.appData.setSpinner(false);
      return 'successfull';
    } catch (error) {
      console.error(error);
      this.appData.setSpinner(false);
      throw error;
    }
  }

  //history Endpoint
  private baseUrl = 'https://localhost:7169/api/EmployeeChanges';
  saveEmployeeChanges(changes: saveChange[]): Observable<any> {
    return this.http.post(this.baseUrl, changes, this.httpOptions);
  }
}
