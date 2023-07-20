import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { NewFile } from '../models/newFile';
import { timer } from 'rxjs';
import { ImportService } from './import.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ImportModel } from '../models/import.model';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  NewFile: ImportModel = {
    displayedColumns: [],
    dataSource: new MatTableDataSource<any>([]),
    filteredDataSource: new MatTableDataSource<any>([]),
    dataLoading: false,
    selectedFile: null,
    showSettingXScale: "enable x-scroll",
    layout: "fixed",
    searchValue: [],
    filterValue: [],
    filterElements: [],
    filteredCategory: this.importData.newFile.getValue().filteredCategory
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(
    private appData: AppDataService, 
    public importData: ImportService, 
    private requestService: RequestService) {}

  openSnackBar(message: string, action: string) {
    this.appData.openSnackbar(message, action);
  }

  async saveCurrentState() {
    try {  
      const result = await this.requestService.saveCurrentState();
      this.openSnackBar(`Saving ${result}`, 'okay');
    } catch (error) {
      this.openSnackBar('Error while saving', 'okay');
    }
  }

  ngOnInit(): void {    
    this.appData.setSpinner(true);
    setTimeout(() => {
      this.importData.getNewFile().subscribe((newFile: NewFile) => {
        const storedSearchValue = this.importData.getSearchValue();
        const storedFilterValue = this.importData.getFilterValue();
        if (newFile && newFile.jsonData.length > 0) {
          this.processNewFile(newFile);
        }
  
        // Wiederherstellen der Such- und Filterwerte
        this.NewFile.searchValue = storedSearchValue;
        this.NewFile.filterValue = storedFilterValue;
        this.filterDataSource();
      });
      this.appData.setSpinner(false);
    }, 100);
  }

  ngAfterViewInit(): void {
    // Hier wird der Spinner aktualisiert, nachdem die View initialisiert wurde
    this.appData.setSpinner(false);
  }

  changeFilter(value: string) {
    if (this.NewFile.filteredCategory !== value) {
      this.NewFile.filterValue = []; // Filter zurücksetzen
    }
  
    this.NewFile.filterElements = [...new Set(this.NewFile.filteredDataSource.data.map((item: any) => item[value]))];
    this.NewFile.filteredCategory = value;
  
    // Überschreiben der filteredCategory
    this.importData.newFile.next({
      ...this.importData.newFile.getValue(), // Aktuelle Werte beibehalten
      filteredCategory: value // Neue Kategoriezuweisung
    });
  
    // Zurücksetzen des filterValue<
    this.NewFile.filterValue = [];
  
    this.filterDataSource();
  }

  processNewFile(newFile: NewFile) {
    this.NewFile.dataSource.data = newFile.jsonData;
    this.NewFile.filteredDataSource = new MatTableDataSource<any>(newFile.jsonData); // Initialisieren der filteredDataSource
    this.NewFile.displayedColumns = newFile.displayedColumns;
    this.NewFile.filterElements = [...new Set(this.NewFile.filteredDataSource.data.map((item: any) => item[this.NewFile.filteredCategory]))];
    this.NewFile.filteredDataSource.paginator = this.paginator;
  }

  setLoadingStatus(status: boolean) {
    this.NewFile.dataLoading = status;
  }

  changeTableLayout() {
    if (this.NewFile.layout === "auto") {
      this.NewFile.layout = "fixed";
      this.NewFile.showSettingXScale = "enable x-scroll";
    } else {
      this.NewFile.layout = "auto";
      this.NewFile.showSettingXScale = "disable x-scroll";
    }
  }

  getLength(): string {
    if (!this.NewFile.filteredDataSource || this.NewFile.filteredDataSource.data.length === 0) {
      return "file not imported";
    } else {
      return String(this.NewFile.filteredDataSource.data.length);
    }
  }

  onFileChange(evt: any) {
    this.NewFile.searchValue = [];
    this.NewFile.filterValue = [];
    this.importData.newFileImport(evt).subscribe((data: NewFile) => {
      this.setLoadingStatus(true);
      this.appData.setSpinner(true);
      this.processNewFile(data);

      timer(500).subscribe(() => {
        this.setLoadingStatus(false);
        this.appData.setSpinner(false);
      });
    });

    // Dateiname setzen
    const files = evt.target.files;
    if (files && files.length > 0) {
      this.NewFile.selectedFile = files[0];
    } else {
      this.NewFile.selectedFile = null;
    }
  }

  applyFilter(evt: Event) {
    const input = (evt.target as HTMLInputElement).value.trim();
    if (input !== '') {
      this.NewFile.searchValue = input.split(' ');
    } else {
      this.NewFile.searchValue = [];
    }

    this.importData.setSearchValue(this.NewFile.searchValue);

    this.filterDataSource();
  }

  filterDataSource() {
    this.importData.filterDataSource(this.NewFile.searchValue, this.NewFile.filterValue, this.NewFile.dataSource, this.NewFile.filteredDataSource, this.NewFile.displayedColumns, this.paginator, this.NewFile.filteredCategory);
    this.updatePaginator(); // Synchronisieren des Paginators nach der Aktualisierung der filteredDataSource
  }

  setFilterValue(event: Event, value: string) {
    event.preventDefault();
    this.NewFile.filterValue = [value];
    // Aktualisieren Sie den gespeicherten Filterwert im ImportService
    this.importData.setFilterValue(this.NewFile.filterValue);
    this.applyFilter({ target: { value: this.NewFile.searchValue.join(' ') } } as unknown as Event);
  }

  onPageChange(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.NewFile.filteredDataSource.paginator = this.paginator;
  }

  updatePaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator.length = this.NewFile.filteredDataSource.filteredData.length;
      this.paginator.firstPage();
    }
  }
}
