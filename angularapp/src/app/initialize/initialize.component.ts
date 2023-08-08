import { Component } from '@angular/core';
import { InitializeService } from './initialize.service';
import { Observable, forkJoin } from 'rxjs';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent {
  constructor(private initializeService: InitializeService, private appData: AppDataService) { }

  ngOnInit(): void {
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
