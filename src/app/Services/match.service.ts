import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Match } from '../Model/match';
import { PlayedMatch } from '../Model/playedMatch';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  playedMatches: PlayedMatch[] = [];
  private _matches: BehaviorSubject<PlayedMatch[]>;
  playedMatch!: PlayedMatch;
  matchEnd!: string;

  private dataStore: {
    matches: PlayedMatch[]
  }  
  
  constructor(private http: HttpClient, private playerService: PlayerService) {
    this.dataStore = { matches: [] };
    this._matches = new BehaviorSubject<PlayedMatch[]>([]);
   }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**A method to return the matches */
  getMatches(): Observable<PlayedMatch[]> {   
    const matchesUrl = 'http://localhost:8683/api/matches' 
    return this.http.get<PlayedMatch[]>(matchesUrl);        
    }

    /** A method to add a match */
    addMatch(match: Match){
      const matchesUrl = 'http://localhost:8683/api/matches'
      
      return this.http.post<Match>(matchesUrl, match)
      .subscribe(data => {
        this.dataStore.matches.push(this.newPlayedMatch(data));
        this._matches.next(Object.assign({}, this.dataStore).matches);
      });              
      }
    

    /** A method to create a played match object from the new match object */
    newPlayedMatch(match: Match): PlayedMatch{
      this.playedMatch = new PlayedMatch;
      this.playedMatch.id = match.id;
      this.playedMatch.player1 = this.playerService.getPlayerName(match.player1_id);
      this.playedMatch.player2 = this.playerService.getPlayerName(match.player2_id);
      this.playedMatch.winner = this.playerService.getPlayerName(match.winner_id);
      //this.playedMatch.balls_left = match.balls_left;
      this.matchEnd = match.matchEnding;
      this.playedMatch.matchEnding = this.matchEnd;
      return this.playedMatch;
    }
 
    

}
