import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Player } from '../Model/player';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    this.loadData();
    return this._players.asObservable();
  }

  private log(message: string) {
    console.log(message);
  }

  /**A method to mock return the players - TODO implement http call with an API */
  loadData() {      
    const playersUrl = 'http://localhost:8683/api/players' 
    this.http.get<Player[]>(playersUrl)
    .subscribe(data => {
      this.dataStore.players = data;
      this._players.next(Object.assign({}, this.dataStore).players);
    });    
    }

   /** A method to return the name of a player from the players list */ 
   getPlayerName(id: number): string{
    const player = this.dataStore.players.find(x => x.id === id);
    if(player){
      return player.name;
    }
    return "";
   } 
  
   /** A method to add a player to the database */
   addPlayer (player: Player){
    const playersUrl = 'http://localhost:8683/api/players'
      
      return this.http.post<Player>(playersUrl, player)
      .subscribe(data => {
        data.position = this.dataStore.players.length + 1;
        this.dataStore.players.push(data);
      });
   }

   /** A method to archive a player */
   archivePlayer(player: Player){
      //const player1Index = this.dataStore.players.findIndex(x => x.id === player.id);
      //this.dataStore.players[player1Index].archived = true;
      
    const playersUrl = 'http://localhost:8683/api/players'
      return this.http.put<Player>(playersUrl, player);
      //.subscribe(this.getPlayers);
   }

}
