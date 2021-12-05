import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {ThreatTrackerService} from './threat-tracker.service';

@Component({
  selector: 'app-threat-tracker',
  templateUrl: './threat-tracker.component.html',
})
export class ThreatTrackerComponent implements OnInit, OnDestroy {

  public playerCount$: Observable<number>;
  public firstPlayerThreat$: Observable<number>;
  public secondPlayerThreat$: Observable<number>;

  constructor(public threatTrackerService: ThreatTrackerService) {}

  ngOnInit(): void {
    this.playerCount$ = this.threatTrackerService.playerCount$;
    this.firstPlayerThreat$ = this.threatTrackerService.firstPlayerThreat$;
    this.secondPlayerThreat$ = this.threatTrackerService.secondPlayerThreat$;
  }

  onSetThreat(player: string, amount?: number): void {
    this.threatTrackerService.setThreat(player, amount);
  }

  onDecreaseThreat(player: string): void {
    this.threatTrackerService.decreaseThreat(player);
  }

  onIncreaseThreat(player: string): void {
    this.threatTrackerService.increaseThreat(player);
  }

  onAddPlayer(): void {
    this.threatTrackerService.addPlayer();
  }

  onRemovePlayer(): void {
    this.threatTrackerService.removePlayer();
  }

  ngOnDestroy(): void {
    this.threatTrackerService.resetPlayerThreat();
  }

}
