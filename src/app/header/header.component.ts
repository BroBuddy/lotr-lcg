import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    mat-toolbar {
      background-color: rgba(0,0,0,0.5) !important;
      color: #fff !important;
    }
  
    .threat-box {
      .threat-count {
        margin: 3px 10px;
      }
    }`
  ]
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
