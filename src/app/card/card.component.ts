import {Component, Input, Output} from '@angular/core';

import {Subject} from 'rxjs';

import {ImageZoomService} from '../image-zoom/image-zoom.service';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent {

 @Input() card: any;
 @Input() area: string;
 @Output() activateCard: Subject<any> = new Subject<any>();
 @Output() deactivateCard: Subject<any> = new Subject<any>();

 constructor(private dataService: DataService, public zoomService: ImageZoomService) {}

    increaseProgress(event: Event): void {
        event.stopPropagation();
        this.dataService.onCardProgress(this.area, this.card, ++this.card.progress);
    }

    decreaseProgress(event: Event): void {
        event.stopPropagation();

        if (this.card.progress >= 1) {
            this.dataService.onCardProgress(this.area, this.card, --this.card.progress);
        }
    }

    setProgress(progress: number): void {
        this.dataService.onCardProgress(this.area, this.card, progress);
    }

  onCardActivation(): void {
    this.activateCard.next(this.card);
  }

  onCardDeactivation(): void {
    this.deactivateCard.next(this.card);
  }

}
