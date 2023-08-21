import { Injectable } from '@angular/core';
import { ImportService } from '../import/import.service';
import { AppDataService } from './app-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tableScema } from '../models/table-Scema.model';
import { Observable, catchError } from 'rxjs';
import { saveChange } from '../models/save-changes.model';
import { department } from '../models/departments.model';
import { nameList } from '../employees/employeesServiceData.model';

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
  saveEmployeeChanges(changes: saveChange[]): Observable<any> {
    let baseUrl = 'https://localhost:7169/api/EmployeeChanges';
    return this.http.post(baseUrl, changes, this.httpOptions);
  }
  saveDepartements(departements: department[]): Observable<any> {
    let baseUrl = 'https://localhost:7169/api/EmployeeChanges/departements'
    return this.http.post(baseUrl, departements, this.httpOptions);
  }

  //selectEmployee Endpoint
  getEmployeeNames(): Observable<nameList[]> {
    let baseUrl = 'https://localhost:7169/api/SelectEmployee';
    return this.http.get<nameList[]>(baseUrl);
  }
  getEmployeeDetail(id: number): Observable<tableScema> {
    let baseUrl = `https://localhost:7169/api/EmployeeChanges/generaldetails/${id}`;
    return this.http.get<tableScema>(baseUrl);
  }
  getEmployeeChanges(id: number): Observable<saveChange[]> {
    let baseUrl = `https://localhost:7169/api/EmployeeChanges/changes/${id}`;
    return this.http.get<saveChange[]>(baseUrl);
  }
}
