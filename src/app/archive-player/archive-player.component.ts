import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Player } from '../Model/player';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-archive-player',
  templateUrl: './archive-player.component.html',
  styleUrls: ['./archive-player.component.less']
})
export class ArchivePlayerComponent implements OnInit {
  playersList: Player[] = [];
  archiveForm: any;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.getPlayers();
  }

  initialiseForm(): void {
    this.archiveForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required])
    });
  }
   
  /**Gets the players*/
  getPlayers(): void {    
    this.playerService.getPlayers().subscribe(players => {       
      const tempPlayers = [...players];
      this.playersList = tempPlayers.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }); 
  }

  save(){
    const player_id = this.archiveForm.value;
    this.playerService.archivePlayer(player_id);
    this.dialogRef.close();
  }

}
