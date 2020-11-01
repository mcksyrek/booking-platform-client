import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';

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
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRippleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES, IconModule],
  exports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES, IconModule],
})
export class SharedModule {}
