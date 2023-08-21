import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: EmployeesComponent }
];


@NgModule({
  declarations: [EmployeesComponent, EmployeeCardComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EmployeesModule { }
