import {Component, Input, Output} from '@angular/core';

import {Subject} from 'rxjs';

import {ImageZoomService} from '../image-zoom/image-zoom.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

 @Input() card: any;
 @Input() area: string;
 @Output() activateCard: Subject<any> = new Subject<any>();
 @Output() deactivateCard: Subject<any> = new Subject<any>();

 constructor(public zoomService: ImageZoomService) {}

  onCardActivation(): void {
    this.activateCard.next(this.card);
  }

  onCardDeactivation(): void {
    this.deactivateCard.next(this.card);
  }

}
