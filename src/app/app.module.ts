import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ngx-drag-drop';
import {ToastrModule} from 'ngx-toastr';
import {LazyLoadImageModule} from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataService} from './data/data.service';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {CardComponent} from './card/card.component';
import {GlossaryComponent} from './glossary/glossary.component';
import {ImageZoomComponent} from './image-zoom/image-zoom.component';
import {GameComponent} from './game/game.component';
import {PacksComponent} from './packs/packs.component';
import {CardsComponent} from './cards/cards.component';
import {KeywordsComponent} from './keywords/keywords.component';
import {GlossaryModalComponent} from './glossary-modal/glossary-modal.component';
import {CardsModalComponent} from './cards-modal/cards-modal.component';
import {HistoryModalComponent} from './history-modal/history-modal.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {ThreatTrackerComponent} from './threat-tracker/threat-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PacksComponent,
    GameComponent,
    GlossaryComponent,
    CardComponent,
    CardsComponent,
    KeywordsComponent,
    CounterComponent,
    ImageZoomComponent,
    CardsModalComponent,
    GlossaryModalComponent,
    HistoryModalComponent,
    ScenarioComponent,
    ThreatTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      easing: 'ease-in',
      easeTime: 500,
      progressBar: false,
      closeButton: false,
      newestOnTop: true,
      preventDuplicates: true,
    }),
    DndModule
  ],
  entryComponents: [GlossaryModalComponent, CardsModalComponent, HistoryModalComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
