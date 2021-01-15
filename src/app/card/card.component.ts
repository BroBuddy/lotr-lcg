import {Component, Input, Output} from '@angular/core';

import {Subject} from 'rxjs';

import {ImageZoomService} from "../image-zoom/image-zoom.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  public number = 0;

 @Input() card: any;
 @Output() activateCard: Subject<any> = new Subject<any>();
 @Output() deactivateCard: Subject<any> = new Subject<any>();

 constructor(public zoomService: ImageZoomService) {}

  onCardActivation(): void {
    this.number = 0;
    this.activateCard.next(this.card);
  }

  onCardDectivation(): void {
    this.number = 0;
    this.deactivateCard.next(this.card);
  }

  increaseNumber(): void {
    this.number++;
  }

}
