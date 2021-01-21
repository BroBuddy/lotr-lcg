import { Injectable } from '@angular/core';

import {BehaviorSubject, of} from 'rxjs';

import Cycle1 from './cycle-1-data.json';
import Cycle2 from './cycle-2-data.json';
import Cycle3 from './cycle-3-data.json';
import Cycle4 from './cycle-4-data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cycles = new BehaviorSubject<any>(null);
  readonly cycles$ = this.cycles.asObservable();

  private scenario = new BehaviorSubject<any>(null);
  readonly scenario$ = this.scenario.asObservable();

  constructor() {
    this.fetchData();
  }

  fetchData(): void {
    this.cycles.next(of(Cycle1.concat(Cycle2).concat(Cycle3).concat(Cycle4)));
  }

  setCycle(cId: number, sId: number): void {
    let cycleData;

    switch (Number(cId)) {
      case 1:
        cycleData = Cycle1;
        break;
      case 2:
        cycleData = Cycle2;
        break;
      case 3:
        cycleData = Cycle3;
        break;
      case 4:
        cycleData = Cycle4;
        break;
    }

    const scenario = cycleData[0].missions.filter(data => data.id === Number(sId));
    this.scenario.next(scenario[0]);
  }
}
