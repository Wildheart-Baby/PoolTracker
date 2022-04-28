import { Component, OnInit } from '@angular/core';
import { Player } from '../Model/player';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
  players: Player[] = [];
  player2Options: Player[] = [];
  winnerOptions: Player[] = [new Player(), new Player()];
  matchForm: any;

  ballsLeft: string[] = ["0", "1", "2", "3", "4", "5", "6", "7"]

  matchEndingList = Object.values(MatchEnding).filter(key => isNaN(+key)); //strips off the numbers from the enum list

  constructor(
    private playerService: PlayerService,
    private matchService: MatchService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.getPlayers();
  }

  /**Gets the players*/
  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players; 
    }); 
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
  }
  
  save(){ 
    this.matchService.addMatch(this.matchForm.value);    
    this.dialogRef.close();
  }
}