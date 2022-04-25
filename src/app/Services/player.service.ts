import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Player } from '../Model/player';
import { BehaviorSubject, Observable, of } from 'rxjs';
import PlayersJson from '../../assets/playerData.json';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players: BehaviorSubject<Player[]>;

  private dataStore: {
    players: Player[]
  }

  constructor( private http: HttpClient ) {
    this.dataStore = { players: [] };
    this._players = new BehaviorSubject<Player[]>([]);    
   }

   //private playersUrl = '../assets/playerData.json';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**A method to get the players */
  getPlayers(): Observable<Player[]>{       
    return this._players.asObservable();
  }

  private log(message: string) {
    console.log(message);
  }

  /**A method to mock return the players - TODO implement http call with an API */
  loadData() {      
    return of(PlayersJson)
    .subscribe(data => {
      this.dataStore.players = data;
      this._players.next(Object.assign({}, this.dataStore).players);
    });    
    }

   /** A method to return the name of a player from the players list */ 
   getPlayerName(id: number): string{
    return this.dataStore.players.find(x => x.id === id)?.name as string;
   } 
  
   

}
