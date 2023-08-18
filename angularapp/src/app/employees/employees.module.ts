import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent }
];


@NgModule({
  declarations: [EmployeesComponent, EmployeeCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeesModule { }
