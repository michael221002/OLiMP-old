import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';
  @ViewChild('drawer') drawer!: MatDrawer;

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawer.toggle();
    });
  }
}
