import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  constructor(private employeesService: EmployeesService){}

  searchValue: string[] = []; // Change the type to string[]

  ngOnInit() {
    this.employeesService.requestForEmployeeNames();
    this.searchValue = this.employeesService.getSearchValue();
  }

  searchFor(evtOrInput: Event | string) {
    let input: string;

    if (typeof evtOrInput === 'string') {
        input = evtOrInput;
    } else {
        input = (evtOrInput.target as HTMLInputElement).value.trim();
    }

    const searchValues = input.split(' '); // Aufteilen bei Leerzeichen
    this.employeesService.filterNameList(searchValues);
}

  geReqData(){
    return this.employeesService.data?.filteredNameList || [];
  }

  getSearchValue(){
    return this.employeesService.getSearchValue();
  }
}
