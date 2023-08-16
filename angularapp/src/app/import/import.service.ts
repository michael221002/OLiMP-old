import { Injectable } from '@angular/core';
import { NewFile } from '../models/newFile.model';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ImportServiceModel } from '../models/import-service.model';
import { tableScema } from '../models/table-Scema.model';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  newFile: BehaviorSubject<ImportServiceModel> = new BehaviorSubject<ImportServiceModel>({
    jsonData: [],
    displayedColumns: [],
    searchValue: [],
    filterValue: [],
    filteredCategory: 'department',
    fileName: ''
  });

  setSearchValue(search: string[]) {
    this.newFile.value.searchValue = search;
  }

  getSearchValue(): string[] {
    return this.newFile.value.searchValue;
  }

  setFilterValue(filter: string[]) {
    this.newFile.value.filterValue = filter;
  }

  getFilterValue(): string[] {
    return this.newFile.value.filterValue;
  }

  newFileImport(evt: any): Observable<NewFile> {
    const file = evt.target.files[0];

    return new Observable<NewFile>((observer) => {
      // Create a new web worker
      const worker = new Worker(new URL('./import-file.worker', import.meta.url));

      // Listen to messages from the web worker
      worker.onmessage = (event) => {
        const result: NewFile = event.data;
        this.newFile.next({
          ...this.newFile.value,
          jsonData: result.jsonData,
          displayedColumns: result.displayedColumns,
          fileName: file.name
        });
        observer.next(result);
        observer.complete();
        worker.terminate(); // Terminate the web worker after use
      };

      // Handle errors from the web worker
      worker.onerror = (error) => {
        observer.error(error);
        observer.complete();
        worker.terminate(); // Terminate the web worker in case of an error
      };

      // Start the web worker by passing the file to it
      worker.postMessage({ file });
    });
  }

  getNewFile(): Observable<NewFile> {
    return this.newFile.asObservable();
  }

  filterDataSource(
    searchValue: string[],
    filterValue: string[],
    dataSource: MatTableDataSource<any>,
    filteredDataSource: MatTableDataSource<any>,
    displayedColumns: string[],
    paginator: MatPaginator,
    filteredCategory: string
  ) {
    if (searchValue.length === 0 && filterValue.length === 0) {
      filteredDataSource.data = dataSource.data;
    } else {
      filteredDataSource.data = dataSource.data.filter((item: any) => {
        if (filterValue.length > 0 && filterValue[0] !== '' && !filterValue.includes(item[filteredCategory])) {
          return false;
        }

        for (let search of searchValue) {
          let found = false;
          for (let column of displayedColumns) {
            if (column !== filteredCategory && this.isValuePresent([search], item[column])) {
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        }
        return true;
      });
    }
    filteredDataSource.paginator = paginator;
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

  onPageChange(event: PageEvent, filteredDataSource: MatTableDataSource<any>) {
    filteredDataSource.paginator = event.pageIndex === 0 ? null : (filteredDataSource.paginator as MatPaginator | null);
  }
}
