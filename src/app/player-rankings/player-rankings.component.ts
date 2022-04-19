import { Component, OnInit } from '@angular/core';
import { Player } from '../Model/player';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrls: ['./player-rankings.component.less']
})
export class PlayerRankingsComponent implements OnInit {

    players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  /** return the array of player information */
  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

}
