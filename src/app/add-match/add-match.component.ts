import { ListRange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PlayerList } from '../Model/playerList';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.less']
})
export class AddMatchComponent implements OnInit {

  playerNames: Array<PlayerList> = [];
  player!: PlayerList;
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

    this.playerService.loadData().forEach(data => {
      this.player = new PlayerList();
      //this.player.playerid = data.id;
      //this.player.playername = data.name;
      this.playerNames.push(this.player);
    });
  }

}
