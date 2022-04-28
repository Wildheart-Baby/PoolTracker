import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatchesComponent } from './matches/matches.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUserComponent } from './add-user/add-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [DialogService]
})
export class AppComponent implements OnInit{
  
  title = 'Pool Tracker';
  items: MenuItem[] =[];
  

constructor(public dialogService: DialogService, private router: Router){}

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
    this.router.navigate(['/rankings']);
    this.dialogService.open(AddUserComponent, {         
      header: 'New user',     
      width: '40%'
    });
  }

  newMatch(){
    this.router.navigate(['/matches']);
    this.dialogService.open(AddMatchComponent, {         
      header: 'New match',     
      width: '40%'
    });
  }
  
}
