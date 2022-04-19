import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Player } from '../Model/player';
import { BehaviorSubject, Observable } from 'rxjs';

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

   private playersUrl = '../assets/playerData.json';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPlayers(): Observable<Player[]>{
    this.loadAll();
    this.calculatePosition();
    return this._players.asObservable();
  }

  private log(message: string) {
    console.log(message);
  }

  /**loads the data from the json into the datastore */
  loadAll(){
    return this.http.get<Player[]>(this.playersUrl)
    .subscribe(data => {
      this.dataStore.players = data;
      this._players.next(Object.assign({}, this.dataStore).players);
    }, error => {
      this.log("failed to fetch players")
    });
  }
  
  calculatePosition(){

  }

}
