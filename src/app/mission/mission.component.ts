import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import Missions from '../missions.json';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  public cId: number;
  public mId: number;
  public title: string;
  public text: string;
  public shuffled = false;
  public cardsPlayed = 0;
  public questDeck: any[] = [];
  public questStep = 0;
  public engagingArea: any[] = [];
  public stagingArea: any[] = [];
  public encounterDeck: any[] = [];
  public discardPile: any[] = [];
  public activeLocation = null;
  public shadowCard = null;
  public previewCard = null;

  constructor(private route: ActivatedRoute) {}

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
          this.text = data.missions[index].text;
          this.title = data.missions[index].title;
          this.questDeck = data.missions[index].questDeck;
          this.activeLocation = data.missions[index].activeLocation;
          this.stagingArea = data.missions[index].stagingArea;
          this.encounterDeck = data.missions[index].encounterDeck;
          this.discardPile = data.missions[index].discardPile;
          this.previewCard = this.encounterDeck[0];
        }
      });
  }

  fetchMission(): Observable<any> {
    return of(Missions);
  }

  onShuffleEncounter(): void {
    let shuffleTime = 0;

    do {
      for (let i = this.encounterDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.encounterDeck[i], this.encounterDeck[j]] = [this.encounterDeck[j], this.encounterDeck[i]];
      }

      shuffleTime++;
    }
    while (shuffleTime >= 3);

    this.shuffled = true;
  }

  onDrawCard(): void {
    this.stagingArea.unshift(this.encounterDeck[0]);
    this.encounterDeck.shift();
    this.cardsPlayed++;
  }

  onCardActivation(i: number, card: any): void {
    switch (card.type) {
      case 'treachery':
      case 'objective': {
        this.discardPile.push(card);
        break;
      }
      case 'location': {
        this.onUpdateLocation(card);
        break;
      }
      default: {
        this.engagingArea.unshift(card);
        break;
      }
    }

    const stagingArea = [...this.stagingArea],
      index = stagingArea.findIndex((item) => item === card);

    this.stagingArea = stagingArea.slice(0, Number(index)).concat(stagingArea.slice(Number(index) + 1));
  }

  onUpdateLocation(card?: any): void {
    if (this.activeLocation) {
      this.discardPile.push(this.activeLocation);
      this.activeLocation = null;
    }

    if (card) {
      setTimeout(() => {
        this.activeLocation = card;
      }, 100);
    }
  }

  onDrawShadow(): void {
    this.shadowCard = this.encounterDeck[0];
    this.encounterDeck.shift();
    this.cardsPlayed++;
  }

  onDiscardShadow(): void {
    this.discardPile.push(this.shadowCard);
    this.shadowCard = null;
  }

  onDefeatEnemy(card: any): void {
    const engagingArea = [...this.engagingArea],
      index = engagingArea.findIndex((item) => item === card);

    this.engagingArea = engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1));

    this.discardPile.push(card);
  }

  onChangeQuest(step: number): void {
    this.questStep = step;
  }

  onResetCard(type: string, card: any): void {
    if (type === 'encounter') {
      this.encounterDeck.push(card);
      this.onShuffleEncounter();
    } else {
      this.stagingArea.unshift(card);
    }
    this.cardsPlayed++;

    const discardPile = [...this.discardPile],
      index = discardPile.findIndex((item) => item === card);

    this.discardPile = discardPile.slice(0, Number(index)).concat(discardPile.slice(Number(index) + 1));
  }

  onPreviewCard(card: any): void {
    this.previewCard = card;
  }

  trackByFn(index: number): number {
    return index;
  }
}
