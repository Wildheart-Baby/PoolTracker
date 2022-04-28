import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../Services/player.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {

  userForm: any;
  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void {
    this.userForm = this.formBuilder.group({});
  }
}