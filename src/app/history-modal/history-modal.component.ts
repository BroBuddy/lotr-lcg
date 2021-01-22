import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html'
})
export class HistoryModalComponent implements OnInit {

  public history$: Observable<any[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.history$ = this.dataService.history$;
  }

  trackByFn(index: number): number {
    return index;
  }

}
