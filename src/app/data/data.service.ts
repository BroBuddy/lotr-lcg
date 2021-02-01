import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {BehaviorSubject, of} from 'rxjs';

import {ImageZoomService} from '../image-zoom/image-zoom.service';
import ShadowsOfMirkwood from './json/shadows-of-mirkwood.json';
import Dwarrowdelf from './json/dwarrowdelf.json';
import AgainstTheShadow from './json/against-the-shadow.json';
import TheRingMaker from './json/the-ring-maker.json';
import AngmarAwakened from './json/angmar-awakened.json';
import LordOfTheRings from './json/lord-of-the-rings.json';

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

  private campaign = new BehaviorSubject<any>(null);
  readonly campaign$ = this.campaign.asObservable();

  private campaignDeck = new BehaviorSubject<any[]>([]);
  readonly campaignDeck$ = this.campaignDeck.asObservable();

  private history = new BehaviorSubject<any[]>([]);
  readonly history$ = this.history.asObservable();

  constructor(private toastr: ToastrService,
              private zoomService: ImageZoomService) {
    this.fetchData();
  }

  fetchData(): void {
    this.cycles.next(of(ShadowsOfMirkwood.concat(Dwarrowdelf).concat(AgainstTheShadow).concat(TheRingMaker).concat(AngmarAwakened)));
    this.campaign.next(of(LordOfTheRings));
  }

  setScenario(cycle: string, scenario: string, shuffle?: boolean): void {
    let scenarioData;

    switch (cycle) {
      case 'shadows-of-mirkwood':
        scenarioData = ShadowsOfMirkwood;
        break;
      case 'dwarrowdelf':
        scenarioData = Dwarrowdelf;
        break;
      case 'against-the-shadow':
        scenarioData = AgainstTheShadow;
        break;
      case 'the-ring-maker':
        scenarioData = TheRingMaker;
        break;
      case 'angmar-awakened':
        scenarioData = AngmarAwakened;
        break;
      case 'lord-of-the-rings':
        scenarioData = LordOfTheRings;
        break;
    }

    let scenarioItem = scenarioData[0].scenarios.filter(data => data.name === scenario);
    scenarioItem = scenarioItem[0];

    scenarioItem.encounterDeck.map(item => {
      item.progress = 0;
      return item;
    });

    scenarioItem.discardPile.map(item => {
      item.progress = 0;
      return item;
    });

    scenarioItem.stagingArea.map(item => {
      item.progress = 0;
      return item;
    });

    if (scenarioItem.activeLocation) {
      scenarioItem.activeLocation.progress = 0;
    }

    this.scenario.next(scenarioItem);
    this.encounterDeck.next(scenarioItem.encounterDeck);
    this.activeLocation.next(scenarioItem.activeLocation);
    this.stagingArea.next(scenarioItem.stagingArea);
    this.discardPile.next(scenarioItem.discardPile);
    this.campaignDeck.next(scenarioItem.campaignDeck);
    this.questDeck.next(scenarioItem.questDeck);
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
    this.addHistory(this.getCardTypeName(this.encounterDeck.getValue()[0]) + ' was drawn');
    this.encounterDeck.getValue().shift();
  }

  onCardProgress(area: string, card: any, progress: number): void {
    switch (area) {
      case 'engaging': {
        const engagingArea = this.engagingArea.getValue();
        const index = engagingArea.findIndex((item) => item === card);
        engagingArea[index].progress = progress;
        this.engagingArea.next(engagingArea);
        break;
      }
      case 'staging': {
        const stagingArea = this.stagingArea.getValue();
        const index = stagingArea.findIndex((item) => item === card);
        stagingArea[index].progress = progress;
        this.stagingArea.next(stagingArea);
        break;
      }
      default: {
        break;
      }
    }
  }

  onCardActivation(card: any): void {
    this.zoomService.mouseout();

    switch (card.type) {
      case 'enemy': {
        this.engagingArea.getValue().push(card);
        this.removeCardFromStaging(card);
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

    console.log(this.stagingArea.getValue());
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
    const stagingArea = [...this.stagingArea.getValue()];
    stagingArea.splice(stagingArea.findIndex((item) => item === card), 1);

    this.stagingArea.next(stagingArea);
    this.addHistory(this.getCardTypeName(card) + ' was removed from staging area');
  }

  removeCardFromEngaging(card: any): void {
    const engagingArea = [...this.engagingArea.getValue()];
    engagingArea.splice(engagingArea.findIndex((item) => item === card), 1);

    this.engagingArea.next(engagingArea);
    this.addHistory(this.getCardTypeName(card) + ' was removed from engaging area');
  }

  onUpdateLocation(card: any, discovered?: boolean): void {
    this.zoomService.mouseout();

    if (discovered) {
      this.discardPile.getValue().push(this.activeLocation.getValue());
      this.activeLocation.next(null);
    } else {
      this.removeCardFromStaging(card);

      if (this.activeLocation.getValue()) {
        this.discardPile.getValue().push(this.activeLocation.getValue());
      }

      setTimeout(() => {
        this.activeLocation.next(card);
      }, 100);
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
