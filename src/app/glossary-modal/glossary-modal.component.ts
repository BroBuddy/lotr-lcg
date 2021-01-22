import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-glossary-modal',
  templateUrl: './glossary-modal.component.html'
})
export class GlossaryModalComponent implements OnInit {

  public ready = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.ready = true;
    }, 10);
  }

}
