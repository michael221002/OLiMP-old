import { Component } from '@angular/core';
import { InitializeService } from './initialize.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.css']
})
export class InitializeComponent {
  constructor(private initializeService: InitializeService) { }

  ngOnInit(): void {
  }

  onFilesSelected(event: Event) {
    console.log("onFilesSelected called");
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const filesArray = Array.from(inputElement.files);
  
      const observables = filesArray.map(file => this.initializeService.newFileImport(file));
  
      forkJoin(observables).subscribe(() => {
        console.log("Files imported successfully.");
      }, (error) => {
        console.error("Error importing files:", error);
      });
    }
  }

  initialFiles(){
    console.log(this.initializeService.getInitializeFiles());
  }
}
