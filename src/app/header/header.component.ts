import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    mat-toolbar {
      background-color: rgba(0,0,0,0.7) !important;
      color: #fff !important;
    }`
  ]
})
export class HeaderComponent {

  public playerCount = 1;
  public firstPlayerThreat = 28;
  public secondPlayerThreat = 28;

  constructor(private toastr: ToastrService) {}

  setThreat(player: string, amount?: number): void {
    if (player === 'first') {
      this.firstPlayerThreat = amount;
    } else {
      this.secondPlayerThreat = amount;
    }
  }

  decreaseThreat(player: string): void {
    if (player === 'first') {
      if (this.firstPlayerThreat >= 1) {
        this.firstPlayerThreat--;
      }
    } else {
      if (this.secondPlayerThreat >= 1) {
        this.secondPlayerThreat--;
      }
    }
  }

  increaseThreat(player: string): void {
    if (player === 'first') {
      if (this.firstPlayerThreat <= 49) {
        this.firstPlayerThreat++;

        if(this.firstPlayerThreat === 50) {
          this.toastr.error('1st player is eliminated');
        }
      }
    } else {
      if (this.secondPlayerThreat <= 49) {
        this.secondPlayerThreat++;

        if(this.secondPlayerThreat === 50) {
          this.toastr.error('2nd player is eliminated');
        }
      }
    }
  }

}
