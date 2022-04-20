import { ListRange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Match } from '../Model/match';
import { PlayerList } from '../Model/playerList';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {

  playerNames: Array<PlayerList> = [];
  player!: PlayerList;
  matchRecord: Match | undefined;
  player1_id: number = 0;
  player2_id: number = 0;
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.matchRecord = new Match;

    var data = this.playerService.loadData()

    this.playerService.loadData().forEach(data => {
      for(let i = 0; i < data.length; i++){
        this.player = new PlayerList();
        this.player.playerid = data[i].id;
        this.player.playername = data[i].name;
        this.playerNames.push(this.player);
      }
      
    });
  }

}
