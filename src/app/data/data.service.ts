import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {BehaviorSubject, of} from 'rxjs';

import {ImageZoomService} from '../image-zoom/image-zoom.service';
import Cycle1 from './cycle-1-data.json';
import Cycle2 from './cycle-2-data.json';
import Cycle3 from './cycle-3-data.json';
import Cycle4 from './cycle-4-data.json';
import Cycle5 from './cycle-5-data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cycles = new BehaviorSubject<any>(null);
  readonly cycles$ = this.cycles.asObservable();

  private scenario = new BehaviorSubject<any>(null);
  readonly scenario$ = this.scenario.asObservable();

  private encounterDeck = new BehaviorSubject<any[]>([]);
  readonly encounterDeck$ = this.encounterDeck.asObservable();

  private stagingArea = new BehaviorSubject<any[]>([]);
  readonly stagingArea$ = this.stagingArea.asObservable();

  private activeLocation = new BehaviorSubject<any>(null);
  readonly activeLocation$ = this.activeLocation.asObservable();

  private shadowCard = new BehaviorSubject<any>(null);
  readonly shadowCard$ = this.shadowCard.asObservable();

  private engagingArea = new BehaviorSubject<any[]>([]);
  readonly engagingArea$ = this.engagingArea.asObservable();

  private discardPile = new BehaviorSubject<any[]>([]);
  readonly discardPile$ = this.discardPile.asObservable();

  private questDeck = new BehaviorSubject<any[]>([]);
  readonly questDeck$ = this.questDeck.asObservable();

  private history = new BehaviorSubject<any[]>([]);
  readonly history$ = this.history.asObservable();

  constructor(private toastr: ToastrService,
              private zoomService: ImageZoomService) {
    this.fetchData();
  }

  fetchData(): void {
    this.cycles.next(of(Cycle1.concat(Cycle2).concat(Cycle3).concat(Cycle4).concat(Cycle5)));
  }

  setScenario(cId: number, sId: number, shuffle?: boolean): void {
    let scenarioData;

    switch (Number(cId)) {
      case 1:
        scenarioData = Cycle1;
        break;
      case 2:
        scenarioData = Cycle2;
        break;
      case 3:
        scenarioData = Cycle3;
        break;
      case 4:
        scenarioData = Cycle4;
        break;
      case 5:
        scenarioData = Cycle5;
        break;
    }

    const scenario = scenarioData[0].scenarios.filter(data => data.id === Number(sId));

    this.scenario.next(scenario[0]);
    this.encounterDeck.next(scenario[0].encounterDeck);
    this.activeLocation.next(scenario[0].activeLocation);
    this.stagingArea.next(scenario[0].stagingArea);
    this.discardPile.next(scenario[0].discardPile);
    this.questDeck.next(scenario[0].questDeck);
    this.engagingArea.next([]);
    this.history.next([]);

    if (shuffle) {
      this.onShuffleEncounter();
    }
  }

  onShuffleEncounter(): void {
    const encounterDeck = this.encounterDeck.getValue();

    if (encounterDeck) {
      let shuffleTime = 0;

      do {
        for (let i = encounterDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [encounterDeck[i], encounterDeck[j]] = [encounterDeck[j], encounterDeck[i]];
        }

        shuffleTime++;
      }
      while (shuffleTime < 3);

      const message = 'Deck was shuffled';
      this.toastr.info(message);
      this.addHistory(message);
    }
  }

  addHistory(message: string): void {
    const content = {
      text: message,
      date: new Date()
    };

    this.history.getValue().unshift(content);
  }

  getCardTypeName(card: any): string {
    return card.type.charAt(0).toUpperCase() + card.type.slice(1);
  }

  onDrawCard(): void {
    this.stagingArea.getValue().push(this.encounterDeck.getValue()[0]);
    this.encounterDeck.getValue().shift();
    this.addHistory(this.getCardTypeName(this.encounterDeck.getValue()[0]) + ' was drawn');
  }

  onCardActivation(card: any): void {
    this.zoomService.mouseout();

    switch (card.type) {
      case 'enemy': {
        this.removeCardFromStaging(card);
        this.engagingArea.getValue().push(card);
        break;
      }
      case 'location': {
        this.onUpdateLocation(card);
        break;
      }
      default: {
        this.discardPile.getValue().push(card);
        this.removeCardFromStaging(card);
        break;
      }
    }
  }

  onCardDeactivation(card: any, type: string): void {
    switch (type) {
      case 'engaging': {
        this.removeCardFromEngaging(card);
        break;
      }
      case 'location': {
        this.onUpdateLocation(card, false);
        break;
      }
      default: {
        this.removeCardFromStaging(card);
        break;
      }
    }

    this.encounterDeck.getValue().push(card);
    this.onShuffleEncounter();
  }

  removeCardFromStaging(card: any): void {
    const stagingArea = [...this.stagingArea.getValue()],
        index = stagingArea.findIndex((item) => item === card);

    this.stagingArea.next(stagingArea.slice(0, Number(index)).concat(stagingArea.slice(Number(index) + 1)));
    this.addHistory(this.getCardTypeName(card) + ' was removed from staging area');
  }

  removeCardFromEngaging(card: any): void {
    const engagingArea = [...this.engagingArea.getValue()],
        index = engagingArea.findIndex((item) => item === card);

    this.engagingArea.next(engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1)));
    this.addHistory(this.getCardTypeName(card) + ' was removed from engaging area');
  }

  onUpdateLocation(card: any, discovered?: boolean): void {
    this.zoomService.mouseout();

    if (discovered) {
      this.discardPile.getValue().push(this.activeLocation.getValue());
      this.activeLocation.next(null);
    } else {
      if (this.activeLocation.getValue()) {
        this.discardPile.getValue().push(this.activeLocation.getValue());
        this.removeCardFromStaging(card);
        this.activeLocation.next(card);
      } else {
        setTimeout(() => {
          this.removeCardFromStaging(card);
          this.activeLocation.next(card);
        }, 0);
      }
    }

    this.addHistory(this.getCardTypeName(card) + ' was updated');
  }

  onDrawShadow(): void {
    this.shadowCard.next(this.encounterDeck.getValue()[0]);
    this.encounterDeck.getValue().shift();
    this.addHistory(this.getCardTypeName(this.encounterDeck.getValue()[0]) + ' was drawn');
  }

  onDiscardShadow(): void {
    this.zoomService.mouseout();

    this.discardPile.getValue().push(this.shadowCard.getValue());
    this.addHistory(this.getCardTypeName(this.shadowCard.getValue()) + ' was discarded');
    this.shadowCard.next(null);
  }

  onDefeatEnemy(card: any, defeated: boolean): void {
    this.zoomService.mouseout();

    const engagingArea = [...this.engagingArea.getValue()],
        index = engagingArea.findIndex((item) => item === card);

    this.engagingArea.next(engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1)));

    if (defeated) {
      this.discardPile.getValue().push(card);
    }

    if (this.shadowCard.getValue()) {
      this.shadowCard.next(null);
    }

    this.addHistory(this.getCardTypeName(card) + ' was defeated');
  }

  onResetCard(type: string, card: any): void {
    if (type === 'encounter') {
      this.encounterDeck.getValue().push(card);
      this.onShuffleEncounter();
    } else {
      this.stagingArea.getValue().push(card);
    }

    const discardPile = [...this.discardPile.getValue()],
        index = discardPile.findIndex((item) => item === card);

    this.discardPile.next(discardPile.slice(0, Number(index)).concat(discardPile.slice(Number(index) + 1)));

    this.toastr.success('Card was played');
    this.addHistory(this.getCardTypeName(card) + ' was played');
  }

  onChooseCard(card: any, index: number): void {
    this.stagingArea.getValue().push(card);
    const newEncounterDeck = this.encounterDeck.getValue().slice(0, Number(index)).concat(this.encounterDeck.getValue().slice(Number(index) + 1));
    this.encounterDeck.next(newEncounterDeck);

    this.toastr.success('Card was played');
    this.addHistory(this.getCardTypeName(card) + ' was played');
  }

  onCreateEncounterDeck(): void {
    this.encounterDeck.next(this.discardPile.getValue());
    this.onShuffleEncounter();
    this.discardPile.next([]);
    this.addHistory('Encounter deck was created');
  }

  onResetDiscardPile(): void {
    this.encounterDeck.next(this.encounterDeck.getValue().concat(this.discardPile.getValue()));
    this.onShuffleEncounter();
    this.discardPile.next([]);

    const message = 'Discard pile was reseted';
    this.toastr.success(message);
    this.addHistory(message);
  }
}
