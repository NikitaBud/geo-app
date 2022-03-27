import { GeoTag } from './../search-input/search-input.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() set geoTag(value: GeoTag) {
    if (value) {
      this.latitude = value.lat;
      this.longitude = value.lon;
    }
  }

  public longitude: number = 55.78;
  public latitude: number = 49.12;

  ngOnInit(): void {}
}
