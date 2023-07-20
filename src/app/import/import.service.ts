import { Injectable } from '@angular/core';
import { NewFile } from '../models/newFile';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ImportServiceModel } from '../models/import-service.model';
import { tableScema } from '../models/tableScema';

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
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
      const jsonData: tableScema[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      // Konvertiere die Werte von employeenumber, manager_employee_number und is_employed in Nummern
      for (const data of jsonData) {
        data.employeenumber = Number(data.employeenumber);
        data.manager_employee_number = Number(data.manager_employee_number);
        data.is_employed = Number(data.is_employed);
      }

      const displayedColumns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      const result: NewFile = { jsonData, displayedColumns };

      // Speichere den Dateinamen im ImportServiceModel
      this.newFile.next({ ...this.newFile.value, jsonData, displayedColumns, fileName: file.name });
    };
    reader.readAsBinaryString(file);

    return this.newFile.asObservable();
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
