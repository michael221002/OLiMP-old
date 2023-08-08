import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./import/import.module').then(m => m.ImportModule), data: { pageName: 'NewFile' } },
  { path: 'initialiaze', loadChildren: () => import('./initialize/initialize.module').then(m => m.InitializeModule), data: { pageName: 'Initialiaze' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
