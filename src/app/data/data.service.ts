import { Injectable } from '@angular/core';

import {BehaviorSubject, of} from 'rxjs';

import Cycle1 from './cycle-1-data.json';
import Cycle2 from './cycle-2-data.json';
import Cycle3 from './cycle-3-data.json';
import Cycle4 from './cycle-4-data.json';
import Cycle5 from './cycle-5-data.json';

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
    this.cycles.next(of(Cycle1.concat(Cycle2).concat(Cycle3).concat(Cycle4).concat(Cycle5)));
  }

  setScenario(cId: number, sId: number): void {
    let scenarioData;

    switch (Number(cId)) {
      case 1:
        scenarioData = Cycle1;
        break;
      case 2:
        scenarioData = Cycle2;
        break;
      case 3:
        scenarioData = Cycle3;
        break;
      case 4:
        scenarioData = Cycle4;
        break;
    }

    const scenario = scenarioData[0].scenarios.filter(data => data.id === Number(sId));
    this.scenario.next(scenario[0]);
  }
}
