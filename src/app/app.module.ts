import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ngx-drag-drop';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {LazyLoadImageModule} from 'ng-lazyload-image';

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
import {ImageZoomComponent} from './image-zoom/image-zoom.component';

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
    ImageZoomComponent,
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
