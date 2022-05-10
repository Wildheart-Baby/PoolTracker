import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../Services/player.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Validation } from '../Services/validation';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.less']
})
export class AddPlayerComponent implements OnInit{

  playerForm: any;
  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef,
    protected validation: Validation
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.playerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      photo: new FormControl('assets/person.png'),
      archived: new FormControl(false)
    });
  }

  save(){
    this.playerService.addPlayer(this.playerForm.value);
    this.dialogRef.close();
  }
  
}
