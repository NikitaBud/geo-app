import { AppService } from './../app.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';

export interface GeoTag {
  city: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Output() selectedTag = new EventEmitter();

  public searchInput = new FormControl('');
  public results: GeoTag[] = [];
  public hideResults: boolean = true;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  getLocation() {
    if (this.searchInput.value.length >= 3) {
      this.hideResults = !this.hideResults;

      this.appService
        .getLocation(this.searchInput.value)
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          tap((response) => {
            this.results = response.results;
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    } else {
      this.results = [];
    }
  }

  selectTag(geoElement: GeoTag) {
    this.searchInput.setValue(geoElement.city);
    this.selectedTag.emit(geoElement);
    this.hideResults = !this.hideResults;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
