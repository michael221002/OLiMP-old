import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NewFile } from '../models/newFile';
import * as XLSX from 'xlsx';

interface response {
  item: any;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  //import new File
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

  //filter Array
  filter(value: string[], data: any[]): any[] {
    let response: any[] = [];
  
    for (let item of data) {
      let allCriteriaMatched = true;
  
      for (let i of value) {
        let criteriaMatched = false;
  
        for (let key in item) {
          const fieldValue = item[key];
  
          if (typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(i.toLowerCase())) {
            criteriaMatched = true;
            break;
          } else if (typeof fieldValue === 'number' && fieldValue.toString().includes(i)) {
            criteriaMatched = true;
            break;
          }
        }
  
        if (!criteriaMatched) {
          allCriteriaMatched = false;
          break;
        }
      }
  
      if (allCriteriaMatched) {
        response.push(item);
      }
    }
  
    return response;
  }

  constructor() { }
}
