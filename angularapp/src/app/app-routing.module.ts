import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./import/import.module').then(m => m.ImportModule), data: { pageName: 'NewFile' } },
  { path: 'initialiaze', loadChildren: () => import('./initialize/initialize.module').then(m => m.InitializeModule), data: { pageName: 'Initialiaze' } },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule), data: { pageName: 'Employees' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
