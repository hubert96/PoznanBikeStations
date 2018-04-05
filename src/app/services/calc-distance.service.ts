import { Injectable } from '@angular/core';
import {GetLocationService} from './get-location.service';
import {CurrentViewService} from './current-view.service';

@Injectable()
export class CalcDistanceService {
  station;

  calcOdleglosc(station) {
    if (typeof google !== 'undefined') {
      const myLocalization = new google.maps.LatLng(this.getLocationService.actualPosY, this.getLocationService.actualPosX);
      const bikeLocalization = new google.maps.LatLng(station.geometry.coordinates[1], station.geometry.coordinates[0]);
      return google.maps.geometry.spherical.computeDistanceBetween(myLocalization, bikeLocalization);
    }
  }

  constructor(private getLocationService: GetLocationService, private currentView: CurrentViewService) {
    this.station = this.currentView.expandedStation;
  }

}
