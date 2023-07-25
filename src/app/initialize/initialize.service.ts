import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { tableScema } from '../models/tableScema';
import * as XLSX from 'xlsx';
import { InitializeFiles } from '../models/initialize-service.model';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor() {}

  initializeFiles: BehaviorSubject<InitializeFiles[]> = new BehaviorSubject<InitializeFiles[]>([]);


  webConsole: string[] = [];

  ProgressBarState: number = 0;

  getwebConsole(): string[] {
    return this.webConsole;
  }

  print(message: string) {
    this.webConsole.push(message);
  }

  newFileImport(file: File): Observable<InitializeFiles> {
    this.ProgressBarState = 0;
    const reader = new FileReader();

    // Funktion zum Extrahieren des Datums aus dem Dateinamen
    function extractDateFromFileName(fileName: string): Date {
      const regex = /(\d{4}-\d{2}-\d{2})/; // Regular Expression, um das Datum zu extrahieren (Annahme: Format YYYY-MM-DD)
      const match = fileName.match(regex);
      if (match && match[1]) {
        return new Date(match[1]);
      }
      return new Date(0); // Wenn kein Datum im Dateinamen gefunden wird, wird ein Standarddatum zurückgegeben.
    }

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

        // Extrahiere das Datum aus dem Dateinamen und speichere es im InitializeFiles-Objekt
        const fileDate = extractDateFromFileName(file.name);
        const result: InitializeFiles = { jsonData, displayedColumns, fileName: file.name, fileDate };

        // Füge die Datei im Array hinzu
        const currentFiles = [...this.initializeFiles.value, result];
        this.print("successfully imported " + file.name);

        this.initializeFiles.next(currentFiles);
        observer.next(result);
        observer.complete();
      }; 
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsBinaryString(file);
    });
  }

  sortFilesByDate() {
    const currentFiles = this.initializeFiles.value;
    currentFiles.sort((a, b) => {
      const dateA = a.fileDate.getTime();
      const dateB = b.fileDate.getTime();
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
    this.initializeFiles.next(currentFiles);
    return 'Files sorted susessfully'
  }

  getInitializeFiles(): Observable<InitializeFiles[]> {
    return this.initializeFiles.asObservable();
  }

  change(firstOne: tableScema, secOne: tableScema): boolean {
    const keys = Object.keys(firstOne);
    for (const key of keys) {
      if (firstOne[key] !== secOne[key]) {
        return true;
      }
    }
    return false;
  }

  //initialising context
  changes: any[] = [];
  detectChanges() {
    this.getInitializeFiles().pipe(
      // Do not process multiple times, only when new data is emitted.
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(files => {
      this.changes = []; // Reset changes on each new data emission.
  
      for (let file = 0; file < files.length - 1; file++) {
        for (let employee = 0; employee < files[file].jsonData.length; employee++) {
          const currentEmployee = files[file].jsonData[employee];
          const nextFileData = files[file + 1].jsonData;
          const matchedEmployee = nextFileData.find(
            (secondEmployee) => currentEmployee.employeenumber === secondEmployee.employeenumber
          );
  
          if (matchedEmployee && this.change(currentEmployee, matchedEmployee)) {
            this.changes.push([currentEmployee, matchedEmployee]);
          }
        }
      }
      console.log("found employees: ", this.changes);
    });
  }


  saveOldData(){
    return 'Save Data in Database';
  }
}
