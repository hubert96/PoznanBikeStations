import { Component, OnInit,  } from '@angular/core';
import { HttpService } from '../../services/http.service';
import 'rxjs/add/operator/retry';
import {GetLocationService} from '../../services/get-location.service';
import {} from '@types/googlemaps';
import {CurrentViewService} from '../../services/current-view.service';
import {CalcDistanceService} from '../../services/calc-distance.service';
import set = Reflect.set;

@Component({
  selector: 'app-all-stations-view',
  templateUrl: './all-stations-view.component.html',
  styleUrls: ['./all-stations-view.component.sass']
})
export class AllStationsViewComponent implements OnInit {
  bikeStationsJsonek;
  getBikesStation() {
    this.httpService.getPosts().subscribe( bikesStation => {
      this.bikeStationsJsonek = bikesStation;
    });
  }
  expandStation(station) {
    this.currentView.expandedStation = station;
    this.currentView.expandedStationId = station.id;
    this.currentView.showAllStations = false;
  }
  calcOdleglosc(station, i) {
    const distance = this.calcDistance.calcOdleglosc(station);
    this.bikeStationsJsonek.features[i].distance = distance;
    if (i === this.bikeStationsJsonek.features.length - 1) {
      this.bikeStationsJsonek.features.sort(function (a, b) {
        return a.distance - b.distance;
      });
    }
  }

  ngOnInit() {
  }
  constructor(private httpService: HttpService, private getLocationService: GetLocationService,
              private currentView: CurrentViewService, private calcDistance: CalcDistanceService) {
    this.currentView.showAllStations = true;
    this.getBikesStation();
    setInterval(() => {
      this.getBikesStation();
    }, 120000);
    setInterval( () => {
      for (let i = 0; i < this.bikeStationsJsonek.features.length; i++) {
        this.calcOdleglosc(this.bikeStationsJsonek.features[i], i);
      }
    }, 500);
  }
}
