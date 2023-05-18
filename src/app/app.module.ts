import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { DigitalClockComponent } from './clock/digital-clock/digital-clock.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const materialModules = [MatSelectModule, MatSlideToggleModule]

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    DigitalClockComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
