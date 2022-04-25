import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Match } from '../Model/match';
import MatchesJson from '../../assets/matchesData.json';
import { PlayedMatch } from '../Model/playedMatch';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private _matches: BehaviorSubject<PlayedMatch[]>;

  /*private dataStore: {
    matches: PlayedMatch[]
  }
  */
  
  constructor(private http: HttpClient) {
    //this.dataStore = { matches: [] };
    this._matches = new BehaviorSubject<PlayedMatch[]>([]);
   }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** A method to return the array of matches */
  getMatches(): Observable<PlayedMatch[]>{     
    return this._matches.asObservable();
  }

  /**A method to mock return the matches - TODO implement http call with an API */
  loadData(): Observable<PlayedMatch[]> {    
    return of(MatchesJson)    
    }
}
