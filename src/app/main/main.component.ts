import { Component, OnInit,  } from '@angular/core';
import { HttpService } from '../http.service';
import 'rxjs/add/operator/retry';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  bikeStationsJsonek;
  showAllStations = true;
  expandedStationId: number;
  actualStation;
  actualPosY: number;
  actualPosX: number;

  watchID = navigator.geolocation.watchPosition( (position) => {
    this.actualPosY = position.coords.latitude;
    this.actualPosX = position.coords.longitude;
  });

  getBikesStation() {
    this.httpService.getPosts().subscribe( bikesStation => {
      this.bikeStationsJsonek = bikesStation;
    });
  }

  calcOdleglosc(station){
    if(typeof google !== 'undefined') {
      let myLocalization = new google.maps.LatLng(this.actualPosY, this.actualPosX);
      let bikeLocalization = new google.maps.LatLng(station.geometry.coordinates[1], station.geometry.coordinates[0]);
      return google.maps.geometry.spherical.computeDistanceBetween(myLocalization, bikeLocalization);
    }
  }

  expandStation(station){
    this.actualStation = station;
    if (this.showAllStations == false && google !== null) {}
    else {
      this.showAllStations = false;
      this.expandedStationId = station.id;
      document.getElementById('mainStation').classList.add("expanded");
      document.getElementById(station.id).classList.add("expanded");
      let x = station.geometry.coordinates[0];
      let y = station.geometry.coordinates[1];
      setTimeout( ()=>{
        let gMap = new google.maps.Map(document.getElementById('map'));
        gMap.setZoom(17);
        gMap.setCenter(new google.maps.LatLng(y, x));
        gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        gMap.setOptions({
          disableDefaultUI: true
        });
        let bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(gMap);
        let jowejek = '../../assets/img/jowejek.png';
        let pixelZniszczenia = '../../assets/img/1x1-00000000.png';
        let kropeczka = '../../assets/img/loc1Normal.png';
        let localizationMarker = new google.maps.Marker({
          position: new google.maps.LatLng(this.actualPosY, this.actualPosX),
          map: gMap,
          draggable: false,
          icon: kropeczka,
        });
        setInterval(()=>{
          let actualPos = new google.maps.LatLng(this.actualPosY, this.actualPosX);
          localizationMarker.setPosition(actualPos);
        }, 100);
        let stationMarker = new google.maps.Marker({
          position: new google.maps.LatLng(y, x),
          map: gMap,
          draggable: false,
          icon: jowejek
        });
        let stationMarkerLabel = new google.maps.Marker({
          position: new google.maps.LatLng(y, x),
          map: gMap,
          draggable: false,
          icon: pixelZniszczenia,
          label: {
            text: station.properties.bikes,
            color: "#65d196",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
      }, 1500);
    }
  }
  collapseStation() {
    this.expandedStationId = 0;
    this.showAllStations = true;
    document.getElementById(this.actualStation.id).classList.remove("expanded");
    document.getElementById(this.actualStation.id).classList.remove("expanded");
  }

  ngOnInit() {
  }

  constructor(private httpService: HttpService){
    this.getBikesStation();
  }
}
export interface bikeStationsJson {
  features: [{
    geometry: {
      coordinates,
      type,
    },
    id,
    type,
    properties: {
      free_racks,
      bikes,
      label,
      bike_racks,
      updated
    }
  }],
  crs: {
    type,
    properties: {
      code
    }
  },
  type
}

