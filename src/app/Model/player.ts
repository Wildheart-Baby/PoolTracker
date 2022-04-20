export class Player {
    id: number = 0;
    name: string = "";
    photo?: string;
    wins: number = 0;
    losses: number = 0;    
    archived?: boolean;

    //position?: string;

    /*public getPosition(): string{
        return (this.wins * 2) + this.losses + " bob";
    }*/
}
