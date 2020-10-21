import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

const ANGULAR_MODULES: any[] = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

const MATERIAL_MODULES: any[] = [MatCardModule, MatToolbarModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES],
  exports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES],
})
export class SharedModule {}
