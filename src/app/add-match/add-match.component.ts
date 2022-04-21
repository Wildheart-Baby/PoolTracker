import { ListRange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Match } from '../Model/match';
import { Player } from '../Model/player';
import { PlayerList } from '../Model/playerList';
import { PlayerService } from '../Services/player.service';
import { MatchEnding } from '../Model/matchEnding';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {

  playerNames1: PlayerList[] = [];
  playerNames2: PlayerList[] = [];
  players: PlayerList[] = [];
  player!: PlayerList;
  matchRecord: Match = new Match;
  player1: PlayerList = new PlayerList;
  player2: PlayerList = new PlayerList;
  ballsLeft: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"]
  matchEnding = Object.values(MatchEnding);
  
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.matchRecord = new Match();

    this.playerService.loadData().forEach(data => {
      for(let i = 0; i < data.length; i++){
        this.player = new PlayerList();
        this.player.playerId = data[i].id;
        this.player.playerName = data[i].name;
        this.playerNames1.push(this.player);
      }      
    });    
  }

  setPlayer1(player: PlayerList): void{
    this.playerNames2  = Object.assign([], this.playerNames1);
    
    const indexOfObject = this.playerNames2.findIndex((object) => {
       return object.playerId === player.playerId;           
    });

    if (indexOfObject !== -1) {
      this.playerNames2.splice(indexOfObject, 1);
    }
    this.setPlayer2();    
  }

  setPlayer2():void{
    this.players[0] = Object.assign({}, this.player1);
    this.players[1] = Object.assign({}, this.player2);
  }


}
