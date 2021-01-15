import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MissionComponent} from './mission/mission.component';
import {RulesComponent} from './rules/rules.component';
import {GameComponent} from "./game/game.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'cycle/:cId/scenario/:sId',
    component: MissionComponent
  },
  {
    path: 'cycle/:cId/scenario/:mId/game',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
