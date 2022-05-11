import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../Model/player';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private _players: BehaviorSubject<Player[]>;

  private dataStore: {
    players: Player[]
  }
  
  constructor(private http: HttpClient) { 
    this.dataStore = { players: [] };
    this._players = new BehaviorSubject<Player[]>([]);  
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**A method to get the players */
  getLeaderBoard(): Observable<Player[]>{       
    const playersUrl = 'http://localhost:8683/api/leaderboard' 
    return this.http.get<Player[]>(playersUrl);
    /*.subscribe(data => {
      this.dataStore.players = data;
      this._players.next(Object.assign({}, this.dataStore).players);
    });*/
    //return this._players.asObservable();
  }
}
