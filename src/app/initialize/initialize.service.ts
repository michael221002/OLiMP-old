import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tableScema } from '../models/tableScema';
import * as XLSX from 'xlsx';
import { InitializeFiles } from '../models/initialize-service.model';
import { AppDataService } from '../services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(private appData: AppDataService){}


  private initializeFiles: BehaviorSubject<InitializeFiles[]> = new BehaviorSubject<InitializeFiles[]>([]);

  newFileImport(file: File): Observable<InitializeFiles> {
    this.initializeFiles.next([]);
    const reader = new FileReader();

    return new Observable<InitializeFiles>((observer) => {
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
        const result: InitializeFiles = { jsonData, displayedColumns, fileName: file.name };

        this.initializeFiles.next([...this.initializeFiles.value, result]);
        observer.next(result);
        observer.complete();
      }; 
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsBinaryString(file);
    });
  }

  getInitializeFiles(): Observable<InitializeFiles[]> {
    return this.initializeFiles.asObservable();
  }
}
