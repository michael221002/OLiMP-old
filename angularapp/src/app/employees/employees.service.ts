import { Injectable } from '@angular/core';
import { employeesServiceData, nameList } from './employeesServiceData.model';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  data: employeesServiceData = new employeesServiceData();

  constructor(private requestService: RequestService) {
    this.requestForEmployeeNames();
  }

  requestForEmployeeNames(){
    this.requestService.getEmployeeNames().subscribe(
      (data: nameList[]) => {
        this.data.filteredNameList = data;
        this.data.nameList = data;
        
        // Suche auslösen, nachdem die Daten abgerufen wurden
        this.filterNameList(this.getSearchValue());
      },
      (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    );
  }

  getSearchValue(): string[] {
    if (this.data?.searchValue != null) {
      return this.data.searchValue;
    } else {
      return ['']
    }
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
