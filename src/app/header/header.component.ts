import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public threat = 24;

  decreaseThreat(): void {
    this.threat--;
  }

  increaseThreat(): void {
    this.threat++;
  }

}
