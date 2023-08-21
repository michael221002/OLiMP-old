import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  constructor(private employeesService: EmployeesService){}

  myControl = new FormControl('');

  ngOnInit() {
    this.employeesService.requestForEmployeeNames()
  }

  searchFor(evt: Event) {
    const input = (evt.target as HTMLInputElement).value.trim();
    console.log(input);
  }

  geReqData(){
    return this.employeesService.data.nameList
  }
}
