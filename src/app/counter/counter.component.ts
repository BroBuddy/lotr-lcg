import {Component} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent  {

  public progress = 0;

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
}
