import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AngularFirestore,} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { DndModule } from 'ngx-drag-drop';

import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import {MissionComponent} from './mission/mission.component';
import {HomeComponent} from './home/home.component';
import {RulesComponent} from './rules/rules.component';
import {CounterComponent} from './counter/counter.component';
import {CardComponent} from './card/card.component';
import {GlossaryComponent} from './glossary/glossary.component';
import {FirebaseImageDirective} from './directive/firebase-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RulesComponent,
    MissionComponent,
    GlossaryComponent,
    CardComponent,
    CounterComponent,
    FirebaseImageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    DndModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
