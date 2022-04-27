import { ListRange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Match } from '../Model/match';
import { Player } from '../Model/player';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlayerList } from '../Model/playerList';
import { PlayerService } from '../Services/player.service';
import { MatchService } from '../Services/match.service';
import { MatchEnding } from '../Model/matchEnding';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


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
  ballsLeft: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"]

  matchEndingList = Object.values(MatchEnding).filter(key => isNaN(+key)); //strips off the numbers from the enum list
  matchRecord: Match = new Match;
  player1: PlayerList = new PlayerList;
  player2: PlayerList = new PlayerList;
  winner: PlayerList = new PlayerList;
  balls!: number;
  matchEnding!: string;

  matchForm: any;

  constructor(private playerService: PlayerService, private matchService: MatchService, private formBuilder: FormBuilder, private dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {
    this.matchRecord = new Match();
    this.initialiseForm();

    this.playerService.getPlayers().forEach(data => {
      for(let i = 0; i < data.length; i++){
        this.player = new PlayerList();
        this.player.playerId = data[i].id;
        this.player.playerName = data[i].name;
        this.playerNames1.push(this.player);
      }      
    });    
  }

  /** sets the second player name list and removes the first players name */
  setPlayer1(player: PlayerList): void{
    console.log(this.matchForm.value.player1_control)
    if(this.players.length != 0){
      this.players.pop();
      this.players.pop();
    }
    
    this.playerNames2  = Object.assign([], this.playerNames1); //clones the player names 1 array
    
    const indexOfObject = this.playerNames2.findIndex((object) => {
       return object.playerId === this.matchForm.value.player1_control.playerId;           
    });

    if (indexOfObject !== -1) {
      this.playerNames2.splice(indexOfObject, 1);
    }
    this.setPlayer2();    
  }

  /** adds the players to the winner selection array */
  setPlayer2():void{
    this.players[0] = Object.assign({}, this.matchForm.value.player1_control);
    this.players[1] = Object.assign({}, this.matchForm.value.player2_control);
  }

  initialiseForm(): void {
    this.matchForm = this.formBuilder.group({
      player1_control: new FormControl('', [Validators.required]),
      player2_control: new FormControl('', [Validators.required]),
      winner_control: new FormControl('', [Validators.required]),
      balls_control: new FormControl('', [Validators.required]),
      matchEnd_control: new FormControl('', [])
    });
  }
  
  save(){
    this.copyData();  
    this.matchService.addMatch(this.matchRecord);    
    this.dialogRef.close();
  }

  /** A method to copy form data to the match record object */
  copyData(){
    this.matchRecord.player1_id = this.matchForm.value.player1_control.playerId as number;
    this.matchRecord.player2_id = this.matchForm.value.player2_control.playerId as number;
    this.matchRecord.winner_id = this.matchForm.value.winner_control.playerId as number;
    this.matchRecord.balls_left = this.matchForm.value.balls_control as number;
    this.matchRecord.matchEnding = this.matchForm.value.matchEnd_control as string;
  }

}
