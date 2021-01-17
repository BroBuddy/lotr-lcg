import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ngx-drag-drop';
import {ToastrModule} from 'ngx-toastr';
import {LazyLoadImageModule} from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import {MissionComponent} from './mission/mission.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {CardComponent} from './card/card.component';
import {GlossaryComponent} from './glossary/glossary.component';
import {ImageZoomComponent} from './image-zoom/image-zoom.component';
import {GameComponent} from './game/game.component';
import {PacksComponent} from './packs/packs.component';
import {CardsComponent} from './cards/cards.component';
import {KeywordsComponent} from './keywords/keywords.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PacksComponent,
    GameComponent,
    MissionComponent,
    GlossaryComponent,
    CardComponent,
    CardsComponent,
    KeywordsComponent,
    CounterComponent,
    ImageZoomComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
