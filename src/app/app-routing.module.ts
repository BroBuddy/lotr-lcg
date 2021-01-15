import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MissionComponent} from './mission/mission.component';
import {RulesComponent} from './rules/rules.component';
import {QuestComponent} from './quest/quest.component';

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
    path: 'mission/:cId/:mId',
    component: MissionComponent
  },
  {
    path: 'mission/:cId/:mId/quest',
    component: QuestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
