import { Component } from '@angular/core';

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

  setThreat(player: string, amount?: number): void {
    if (player === 'first') {
      this.firstPlayerThreat = amount;
    } else {
      this.secondPlayerThreat = amount;
    }
  }

  decreaseThreat(player: string): void {
    if (player === 'first') {
      this.firstPlayerThreat--;
    } else {
      this.secondPlayerThreat--;
    }
  }

  increaseThreat(player: string): void {
    if (player === 'first') {
      this.firstPlayerThreat++;
    } else {
      this.secondPlayerThreat++;
    }
  }

}
