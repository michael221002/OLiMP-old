import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';
import { InitializeComponent } from './initialize.component';

const routes: Routes = [
  { path: '', component: InitializeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, // Verwende das CommonModule anstelle von BrowserModule
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InitializeModule {}
