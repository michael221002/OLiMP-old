import { Component } from '@angular/core';
import { InitializeService } from './initialize.service';
import { forkJoin } from 'rxjs';
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

  onFilesSelected(event: Event) {
    this.appData.setSpinner(true);
    console.log("onFilesSelected called");
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const filesArray = Array.from(inputElement.files);
  
      const observables = filesArray.map(file => this.initializeService.newFileImport(file));
  
      forkJoin(observables).subscribe((data) => {
        console.log(data);
        this.appData.openSnackbar('Files imported successfully', 'okay');
        this.appData.setSpinner(false);
      }, (error) => {
        console.error("Error importing files:", error);
        this.appData.openSnackbar(`There went something wrong ${error}`, 'okay');
        this.appData.setSpinner(false);
      });
    }
  }
}
