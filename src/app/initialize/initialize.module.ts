import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InitializeComponent } from './initialize.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

const routes: Routes = [
  { path: '', component: InitializeComponent }
];

@NgModule({
  declarations: [InitializeComponent],
  imports: [
    CommonModule, // Verwende das CommonModule anstelle von BrowserModule
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule
  ],
})
export class InitializeModule {}
