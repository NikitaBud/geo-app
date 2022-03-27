import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'geo-test';
  public selectedTag: any;

  getGeoMaker(event: any) {
    this.selectedTag = event;
  }
}
