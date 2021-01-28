import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html'
})
export class ScenarioComponent implements OnInit {

  public cycles$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cycles$ = this.dataService.cycles$;
  }

  trackByFn(index: number): number {
    return index;
  }
}
