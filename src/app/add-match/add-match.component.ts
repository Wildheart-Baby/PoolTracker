import { Component, OnInit } from '@angular/core';
import { Player } from '../Model/player';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlayerService } from '../Services/player.service';
import { MatchService } from '../Services/match.service';
import { MatchEnding } from '../Model/matchEnding';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BallsLeft } from '../Model/ballsleft';


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {
  players: Player[] = [];
  player2Options: Player[] = [];
  winnerOptions: Player[] = [new Player(), new Player()];
  matchForm: any;

  ballsLeft: BallsLeft[];

  matchEndingList: (string | MatchEnding)[] = [];

  constructor(
    private playerService: PlayerService,
    private matchService: MatchService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) {
    this.ballsLeft =  [
      {ball: '0', indexNumber: 0},
      {ball: '1', indexNumber: 1},
      {ball: '2', indexNumber: 2},
      {ball: '3', indexNumber: 3},
      {ball: '4', indexNumber: 4},
      {ball: '5', indexNumber: 5},
      {ball: '6', indexNumber: 6},
      {ball: '7', indexNumber: 7},
    ];
   }

  ngOnInit(): void {
    this.initialiseForm();
    this.getPlayers();
    this.getMatchEndings();
  }

  /**Gets the players*/
  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {       
      const tempPlayers = players.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.players = tempPlayers;
    }); 
  }

  getMatchEndings(){
    this.matchEndingList = Object.values(MatchEnding).filter(key => isNaN(+key)); //strips off the numbers from the enum list
  }

  initialiseForm(): void {
    this.matchForm = this.formBuilder.group({
      player1_id: new FormControl('', [Validators.required]),
      player2_id: new FormControl({value: '', disabled: true}, [Validators.required]),
      winner_id: new FormControl({value: '', disabled: true}, [Validators.required]),
      balls_left: new FormControl('', [Validators.required]),
      matchEnding: new FormControl('', [])
    });

    this.matchForm.controls['player1_id'].valueChanges.subscribe((player1Id: number) => {
      const tempPlayers = [...this.players];
      const player1Index = tempPlayers.findIndex(x => x.id === player1Id);
      const player1 = tempPlayers.splice(player1Index, 1);

      this.winnerOptions[0] = player1[0];

      this.player2Options = tempPlayers;
      
      this.matchForm.controls['player2_id'].enable();
    });

    this.matchForm.controls['player2_id'].valueChanges.subscribe((player2Id: number) => {
      const tempPlayers = [...this.players];
      const player2Index = tempPlayers.findIndex(x => x.id === player2Id);
      const player2 = tempPlayers.splice(player2Index, 1);

      this.winnerOptions[1] = player2[0];
      this.matchForm.controls['winner_id'].enable();
    });

    this.matchForm.controls['balls_left'].valueChanges.subscribe((balls: number) => {
        if(balls < 7){
          const tempMatchEndings = [...this.matchEndingList];
          const matchEndIndex = tempMatchEndings.findIndex(x => x === '7 ball win');
          tempMatchEndings.splice(matchEndIndex, 1);
          this.matchEndingList = [...tempMatchEndings];
        } else {
          this.getMatchEndings();
        }        
    });
  }
  
  save(){ 
    /*this.matchService.addMatch(this.matchForm.value)
    .subscribe(response => {
      console.log(response);
      this.matchService.loadData();
    });  */
    this.matchService.addMatch(this.matchForm.value);  
    this.dialogRef.close();
  }
}