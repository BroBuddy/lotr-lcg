import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { SubSink } from 'subsink';

import {Observable} from 'rxjs';

import {DataService} from '../data/data.service';
import {ImageZoomService} from '../image-zoom/image-zoom.service';
import {GlossaryModalComponent} from '../glossary-modal/glossary-modal.component';
import {CardsModalComponent} from '../cards-modal/cards-modal.component';
import {HistoryModalComponent} from '../history-modal/history-modal.component';

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

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private dataService: DataService,
              public zoomService: ImageZoomService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cId = params.cId;
          this.sId = params.sId;
          this.dataService.setScenario(this.cId, this.sId, true);
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

  onUpdateLocation(card: any, discovered?: boolean): void {
    this.dataService.onUpdateLocation(card, discovered);
  }

  onDrawShadow(): void {
    this.dataService.onDrawShadow();
  }

  onDiscardShadow(): void {
    this.dataService.onDiscardShadow();
  }

  onDefeatEnemy(card: any, defeated: boolean): void {
    this.dataService.onDefeatEnemy(card, defeated);
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
