import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Speech from 'speak-tts';

import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import Missions from './mission-data.json';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styles: [`p {
    line-height: 1.5em;
  }`]
})
export class MissionComponent implements OnInit, OnDestroy {
  public cId: number;
  public sId: number;

  public title: string;
  public difficult: number;
  public text: string;
  public previewCard = null;

  public stagingArea: any[] = [];
  public encounterDeck: any[] = [];
  public discardPile: any[] = [];
  public activeLocation = null;

  public speech: any;
  public speechConfig = {
    volume: 1,
    lang: 'en-GB',
    rate: 1,
    pitch: 1,
    voice: 'Daniel',
    splitSentences: false
  };

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.initSpeech();

    this.route.params
      .subscribe(
        (params: Params) => {
          this.cId = params.cId;
          this.sId = params.sId;
        }
      );

    this.fetchMission()
      .pipe(map(data => data[(this.cId - 1)]))
      .subscribe(data => {
        const index = data.missions.findIndex((item) => item.id === Number(this.sId));

        if (data.missions[index]) {
          this.text = data.missions[index].text;
          this.title = data.missions[index].title;
          this.difficult = data.missions[index].difficult;
          this.stagingArea = data.missions[index].stagingArea;
          this.encounterDeck = data.missions[index].encounterDeck;
          this.discardPile = data.missions[index].discardPile;
          this.activeLocation = data.missions[index].activeLocation;
        }
      });
  }

  fetchMission(): Observable<any> {
    return of(Missions);
  }

  initSpeech(): void {
    this.speech = new Speech();

    if (this.speech.hasBrowserSupport()) {
      this.speech.init(this.speechConfig);
    }
  }

  onStartReading(): void {
    this.speech.speak({ text: this.text });
  }

  onPauseReading(): void {
    this.speech.pause();
  }

  onStartQuest(): void {
    if (this.speech) {
      this.speech.cancel();
    }

    this.router.navigate(['game'], { relativeTo: this.route });
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
