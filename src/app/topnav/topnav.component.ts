import {Component, OnInit} from '@angular/core';
import {CurrentViewService} from '../services/current-view.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.sass']
})
export class TopnavComponent implements OnInit {
  showAllStations;

  constructor(private currentView: CurrentViewService) {
    setInterval(() => {
      this.showAllStations = this.currentView.showAllStations;
    }, 1);
  }

  collapseStation() {
    this.currentView.showAllStations = true;
  }

  ngOnInit() {}

}
