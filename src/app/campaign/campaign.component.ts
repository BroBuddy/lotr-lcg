import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
})
export class CampaignComponent implements OnInit {

  public campaign$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.campaign$ = this.dataService.campaign$;
  }

  trackByFn(index: number): number {
    return index;
  }
}
