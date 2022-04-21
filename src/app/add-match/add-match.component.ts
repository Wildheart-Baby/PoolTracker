import { ListRange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Match } from '../Model/match';
import { Player } from '../Model/player';
import { PlayerList } from '../Model/playerList';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {

  playerNames1: PlayerList[] = [];
  playerNames2: PlayerList[] = [];
  player!: PlayerList;
  matchRecord: Match = new Match;
  player1: PlayerList = new PlayerList;
  player2: PlayerList = new PlayerList;
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

  setPlayer2(player: PlayerList): void{
    

    this.playerNames2  = Object.assign([], this.playerNames1);
    
    //this.playerNames2 = this.playerNames1;
    console.log("player 1 names: "+ this.playerNames1.length);
    const indexOfObject = this.playerNames2.findIndex((object) => {
       return object.playerId === player.playerId;
           
    });
    console.log("id:" + indexOfObject); 

    if (indexOfObject !== -1) {
      this.playerNames2.splice(indexOfObject, 1);
    }
    console.log("player 2 names: "+ this.playerNames2.length);
  }

}
