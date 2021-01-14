import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Speech from 'speak-tts';

import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import Missions from '../missions.json';
import {ImageZoomService} from "../image-zoom/image-zoom.service";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit, OnDestroy {
  public cId: number;
  public mId: number;
  public title: string;
  public difficult: number;
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
  public progress = 0;
  public speech: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, public zoomService: ImageZoomService) {}

  ngOnInit(): void {
    // this.onShuffleEncounter();
    this.initSpeech();

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
          this.difficult = data.missions[index].difficult;
          this.questDeck = data.missions[index].questDeck;
          this.activeLocation = data.missions[index].activeLocation;
          this.stagingArea = data.missions[index].stagingArea;
          this.encounterDeck = data.missions[index].encounterDeck;
          this.discardPile = data.missions[index].discardPile;
        }
      });
  }

  initSpeech(): void {
    this.speech = new Speech();

    if (this.speech.hasBrowserSupport()) {
      this.speech.init({
        volume: 1,
        lang: 'en-GB',
        rate: 1,
        pitch: 1,
        voice: 'Daniel',
        splitSentences: false
      });
    }
  }

  onStartReading(): void {
    this.speech.speak({
      text: this.text
    });
  }

  onPauseReading(): void {
    this.speech.pause();
  }

  fetchMission(): Observable<any> {
    return of(Missions);
  }

  onShuffleEncounter(): void {
    if (this.speech) {
      this.speech.cancel();
    }

    if (this.encounterDeck) {
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
  }

  onDrawCard(): void {
    this.stagingArea.unshift(this.encounterDeck[0]);
    this.encounterDeck.shift();
    this.cardsPlayed++;
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

  removeCardFromStaging(card: any): void {
    const stagingArea = [...this.stagingArea],
        index = stagingArea.findIndex((item) => item === card);

    this.stagingArea = stagingArea.slice(0, Number(index)).concat(stagingArea.slice(Number(index) + 1));
  }

  onUpdateLocation(card: any): void {
    this.zoomService.mouseout();

    if (this.activeLocation === card) {
      this.discardPile.push(this.activeLocation);
      this.activeLocation = null;
    } else {
      if (this.activeLocation) {
        this.toastr.error('Active location still occupied');
      } else {
        setTimeout(() => {
          this.removeCardFromStaging(card);
          this.activeLocation = card;
        }, 100);
      }
    }
  }

  onDrawShadow(): void {
    if (this.engagingArea.length) {
      this.shadowCard = this.encounterDeck[0];
      this.encounterDeck.shift();
      this.cardsPlayed++;
    } else {
      this.toastr.error('No enemy engaged');
    }
  }

  onDiscardShadow(): void {
    this.zoomService.mouseout();

    this.discardPile.push(this.shadowCard);
    this.shadowCard = null;
  }

  onDefeatEnemy(card: any): void {
    this.zoomService.mouseout();

    const engagingArea = [...this.engagingArea],
      index = engagingArea.findIndex((item) => item === card);

    this.engagingArea = engagingArea.slice(0, Number(index)).concat(engagingArea.slice(Number(index) + 1));

    this.discardPile.push(card);
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
      this.stagingArea.unshift(card);
      this.toastr.info('Card was played');
    }

    this.cardsPlayed++;

    const discardPile = [...this.discardPile],
      index = discardPile.findIndex((item) => item === card);

    this.discardPile = discardPile.slice(0, Number(index)).concat(discardPile.slice(Number(index) + 1));
  }

  onChooseCard(card: any, index: number): void {
    this.stagingArea.unshift(card);

    this.encounterDeck = this.encounterDeck.slice(0, Number(index)).concat(this.encounterDeck.slice(Number(index) + 1));

    this.toastr.info('Card was played');
  }

  onPreviewCard(card: any): void {
    this.previewCard = null;

    setTimeout(() => {
      this.previewCard = card;
    }, 0);
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.speech) {
      this.speech.cancel();
    }
  }
}
