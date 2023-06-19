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
  dataSource!: MatTableDataSource<any>;
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



  //search and Country
  searchValue = '';
  applyFilter(event: Event, menuFilter?: string) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchValue = searchValue;

    if (menuFilter) {
      // Führen Sie die Filterlogik für den Menüfilter durch
      // Hier können Sie die Filterung basierend auf dem Menüfilterwert implementieren
      console.log('Selected Menu Filter:', menuFilter);
    }

    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  getUniqueCountries(): string[] {
    // Überprüfen, ob das dataSource-Objekt initialisiert und Daten enthält
    if (this.dataSource && this.dataSource.data) {
      // Extrahieren Sie alle eindeutigen Länder aus den Daten
      const countriesSet = new Set(this.dataSource.data.map((element: any) => element.Country));
      const uniqueCountries = Array.from(countriesSet);
      return uniqueCountries;
    }
  
    return []; // Wenn keine Daten vorhanden sind, geben Sie ein leeres Array zurück
  }

  getValueTrue(value: string | number): boolean {
    if (this.searchValue === '') {
      return false;
    } else if (String(value).includes(this.searchValue)) {
      return true;
    } else {
      return false;
    }
  }


  constructor(private appData: AppDataService){}
}
