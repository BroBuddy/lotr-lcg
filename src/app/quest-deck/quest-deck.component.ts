import {Component, HostListener, Input} from '@angular/core';

import {KEY_CODE} from '../game/game-keys.enum';
import {ImageZoomService} from '../image-zoom/image-zoom.service';

@Component({
  selector: 'app-quest-deck',
  templateUrl: './quest-deck.component.html',
  styleUrls: ['./quest-deck.component.scss']
})
export class QuestDeckComponent {
  public questStep = 0;
  public progress = 0;

  @Input() deck: any[];

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    console.log('key', e);
    this.initKeys(e);
  }

  constructor(public zoomService: ImageZoomService) { }

  initKeys(e: any): void {
    const allowedKeys = ['body'];

    if (allowedKeys.indexOf(e.target.nodeName.toLowerCase()) !== -1) {
      switch (e.keyCode) {
        case KEY_CODE.UP:
          this.setProgress((this.progress + 1));
          break;
        case KEY_CODE.DOWN:
          this.setProgress((this.progress - 1));
          break;
        case KEY_CODE.LEFT:
          this.onPreviousCard();
          break;
        case KEY_CODE.RIGHT:
          this.onNextCard();
          break;
      }
    }
  }

  onPreviousCard(): void {
    this.progress = 0;

    if (this.questStep >= 1) {
      this.questStep--;
    } else {
      this.questStep = 0;
    }
  }

  onNextCard(): void {
    this.progress = 0;

    if (this.questStep < (this.deck.length - 1)) {
      this.questStep++;
    } else {
      this.questStep = (this.deck.length - 1);
    }
  }

  increaseProgress(event: Event): void {
    event.stopPropagation();
    this.setProgress(this.progress += 1);
  }

  decreaseProgress(event: Event): void {
    event.stopPropagation();
    this.setProgress(this.progress -= 1);
  }

  setProgress(progress: number): void {
    if (this.questStep % 2 && progress >= 1) {
      this.progress = progress;
    } else {
      this.progress = 0;
    }
  }

}
