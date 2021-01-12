import {Component, Input, Output} from '@angular/core';

import {Subject} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  public number = 0;

 @Input() card: any;
 @Output() activateCard: Subject<any> = new Subject<any>();

  onCardActivation(): void {
    this.activateCard.next(this.card);
  }

  increaseNumber(): void {
    this.number++
  }

}
