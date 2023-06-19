import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NewFile } from '../models/newFile';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private newFile: BehaviorSubject<NewFile> = new BehaviorSubject<NewFile>({
    jsonData: [],
    displayedColumns: []
  });

  newFileImport(evt: any): Observable<NewFile> {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      const displayedColumns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      const result: NewFile = { jsonData, displayedColumns };

      this.newFile.next(result);
    };
    reader.readAsBinaryString(file);

    return this.newFile.asObservable();
  }

  getNewFile(): Observable<NewFile> {
    return this.newFile.asObservable();
  }

  constructor() { }
}
