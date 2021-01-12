import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent  {

  @Input() maxCounter: number;

  trackByFn(index: number): number {
    return index;
  }
}
