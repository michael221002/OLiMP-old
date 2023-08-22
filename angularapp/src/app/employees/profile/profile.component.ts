import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveChange } from 'src/app/models/save-changes.model';
import { tableScema } from 'src/app/models/table-Scema.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  guid?: number;
  private sub: any;
  employeeData: tableScema | undefined; // Define employeeData property
  employeeChanges: saveChange[] = [];

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.guid = +params['employeeId'];

      // Rufen Sie die Employee-Daten und -Änderungen ab und geben Sie sie in der Konsole aus
      this.requestService.getEmployeeDetail(this.guid).subscribe(
        (employeeData: tableScema) => {
          this.employeeData = employeeData;
          console.log(employeeData);
        },
        error => {
          console.error('Error fetching employee general details:', error);
        }
      );

      this.requestService.getEmployeeChanges(this.guid).subscribe(
        (changes: saveChange[]) => {
          this.employeeChanges = changes;
        },
        error => {
          console.error('Error fetching employee changes:', error);
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
