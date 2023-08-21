import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  constructor(private employeesService: EmployeesService){}

  ngOnInit() {
    this.employeesService.requestForEmployeeNames()
  }

  searchFor(evt: Event) {
  const input = (evt.target as HTMLInputElement).value.trim();
  const searchValues = input.split(' '); // Aufteilen bei Leerzeichen
  this.employeesService.filterNameList(searchValues);
}

  geReqData(){
    return this.employeesService.data?.filteredNameList || [];
  }
}
