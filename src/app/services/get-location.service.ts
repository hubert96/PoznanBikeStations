import { Injectable } from '@angular/core';

@Injectable()
export class GetLocationService {
  actualPosX;
  actualPosY;
  message;
  options = {
    enableHighAccuracy: true,
    timeout: 0,
    maximumAge: 0
  };
  watchID = navigator.geolocation.watchPosition( (position) => {
    this.actualPosX = position.coords.longitude;
    this.actualPosY = position.coords.latitude;
    }, (position) => {
    this.message = position.message;
  }, this.options);

  constructor() {
  }
}
