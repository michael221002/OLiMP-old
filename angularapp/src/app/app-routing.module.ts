import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './employees/profile/profile.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./import/import.module').then(m => m.ImportModule), data: { pageName: 'NewFile' } },
  { path: 'initialiaze', loadChildren: () => import('./initialize/initialize.module').then(m => m.InitializeModule), data: { pageName: 'Initialiaze' } },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule), data: { pageName: 'Employees' } },
  { path: 'details/:employeeId', component: ProfileComponent, data: { pageName: 'Profile'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
