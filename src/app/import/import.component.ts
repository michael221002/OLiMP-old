import { Component } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { NewFile } from '../models/newFile';
import { timer } from 'rxjs';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
  displayedColumns: string[] = [];
  dataSource!: any[];
  filteredDataSource!: any[];
  dataLoading = false;

  onFileChange(evt: any) {
    this.searchValue = [];
    this.filterValue = [];
    this.appData.newFileImport(evt).subscribe((data: NewFile) => {
      this.setLoadingStatus(true);
      this.dataSource = data.jsonData;
      this.filteredDataSource = data.jsonData;
      this.displayedColumns = data.displayedColumns;
      try {
        this.uniqueCountries = [...new Set(data.jsonData.map((item: any) => item.Country))];
      } catch (error) {
        this.uniqueCountries = []; // Setze die Liste auf eine leere Liste, falls ein Fehler auftritt
      }

  
      timer(500).subscribe(() => {
        this.setLoadingStatus(false);
      });
    });
  }
  
  setLoadingStatus(status: boolean) {
    this.dataLoading = status;
  }

  searchValue: string[] = [];
  filterValue: string[] = [];

  applyFilter(evt: Event) {
    const input = (evt.target as HTMLInputElement).value.trim();
    if (input !== '') {
      this.searchValue = input.split(' ');
      const value = this.searchValue.concat(this.filterValue);
      this.filteredDataSource = this.appData.filter(value, this.dataSource);
    } else {
      this.searchValue = []; // Setzen Sie die searchValue-Liste auf eine leere Liste
      this.filteredDataSource = this.dataSource;
    }
  }

  setFilterValue(event: Event, country: string) {
    event.preventDefault();
    this.filterValue = [country];
    this.applyFilter({ target: { value: country } } as unknown as Event);
  }
  

  isValuePresent(search: string[], value: any): boolean {
    if (typeof value === 'string') {
      const lowerCaseValue = value.toLowerCase();
  
      for (let i of search) {
        if (lowerCaseValue.includes(i.toLowerCase())) {
          return true;
        }
      }
    } else if (typeof value === 'number') {
      const stringValue = value.toString();
  
      for (let i of search) {
        if (stringValue.includes(i)) {
          return true;
        }
      }
    }
  
    return false;
  }
  uniqueCountries: string[] = [];


  constructor(private appData: AppDataService){}
}
