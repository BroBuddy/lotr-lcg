import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { SubSink } from 'subsink';

import {ImageZoomService} from '../image-zoom/image-zoom.service';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [`.inactive-quest {
    filter: grayscale(100%);
    opacity: 0.75;
    transform: scale(0.85);
  }`]
})
export class GameComponent implements OnInit, OnDestroy {
  public cId: number;
  public sId: number;
  public encounterDeck: any[] = [];
  public stagingArea: any[] = [];
  public activeLocation = null;
  public shadowCard = null;
  public engagingArea: any[] = [];
  public questDeck: any[] = [];
  public questStep = 0;
  public discardPile: any[] = [];
  public progress = 0;
  private subs = new SubSink();

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private dataService: DataService,
              public zoomService: ImageZoomService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cId = params.cId;
          this.sId = params.sId;
          this.dataService.setScenario(this.cId, this.sId);
          this.subs.sink = this.dataService.scenario$.subscribe(data => {
            this.stagingArea = data.stagingArea;
            this.encounterDeck = data.encounterDeck;
            this.discardPile = data.discardPile;
            this.activeLocation = data.activeLocation;
            this.questDeck = data.questDeck;
            this.onShuffleEncounter();
          });
        }
      );
  }

  onShuffleEncounter(): void {
    if (this.encounterDeck) {
      let shuffleTime = 0;

      do {
        for (let i = this.encounterDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.encounterDeck[i], this.encounterDeck[j]] = [this.encounterDeck[j], this.encounterDeck[i]];
        }

        shuffleTime++;
      }
      while (shuffleTime < 3);

      this.toastr.info('Deck was shuffled');
    }
  }

  onDrawCard(): void {
    this.stagingArea.push(this.encounterDeck[0]);
    this.encounterDeck.shift();
  }

  onCardActivation(card: any): void {
    this.zoomService.mouseout();

    switch (card.type) {
      case 'treachery':
      case 'objective': {
        this.discardPile.push(card);
        this.removeCardFromStaging(card);
        break;
      }
      case 'location': {
        this.onUpdateLocation(card);
        break;
      }
      default: {
        this.engagingArea.push(card);
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
    this.encounterDeck.push(card);
    this.onShuffleEncounter();
  }

  removeCardFromStaging(card: any): void {
    const stagingArea = [...this.stagingArea],
        index = stagingArea.findIndex((item) => item === card);

    this.stagingArea = stagingArea.slice(0, Number(index)).concat(stagingArea.slice(Number(index) + 1));
  }

  removeCardFromEngaging(card: any): void {
    const engagingArea = [...this.engagingArea],
        index = engagingArea.findIndex((item) => item === card);

    this.engagingArea = engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1));
  }

  onUpdateLocation(card: any, discovered?: boolean): void {
    this.zoomService.mouseout();

    if (this.activeLocation === card) {
      if (discovered) {
        this.discardPile.push(this.activeLocation);
      }

      this.activeLocation = null;
    } else {
      if (this.activeLocation) {
        this.discardPile.push(this.activeLocation);
        this.removeCardFromStaging(card);
        this.activeLocation = card;
      } else {
        setTimeout(() => {
          this.removeCardFromStaging(card);
          this.activeLocation = card;
        }, 100);
      }
    }
  }

  onDrawShadow(): void {
    this.shadowCard = this.encounterDeck[0];
    this.encounterDeck.shift();
  }

  onDiscardShadow(): void {
    this.zoomService.mouseout();

    this.discardPile.push(this.shadowCard);
    this.shadowCard = null;
  }

  onDefeatEnemy(card: any, defeated: boolean): void {
    this.zoomService.mouseout();

    const engagingArea = [...this.engagingArea],
        index = engagingArea.findIndex((item) => item === card);

    this.engagingArea = engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1));

    if (defeated) {
      this.discardPile.push(card);
    }

    if (this.shadowCard) {
      this.shadowCard = null;
    }
  }

  onChangeQuest(step: number): void {
    this.progress = 0;

    if (step <= (this.questDeck.length - 1)) {
      this.questStep = step;
    }
  }

  onResetCard(type: string, card: any): void {
    if (type === 'encounter') {
      this.encounterDeck.push(card);
      this.onShuffleEncounter();
    } else {
      this.stagingArea.push(card);
    }

    const discardPile = [...this.discardPile],
        index = discardPile.findIndex((item) => item === card);

    this.discardPile = discardPile.slice(0, Number(index)).concat(discardPile.slice(Number(index) + 1));
    this.toastr.success('Card was played');
  }

  onChooseCard(card: any, index: number): void {
    this.stagingArea.push(card);
    this.encounterDeck = this.encounterDeck.slice(0, Number(index)).concat(this.encounterDeck.slice(Number(index) + 1));
    this.toastr.success('Card was played');
  }

  onResetDiscardPile(): void {
    this.encounterDeck = this.encounterDeck.concat(this.discardPile);
    this.onShuffleEncounter();
    this.discardPile = [];
  }

  onCreateEncounterDeck(): void {
    this.encounterDeck = this.discardPile;
    this.onShuffleEncounter();
    this.discardPile = [];
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
