import { Injectable } from '@angular/core';
import { employeesServiceData, nameList } from './employeesServiceData.model';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  data?: employeesServiceData;

  constructor(private requestService: RequestService) {
    this.requestForEmployeeNames();
  }

  requestForEmployeeNames(){
    this.requestService.getEmployeeNames().subscribe(
      (data: nameList[]) => {
        this.data = new employeesServiceData(
          data,
          [''],
          data,
        );
      },
      (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    );
  }

  filterNameList(input: string[]){
    if (this.data) {
      this.data.searchValue = input;
      this.data.filteredNameList = [];

      for (let employee of this.data.nameList){
        const fullName = `${employee.firstName} ${employee.lastName}`;
        
        if (input.length === 0 ||
            input.every(value => fullName.toLowerCase().includes(value.toLowerCase()))) {
          this.data.filteredNameList.push(employee);
        }
      }
    }
  }
}
