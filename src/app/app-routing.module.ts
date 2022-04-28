import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { PlayerRankingsComponent } from './player-rankings/player-rankings.component';

const routes: Routes = [
  { path: '', redirectTo: '/rankings', pathMatch: 'full' },
  { path: 'rankings', component: PlayerRankingsComponent },
  { path: 'matches', component: MatchesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
