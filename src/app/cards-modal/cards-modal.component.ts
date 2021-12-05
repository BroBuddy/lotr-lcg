import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';

@Component({
  selector: 'app-cards-modal',
  templateUrl: './cards-modal.component.html',
    styles: [`.enemy-card {
      color: red !important;
    }

    .treachery-card {
      color: orange !important;
    }

    .location-card {
      color: yellow !important;
    }`]
})
export class CardsModalComponent implements OnInit {

  public encounterDeck$: Observable<any[]>;
  public discardPile$: Observable<any[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.encounterDeck$ = this.dataService.encounterDeck$;
    this.discardPile$ = this.dataService.discardPile$;
  }

  onChooseCard(card: any, index: number): void {
    this.dataService.onChooseCard(card, index);
  }

  onCreateEncounterDeck(): void {
    this.dataService.onCreateEncounterDeck();
  }

  onResetDiscardPile(): void {
    this.dataService.onResetDiscardPile();
  }

  onPlayCard(card: any): void {
    this.dataService.onResetCard('staging', card);
  }

  onShuffleBack(card: any): void {
    this.dataService.onResetCard('encounter', card);
  }

  trackByFn(index: number): number {
    return index;
  }

}
