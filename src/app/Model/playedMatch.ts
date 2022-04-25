import { MatchEnding } from "./matchEnding";

export class PlayedMatch {
    id: number = 0
    player1: string = "";
    player2: string = "";
    balls_left: number = 0;
    winner: string = "";
    matchEnding: MatchEnding = 0;
}