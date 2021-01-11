import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    mat-toolbar {
      background-color: rgba(0,0,0,0.5) !important;
      color: #fff !important;
    }`
  ]
})
export class HeaderComponent {

  public threat = 28;

  decreaseThreat(amount?: number): void {
    if (amount) {
      this.threat = this.threat - amount;
    } else {
      this.threat--;
    }
  }

  increaseThreat(): void {
    this.threat++;
  }

}
