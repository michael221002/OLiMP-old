import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppDataService } from './services/app-data.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, UrlSegment } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawer.toggle();
    });
  }

  getStatus(){
    return this.appData.getSpinner();
  }

  constructor(
    private appData: AppDataService, 
    private router: Router,
    private route: ActivatedRoute){}

  currentPageName: string = "Default Page";

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap((route) => route.data)
    ).subscribe((data) => {
      this.currentPageName = data['pageName'] || "Default Page";
    });
  }
}
