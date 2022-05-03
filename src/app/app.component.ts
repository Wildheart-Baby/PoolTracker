import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatchesComponent } from './matches/matches.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AddPlayerComponent } from './add-player/add-player.component';
import { Router } from '@angular/router';
import { ArchivePlayerComponent } from './archive-player/archive-player.component';

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
        label: 'Rankings',
        items: [
            {label: 'Leader Board', routerLink: ['/rankings'] },
            {label: 'New Player', command: () => this.newPlayer() },
            {label: 'Archive Player', command: () => this.archivePlayer()}
        ]
      },
      {
        label: 'Matches',
        items: [
            {label: 'Played Matches', routerLink: ['/matches'] },
            {label: 'New Match', command: () => this.newMatch() }
        ]
      }
    ]
  }

  newPlayer(){
    this.router.navigate(['/rankings']);
    this.dialogService.open(AddPlayerComponent, {         
      header: 'New player',     
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

  archivePlayer(){
    this.router.navigate(['/rankings']);
    this.dialogService.open(ArchivePlayerComponent, {         
      header: 'Archive player',     
      width: '40%'
    });
  }
  
}
