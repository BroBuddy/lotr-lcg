import {Component, Input, OnInit, Output} from '@angular/core';

import {Subject} from 'rxjs';

import {ImageZoomService} from '../image-zoom/image-zoom.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {

    public progress: number;

 @Input() card: any;
 @Input() area: string;
 @Output() activateCard: Subject<any> = new Subject<any>();
 @Output() deactivateCard: Subject<any> = new Subject<any>();

 constructor(public zoomService: ImageZoomService) {}

 ngOnInit(): void {
     this.progress = this.card.progress;
 }

    increaseProgress(event: Event): void {
        event.stopPropagation();
        this.progress++;
    }

    decreaseProgress(event: Event): void {
        event.stopPropagation();

        if (this.progress >= 1) {
            this.progress--;
        }
    }

    setProgress(progress: number): void {
        this.progress = progress;
    }

  onCardActivation(): void {
    this.activateCard.next(this.card);
  }

  onCardDeactivation(): void {
    this.deactivateCard.next(this.card);
  }

}
