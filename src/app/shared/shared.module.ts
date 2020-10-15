import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const ANGULAR_MODULES: any[] = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ANGULAR_MODULES],
  exports: [CommonModule, ...ANGULAR_MODULES],
})
export class SharedModule {}
