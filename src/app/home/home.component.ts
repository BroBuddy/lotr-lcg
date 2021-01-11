import { Component, OnInit } from '@angular/core';

import {Observable, of} from 'rxjs';

import Missions from '../missions.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public missions: any[] = [];

  ngOnInit(): void {
    this.fetchMission()
      .subscribe(data => {
        if (data) {
          this.missions = data;
        }
      });
  }

  fetchMission(): Observable<any> {
    return of(Missions);
  }

}
