import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Speech from 'speak-tts';

import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import Missions from './mission-data.json';
import {ImageZoomService} from '../image-zoom/image-zoom.service';

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
  public questDeck: any[] = [];
  public encounterDeck: any[] = [];

  public speech: any;
  public speechSupport: boolean;
  public speechConfig = {
    volume: 1,
    lang: 'en-GB',
    rate: 1,
    pitch: 1,
    voice: 'Daniel',
    splitSentences: false
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public zoomService: ImageZoomService) {}

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
          const mission = data.missions[index];
          this.text =  mission.text;
          this.title =  mission.title;
          this.difficult =  mission.difficult;
          this.questDeck =  mission.questDeck;
          this.encounterDeck = (mission.stagingArea).concat(mission.encounterDeck).concat(mission.discardPile);
        }
      });
  }

  fetchMission(): Observable<any> {
    return of(Missions);
  }

  initSpeech(): void {
    this.speech = new Speech();

    if (this.speech.hasBrowserSupport()) {
      this.speechSupport = true;
      this.speech.init(this.speechConfig);
    } else {
      this.speechSupport = false;
      this.toastr.error('Browser has not speech support');
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

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.speech) {
      this.speech.cancel();
    }
  }
}
