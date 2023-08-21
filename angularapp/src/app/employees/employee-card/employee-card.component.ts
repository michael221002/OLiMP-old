import { Component, Input } from '@angular/core';
import { nameList } from '../employeesServiceData.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {

  @Input() employeeReqData!: nameList;

  ngOnInit() {
    console.log(this.employeeReqData.firstName);
  }

}
