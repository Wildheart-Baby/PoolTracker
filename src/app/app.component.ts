import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatchesComponent } from './matches/matches.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [DialogService]
})
export class AppComponent implements OnInit{
  
  title = 'Pool Tracker';
  items: MenuItem[] =[];
  

constructor(public dialogService: DialogService){}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Leader Board',
        items: [
            {label: 'Rankings', routerLink: ['/rankings'] },
            {label: 'New Player', command: () => this.newPlayer() }
        ]
      },
      {
        label: 'Played Matches',
        items: [
            {label: 'Matches', routerLink: ['/matches'] },
            {label: 'New Match', command: () => this.newMatch() }
        ]
      }
    ]
  }

  newPlayer(){
    this.dialogService.open(AddUserComponent, {         
      header: 'New user',     
      width: '40%'
    });
  }

  newMatch(){
    this.dialogService.open(AddMatchComponent, {         
      header: 'New match',     
      width: '40%'
    });
  }
  
}
