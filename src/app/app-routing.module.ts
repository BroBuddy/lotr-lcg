import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MissionComponent} from './mission/mission.component';
import {GameComponent} from './game/game.component';
import {PacksComponent} from './packs/packs.component';
import {CardsComponent} from './cards/cards.component';
import {KeywordsComponent} from './keywords/keywords.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cycle/:cId/scenario/:sId',
    component: MissionComponent
  },
  {
    path: 'cycle/:cId/scenario/:sId/game',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
