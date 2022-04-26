import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Match } from '../Model/match';
import { PlayedMatch } from '../Model/playedMatch';
import { MatchService } from '../Services/match.service';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.less']
})
export class MatchesComponent implements OnInit {

  matches: PlayedMatch[] = [];
  

  constructor(private matchesService: MatchService, private playerService: PlayerService) {  }

  ngOnInit(): void {
    this.getMatches();
    this.playerService.loadData();
  }

  /** A method to return the matches */
  getMatches(): void {
    this.matchesService.getMatches()
    .subscribe(matches => {
      this.matches = matches;      
    })
  }


}
