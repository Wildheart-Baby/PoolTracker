import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerRankingsComponent } from './player-rankings/player-rankings.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AddMatchComponent } from './add-match/add-match.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MatchesComponent } from './matches/matches.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddPlayerComponent } from './add-player/add-player.component';
import { MenubarModule } from 'primeng/menubar';
import { ArchivePlayerComponent } from './archive-player/archive-player.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerRankingsComponent,
    AddMatchComponent,
    MatchesComponent,
    AddPlayerComponent,
    ArchivePlayerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TableModule, 
    CardModule,
    DropdownModule, 
    ButtonModule,
    DynamicDialogModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
