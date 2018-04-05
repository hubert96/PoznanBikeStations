import { Component, OnInit } from '@angular/core';
    import {CurrentViewService} from '../../../services/current-view.service';
    import {GetLocationService} from '../../../services/get-location.service';
import {CalcDistanceService} from '../../../services/calc-distance.service';

    @Component({
      selector: 'app-map',
      templateUrl: './map.component.html',
      styleUrls: ['./map.component.sass']
    })
    export class MapComponent implements OnInit {
      station;

      printMap (station) {
        this.currentView.showAllStations = false;
        const x = station.geometry.coordinates[0];
        const y = station.geometry.coordinates[1];
        setTimeout( () => {
          const gMap = new google.maps.Map(document.getElementById('map'));
          gMap.setZoom(17);
          gMap.setCenter(new google.maps.LatLng(y, x));
          gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          gMap.setOptions({
            disableDefaultUI: true
          });
          const bikeLayer = new google.maps.BicyclingLayer();
          bikeLayer.setMap(gMap);
          const bikeMarker = '../../assets/img/jowejek.png';
          const hiddenMarker = '../../assets/img/1x1-00000000.png';
          const locDot = '../../assets/img/loc1Normal.png';
          const localizationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.getLocationService.actualPosY, this.getLocationService.actualPosX),
            map: gMap,
            draggable: false,
            icon: locDot,
          });

          setInterval(() => {
            const actualPos = new google.maps.LatLng(this.getLocationService.actualPosY, this.getLocationService.actualPosX);
            localizationMarker.setPosition(actualPos);
          }, 1);
          const stationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(y, x),
            map: gMap,
            draggable: false,
            icon: bikeMarker
          });
          const stationMarkerLabel = new google.maps.Marker({
            position: new google.maps.LatLng(y, x),
            map: gMap,
            draggable: false,
            icon: hiddenMarker,
            label: {
              text: station.properties.bikes,
              color: '#65d196',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          });
        }, 1500);
      }

      calcOdleglosc(station) {
        return this.calcDistance.calcOdleglosc(station);
      }

      constructor(private currentView: CurrentViewService, private getLocationService: GetLocationService, private calcDistance: CalcDistanceService) {
        this.station = this.currentView.expandedStation;
        this.printMap(this.currentView.expandedStation);
  }

  ngOnInit() {
  }

}
