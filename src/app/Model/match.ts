import { MatchEnding } from "./matchEnding";
export class Match {
    id?: number;
    player1_id?: number;
    player2_id?: number;
    balls_left?: number;
    winner_id?: number;
    matchEnding: MatchEnding;
}