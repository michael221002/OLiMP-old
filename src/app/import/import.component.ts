import { Component } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { NewFile } from '../models/newFile';
import { timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>; // Ändern des Typs auf MatTableDataSource
  dataLoading = false;

  onFileChange(evt: any) {
    this.appData.newFileImport(evt).subscribe((data: NewFile) => {
      this.setLoadingStatus(true);
      this.dataSource = new MatTableDataSource(data.jsonData);
      this.displayedColumns = data.displayedColumns;
  
      timer(500).subscribe(() => {
        this.setLoadingStatus(false);
      });
    });
  }
  
  setLoadingStatus(status: boolean) {
    this.dataLoading = status;
  }

  filterValue = '';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getValueTrue(value: string | number): boolean {
    if (this.filterValue === '') {
      return false;
    } else if (String(value).includes(this.filterValue)) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private appData: AppDataService){}
}
