import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

const modules = [
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
