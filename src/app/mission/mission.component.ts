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
  public id: number;
  public text: string;
  public shuffled = false;
  public cardsPlayed = 0;
  public questDeck = [];
  public questStep = 0;
  public engagingArea = [];
  public stagingArea = [];
  public encounterDeck = [];
  public discardPile = [];
  public activeLocation = null;
  public shadowCard = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
        }
      );

    this.fetchMission()
      .pipe(map(data => data[this.id - 1]))
      .subscribe(data => {
        if (data) {
          this.text = data.text;
          this.questDeck = data.questDeck;
          this.activeLocation = data.activeLocation;
          this.stagingArea = data.stagingArea;
          this.encounterDeck = data.encounterDeck;
          this.discardPile = data.discardPile;
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

  onChangeQuest(): void {
    if (this.questStep < (this.questDeck.length - 1)) {
      this.questStep++;
    } else {
      this.questStep = 0;
    }
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
}
