import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerRankingsComponent } from './player-rankings/player-rankings.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    PlayerRankingsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule, 
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
