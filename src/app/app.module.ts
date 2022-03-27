import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMapLibreGLModule } from 'ngx-maplibre-gl';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [AppComponent, MapComponent, SearchInputComponent],
  imports: [
    BrowserModule,
    NgxMapLibreGLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
