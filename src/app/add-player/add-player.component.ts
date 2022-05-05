import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../Services/player.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.less']
})
export class AddPlayerComponent implements OnInit {

  playerForm: any;
  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.playerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      photo: new FormControl('assets/person.png'),
      archived: new FormControl(false)
      //wins: new FormControl(0),
      //losses: new FormControl(0),
      
    });
  }

  save(){
    this.playerService.addPlayer(this.playerForm.value);
    this.dialogRef.close();
  }
}
