import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Speech from 'speak-tts';
import {SubSink} from "subsink";

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';
import {ImageZoomService} from "../image-zoom/image-zoom.service";

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html'
})
export class ScenarioComponent implements OnInit, OnDestroy {
  public cycle: string;
  public scenario: string;
  public text: string;
  public scenario$: Observable<any>;
  private subs = new SubSink();
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
              private dataService: DataService,
              public zoomService: ImageZoomService) {}

  ngOnInit(): void {
    this.initSpeech();

    this.route.params
        .subscribe(
            (params: Params) => {
              this.cycle = params.cycle;
              this.scenario = params.scenario;
              this.dataService.setScenario(this.cycle, this.scenario, false);
              this.scenario$ = this.dataService.scenario$;
              this.subs.sink = this.dataService.scenario$.subscribe(data => this.text = data.text);
            }
        );
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
    this.subs.unsubscribe();

    if (this.speech) {
      this.speech.cancel();
    }
  }
}
