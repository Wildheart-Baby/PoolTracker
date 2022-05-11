import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddMatchComponent } from '../add-match/add-match.component';
import { Match } from '../Model/match';
import { PlayedMatch } from '../Model/playedMatch';
import { MatchService } from '../Services/match.service';
import { PlayerService } from '../Services/player.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.less'],
  providers: [DialogService]
})
export class MatchesComponent implements OnInit {

  matches: PlayedMatch[] = [];
  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(private matchesService: MatchService, public dialogService: DialogService) {  }

  ngOnInit(): void {
    this.getMatches();
  }

  /** A method to get the matches from the match service*/
  getMatches(): void {
    this.matchesService.getMatches()
    .subscribe(matches => {
      this.matches = matches;      
    })
  }

   /**The function to open a dialog with the new match component */
   openNewMatchDialog(): void {
     console.log("some test words");
     this.ref = this.dialogService.open(AddMatchComponent, {         
      header: 'New match',     
      width: '40%'
    });
    this.ref.onClose.subscribe(this.getMatches);
  }
}
