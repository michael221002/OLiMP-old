import { Injectable } from '@angular/core';
import { employeesServiceData, nameList } from './employeesServiceData.model';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  data: employeesServiceData = new employeesServiceData();

  requestForEmployeeNames(){
    this.requestService.getEmployeeNames().subscribe(
      (data: nameList[]) => {
        this.data.nameList = data;
        console.log(data);
      },
      (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    );
  }

  constructor(private requestService: RequestService) { }
}
