import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StringToDatePipe } from './pipes/string-to-date.pipe';

export const PIPES = [
  StringToDatePipe
];

@NgModule({
  declarations: [
    PIPES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PIPES
  ]
})
export class SharedModule { }
