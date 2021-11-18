import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {PacksComponent} from './packs/packs.component';
import {CardsComponent} from './cards/cards.component';
import {KeywordsComponent} from './keywords/keywords.component';
import {ScenarioComponent} from './scenario/scenario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':cycle/:scenario',
    component: ScenarioComponent
  },
  {
    path: ':cycle/:scenario/game',
    component: GameComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'packs',
    component: PacksComponent
  },
  {
    path: 'keywords',
    component: KeywordsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
