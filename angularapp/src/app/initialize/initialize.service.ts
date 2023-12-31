import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { tableScema } from '../models/table-Scema.model';
import * as XLSX from 'xlsx';
import { InitializeFiles } from '../models/initialize-service.model';
import { AppDataService } from '../services/app-data.service';
import { saveChange } from '../models/save-changes.model';
import { RequestService } from '../services/request.service';
import { preChanges } from '../models/worker-changes.model';
import { department } from '../models/departments.model';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(
    private appData: AppDataService,
    private requestService: RequestService
  ) {}

  initializeFiles: BehaviorSubject<InitializeFiles[]> = new BehaviorSubject<InitializeFiles[]>([]);


  webConsole: string[] = [];
  historyState: boolean = false;

  ProgressBarState: number = 0;

  getwebConsole(): string[] {
    return this.webConsole;
  }

  getFiles(): string[] {
    const files = this.initializeFiles.value;
    return files.map(file => file.fileName);
  }

  print(message: string) {
    this.webConsole.push(message);
  }

  newFileImport(file: File): Observable<InitializeFiles> {
    this.appData.setSpinner(true);
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
      this.appData.setSpinner(true);
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
        this.print("[+] successfully imported " + file.name);

        this.initializeFiles.next(currentFiles);
        observer.next(result);
        observer.complete();
        this.appData.setSpinner(false);
      }; 
      reader.onerror = (error) => {
        observer.error(error);
        this.appData.setSpinner(false);
      };
      reader.readAsBinaryString(file);
      this.appData.setSpinner(false);
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
  changes: preChanges[] = [];
  detectChanges(): Observable<preChanges> {
    return new Observable((observer) => {
      const worker = new Worker(new URL('./detect-changes.worker', import.meta.url));
      const logs: string[] = []; // Neues Array, um die Log-Nachrichten zu speichern.

      worker.onmessage = (event) => {
        const message = event.data;
        if (message.type === 'log') {
          logs.push(message.message);
        } else if (message.type === 'result') {
          const changes = message.changes;

          // Hier können Sie die 'changes'-Array verarbeiten, wie Sie es benötigen.
          // Zum Beispiel können Sie eine andere Funktion aufrufen, um die Änderungen zu behandeln.
          this.handleChanges(changes);

          // Jetzt können Sie auch das 'logs'-Array verwenden, um die webConsole zu aktualisieren.
          /*for (const logMessage of logs) { // Rufen Sie die print-Funktion
          }*/

          observer.next(changes);
          observer.complete();
        }
      };

      worker.onerror = (error) => {
        observer.error(error);
        observer.complete();
      };

      worker.postMessage({ files: this.initializeFiles.value });
    });
  }


  //with log
  /*
  detectChanges(): Observable<any> {
    return this.getInitializeFiles().pipe(
      switchMap((files) => {
        const worker = new Worker(new URL('./detect-changes.worker', import.meta.url));
        const logs: any[] = [];

        return new Observable((observer) => {
          worker.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'log') {
              logs.push(message.message);
              // Update the webConsole immediately with each log message.
              this.print(message.message);
            } else if (message.type === 'result') {
              const changes = message.changes;
              this.handleChanges(changes);
              observer.next(changes);
              observer.complete();
            }
          };
  
          worker.onerror = (error) => {
            observer.error(error);
            observer.complete();
          };
  
          worker.postMessage({ files });
        });
      })
    );
  }
  */

  // Function to handle the changes received from the Web Worker.
  handleChanges(changes: preChanges[]) {
    // Führen Sie hier die erforderlichen Aktionen mit dem 'changes'-Array aus.
    this.print("[+] history restored successfully");
    this.print("[i] fount: " + changes.length + " changes");
    this.historyState = true;
    this.changes = changes;
    //for (let i of changes){
    //  for (let j of i[1]){
    //    this.print(i[0].user_principal_name + "[" + j.keyName + "]: " + j.oldKey + " -> " + j.newKey)
    //  }
    //}
  }

  getChanges(): preChanges[] {
    return this.changes;
  }


  saveOldData(){
    return 'Save Data in Database';
  }

  saveEmployeeChanges() {
    this.appData.setSpinner(true);

    const changes = this.getChanges();

    let saveChanges: saveChange[] = [];
    for (let i of changes){
      for (let x of i.changedData){
        let value: saveChange = {
          employeeNumber: i.employee.employeenumber,
          keyName: x.KeyName,
          oldKey: String(x.OldKey),
          newKey: String(x.NewKey),
          changeDate: x.ChangeDate
      }
        saveChanges.push(value);
      }
    }
    
    this.requestService.saveEmployeeChanges(saveChanges).subscribe(
      data => {
        this.appData.openSnackbar(data.message, 'okay');
        this.print('[+] ' + data.message);
        this.appData.setSpinner(false);
      },
      error => {
        this.appData.openSnackbar(error.message, 'okay');
        this.print('[-] ' + error.message);
        this.appData.setSpinner(false);
      }
    );
  }

  saveDepartements(){
    this.appData.setSpinner(true);
    let departements: department[] = [];
    for (let i of this.departments){
      departements.push(new department(i));
    }
    this.requestService.saveDepartements(departements).subscribe(
      data => {
        this.appData.openSnackbar(data.message, 'okay');
        this.print('[+] ' + data.message);
        this.appData.setSpinner(false);
      },
      error => {
        this.appData.openSnackbar(error.message, 'okay');
        this.print('[!] ' + error.message);
        this.appData.setSpinner(false);
      }
    );;
  }

  departments: string[] = [];

  showForDepartements() {
    this.appData.setSpinner(true);
    const files = this.initializeFiles.value;
  
    for (const file of files) {
      const jsonData = file.jsonData;
      for (const data of jsonData) {
        if (!this.departments.includes(data.department)) {
          this.departments.push(data.department);
        }
      }
    }

    this.print("[+] successfully created list of departments")
    this.print("[i] found: " + this.departments)

    this.appData.setSpinner(false);
  }
}
