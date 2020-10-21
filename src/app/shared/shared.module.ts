import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IconModule } from './icon.module';

const ANGULAR_MODULES: any[] = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

const MATERIAL_MODULES: any[] = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES, IconModule],
  exports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES, IconModule],
})
export class SharedModule {}
