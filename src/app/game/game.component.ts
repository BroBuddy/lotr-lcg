import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { SubSink } from 'subsink';

import {Observable} from 'rxjs';

import {KEY_CODE} from './game-keys.enum';
import {DataService} from '../data/data.service';
import {ImageZoomService} from '../image-zoom/image-zoom.service';
import {GlossaryModalComponent} from '../glossary-modal/glossary-modal.component';
import {CardsModalComponent} from '../cards-modal/cards-modal.component';
import {HistoryModalComponent} from '../history-modal/history-modal.component';
import {ThreatTrackerService} from '../threat-tracker/threat-tracker.service';

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
  public cycle: string;
  public scenario: string;
  public encounterDeck$: Observable<any[]>;
  public stagingArea$: Observable<any[]>;
  public activeLocation$: Observable<any>;
  public shadowCard$: Observable<any>;
  public engagingArea$: Observable<any[]>;
  public discardPile$: Observable<any[]>;
  public questDeck$: Observable<any[]>;
  public questStep = 0;
  public progress = 0;
  private subs = new SubSink();


  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    this.initKeys(e);
  }

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private dataService: DataService,
              private threatTrackerService: ThreatTrackerService,
              public zoomService: ImageZoomService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cycle = params.cycle;
          this.scenario = params.scenario;
          this.dataService.setScenario(this.cycle, this.scenario, true);
          this.encounterDeck$ = this.dataService.encounterDeck$;
          this.stagingArea$ = this.dataService.stagingArea$;
          this.activeLocation$ = this.dataService.activeLocation$;
          this.shadowCard$ = this.dataService.shadowCard$;
          this.engagingArea$ = this.dataService.engagingArea$;
          this.discardPile$ = this.dataService.discardPile$;
          this.questDeck$ = this.dataService.questDeck$;
        }
      );
  }

  initKeys(e: any): void {
    const allowedKeys = ['body'];

    if (allowedKeys.indexOf(e.target.nodeName.toLowerCase()) !== -1) {
      switch (e.keyCode) {
        case KEY_CODE.ENTER:
          this.onDrawCard();
          break;

        case KEY_CODE.PLUS:
        case KEY_CODE.PLUS_2:
          this.threatTrackerService.increaseThreat();
          break;

        case KEY_CODE.MINUS:
        case KEY_CODE.MINUS_2:
          this.threatTrackerService.decreaseThreat();
          break;
      }
    }
  }

  openGlossaryModal(): void {
    const dialogRef = this.dialog.open(GlossaryModalComponent);
    dialogRef.afterClosed();
  }

  openCardsModal(): void {
    const dialogRef = this.dialog.open(CardsModalComponent);
    dialogRef.afterClosed();
  }

  openHistoryModal(): void {
    const dialogRef = this.dialog.open(HistoryModalComponent);
    dialogRef.afterClosed();
  }

  onDrawCard(): void {
    this.dataService.onDrawCard();
  }

  onCardActivation(card: any): void {
    this.dataService.onCardActivation(card);
  }

  onCardDeactivation(card: any, type: string): void {
    this.dataService.onCardDeactivation(card, type);
  }

  onTravelToLocation(card: any, discovered?: boolean): void {
    this.dataService.onTravelToLocation(card, discovered);
  }

  onDrawShadow(): void {
    this.dataService.onDrawShadow();
  }

  onDiscardShadow(): void {
    this.dataService.onDiscardShadow();
  }

  onEnemyDefeated(card: any, defeated: boolean): void {
    this.dataService.onEnemyDefeated(card, defeated);
  }

  onChangeQuest(step: number): void {
    this.progress = 0;

    this.questStep = step;
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
