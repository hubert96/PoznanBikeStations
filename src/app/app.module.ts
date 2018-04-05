import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import { TopnavComponent } from './topnav/topnav.component';
import {GetLocationService} from './services/get-location.service';
import {CurrentViewService} from './services/current-view.service';
import { AllStationsViewComponent } from './main/all-stations-view/all-stations-view.component';
import { MapComponent } from './main/all-stations-view/map/map.component';
import { RouterModule, Routes } from '@angular/router';
import {CalcDistanceService} from './services/calc-distance.service';

const appRoutes: Routes = [
  { path: 'stations', component: AllStationsViewComponent },
  { path: 'stations/map', component: MapComponent },
  { path: '',   redirectTo: '/stations', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopnavComponent,
    AllStationsViewComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [HttpService, GetLocationService, CurrentViewService, CalcDistanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
