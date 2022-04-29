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
  players: Player[] = [];
  archiveForm: any;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  initialiseForm(): void {
    this.archiveForm = this.formBuilder.group({
      archive: new FormControl('', [Validators.required])
    });
  }
   
  /**Gets the players*/
  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {       
      const tempPlayers = players.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.players = tempPlayers;
    }); 
  }

  save(){
    this.playerService.archivePlayer(this.archiveForm.value);
    this.dialogRef.close();
  }

}
