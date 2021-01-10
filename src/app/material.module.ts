import { NgModule } from '@angular/core';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatToolbarModule} from '@angular/material';

const modules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
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
