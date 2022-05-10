import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { PlayerService } from "./player.service";

@Injectable({ providedIn: 'root' })
export class Validation {    
    constructor(private playerService: PlayerService){}
    
    checkName(name: string): ValidatorFn  {
        return (controls: AbstractControl) => {
            const control = controls.get(name);
                  
            if (controls.errors ) {
              return null;
            }
      
            if (this.playerService.checkPlayerExists(name)) {
              return { matching: true };
            } else {
              return null;
            }
          };
    }
    
}
