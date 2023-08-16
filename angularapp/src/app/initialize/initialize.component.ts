import { Component } from '@angular/core';
import { InitializeService } from './initialize.service';
import { Observable, forkJoin } from 'rxjs';
import { AppDataService } from '../services/app-data.service';
import { RequestService } from '../services/request.service';
import { saveChange } from '../models/saveChanges.model';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent {
  constructor(
    private initializeService: InitializeService,
    private appData: AppDataService,
    private requestService: RequestService) { }

  ngOnInit(): void {
  }

  saveEmployeeChanges() {
    this.appData.setSpinner(true);

    const changes = this.initializeService.getChanges();

    let saveChanges: saveChange[] = [];
    for (let i of changes){
      for (let x of i[1]){
        let value: saveChange = {
          employeeNumber: i[0].employeenumber,
          keyName: x.KeyName,
          oldKey: String(x.OldKey),
          newKey: String(x.NewKey),
          changeDate: String(x.ChangeDate)
      }
        saveChanges.push(value);
      }
    }
    
    this.requestService.saveEmployeeChanges(saveChanges).subscribe(
      data => {
        this.appData.openSnackbar(data.message, 'okay');
        this.initializeService.print(data.message);
        this.appData.setSpinner(false);
      },
      error => {
        this.appData.openSnackbar(error.message, 'okay');
        this.appData.setSpinner(false);
      }
    );
  }

  getHistoryState():boolean {
    return this.initializeService.historyState;
  }

  getProgressbarState(): string {
    return String(this.initializeService.ProgressBarState);
  }

  getWebConsole(): string[] {
    return this.initializeService.getwebConsole();
  }

  onFilesSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const filesArray = Array.from(inputElement.files);
  
      const observables = filesArray.map(file => this.initializeService.newFileImport(file));
  
      forkJoin(observables).subscribe((data) => {
        this.appData.openSnackbar('Files imported successfully', 'okay');
        this.initializeService.print('Files imported successfully')
        this.initializeService.getInitializeFiles().subscribe();
        
      }, (error) => {
        console.error("Error importing files:", error);
        this.appData.openSnackbar(`There went something wrong ${error}`, 'okay');
        this.initializeService.print(`There went something wrong ${error}`)
        
      });
    }
  }

  getFileNames(){
    return this.initializeService.getFiles();
  }

  startHistoryCreation() {
    this.appData.setSpinner(true);
    this.initializeService.print(this.initializeService.sortFilesByDate());

    this.initializeService.detectChanges().subscribe((changes) => {
      // Do whatever you want with the 'changes' data here.
      this.appData.openSnackbar("successfully created History", 'okay');
      this.appData.setSpinner(false);
    }, (error) => {
      console.error("Error detecting changes:", error);
      this.appData.openSnackbar(`There went something wrong ${error}`, 'okay');
      this.appData.setSpinner(false);
    });
  }


}
