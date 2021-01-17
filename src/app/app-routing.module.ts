import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MissionComponent} from './mission/mission.component';
import {GameComponent} from './game/game.component';
import {RulesComponent} from './rules/rules.component';
import {PacksComponent} from './packs/packs.component';

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
    path: 'cycle/:cId/scenario/:mId/game',
    component: GameComponent
  },
  {
    path: 'packs',
    component: PacksComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
