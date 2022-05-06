import { Component, OnInit } from '@angular/core';
import { Player } from '../Model/player';
import { LeaderboardService } from '../Services/leaderboard.service';

@Component({
  selector: 'app-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrls: ['./player-rankings.component.less']
})
export class PlayerRankingsComponent implements OnInit {

    players: Player[] = [];
    sortedPlayers: Player[] = [];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  /** return the array of player information */
  getPlayers(): void {
    this.leaderboardService.getLeaderBoard()
    .subscribe(players => {
      this.players = players;
      this.sortedPlayers= this.players.sort((a, b) => (a.position > b.position) ? 1 : -1);
    });   

    
  }

}
