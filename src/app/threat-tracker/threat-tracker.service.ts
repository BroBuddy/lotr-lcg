import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreatTrackerService {

  private playerCount = new BehaviorSubject<number>(1);
  readonly playerCount$ = this.playerCount.asObservable();

  private firstPlayerThreat = new BehaviorSubject<number>(28);
  readonly firstPlayerThreat$ = this.firstPlayerThreat.asObservable();

  private secondPlayerThreat = new BehaviorSubject<number>(28);
  readonly secondPlayerThreat$ = this.secondPlayerThreat.asObservable();

  constructor(private toastr: ToastrService) {}

  addPlayer(): void {
    this.playerCount.next(this.playerCount.getValue() + 1);
  }

  removePlayer(): void {
    this.playerCount.next(this.playerCount.getValue() - 1);
  }

  setThreat(player: string, amount?: number): void {
    if (player === 'first') {
      this.firstPlayerThreat.next(amount);
    } else {
      this.secondPlayerThreat.next(amount);
    }
  }

  increaseThreat(player?: string): void {
    if (player === 'first') {
      if (this.firstPlayerThreat.getValue() <= 49) {
        this.firstPlayerThreat.next(this.firstPlayerThreat.getValue() + 1);

        if (this.firstPlayerThreat.getValue() === 50) {
          this.toastr.error('1st player is eliminated');
        }
      }
    } else if (player === 'second') {
      if (this.secondPlayerThreat.getValue() <= 49) {
        this.secondPlayerThreat.next(this.secondPlayerThreat.getValue() + 1);

        if (this.secondPlayerThreat.getValue() === 50) {
          this.toastr.error('2nd player is eliminated');
        }
      }
    } else {
      if (this.firstPlayerThreat.getValue() <= 49) {
        this.firstPlayerThreat.next(this.firstPlayerThreat.getValue() + 1);

        if (this.firstPlayerThreat.getValue() === 50) {
          this.toastr.error('1st player is eliminated');
        }
      }

      if (this.secondPlayerThreat.getValue() <= 49) {
        this.secondPlayerThreat.next(this.secondPlayerThreat.getValue() + 1);

        if (this.secondPlayerThreat.getValue() === 50) {
          this.toastr.error('2nd player is eliminated');
        }
      }
    }
  }

  decreaseThreat(player?: string): void {
    if (player === 'first') {
      if (this.firstPlayerThreat.getValue() >= 1) {
        this.firstPlayerThreat.next(this.firstPlayerThreat.getValue() - 1);
      }
    } else if (player === 'second') {
      if (this.secondPlayerThreat.getValue() >= 1) {
        this.secondPlayerThreat.next(this.secondPlayerThreat.getValue() - 1);
      }
    } else {
      if (this.firstPlayerThreat.getValue() >= 1) {
        this.firstPlayerThreat.next(this.firstPlayerThreat.getValue() - 1);
      }

      if (this.secondPlayerThreat.getValue() >= 1) {
        this.secondPlayerThreat.next(this.secondPlayerThreat.getValue() - 1);
      }
    }
  }
}
