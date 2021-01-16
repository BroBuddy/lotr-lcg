import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ToastrService} from "ngx-toastr";

import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

import {ImageZoomService} from "../image-zoom/image-zoom.service";
import Missions from "../mission/mission-data.json";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [`.inactive-quest {
    filter: grayscale(100%);
  }`]
})
export class GameComponent implements OnInit {
  public cId: number;
  public mId: number;

  public encounterDeck: any[] = [];
  public stagingArea: any[] = [];
  public activeLocation = null;

  public shadowCard = null;
  public engagingArea: any[] = [];
  public questDeck: any[] = [];
  public questStep = 0;

  public discardPile: any[] = [];
  public progress = 0;

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              public zoomService: ImageZoomService) { }

  ngOnInit(): void {
    this.route.params
        .subscribe(
            (params: Params) => {
              this.cId = params.cId;
              this.mId = params.mId;
            }
        );

    this.fetchMission()
        .pipe(map(data => data[(this.cId - 1)]))
        .subscribe(data => {
          const index = data.missions.findIndex((item) => item.id === Number(this.mId));

          if (data.missions[index]) {
            this.stagingArea = data.missions[index].stagingArea;
            this.encounterDeck = data.missions[index].encounterDeck;
            this.discardPile = data.missions[index].discardPile;
            this.activeLocation = data.missions[index].activeLocation;
            this.questDeck = data.missions[index].questDeck;
            this.onShuffleEncounter();
          }
        });
  }

  fetchMission(): Observable<any> {
    return of(Missions);
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
        this.discardPile.push(card);
        this.removeCardFromStaging(card);
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
      this.toastr.info('Deck was shuffled');
    } else {
      this.stagingArea.push(card);
    }

    const discardPile = [...this.discardPile],
        index = discardPile.findIndex((item) => item === card);

    this.discardPile = discardPile.slice(0, Number(index)).concat(discardPile.slice(Number(index) + 1));
  }

  onChooseCard(card: any, index: number): void {
    this.stagingArea.push(card);

    this.encounterDeck = this.encounterDeck.slice(0, Number(index)).concat(this.encounterDeck.slice(Number(index) + 1));
  }

  trackByFn(index: number): number {
    return index;
  }

}
