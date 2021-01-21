import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public cycles$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cycles$ = this.dataService.cycles$;
  }

  trackByFn(index: number): number {
    return index;
  }
}
