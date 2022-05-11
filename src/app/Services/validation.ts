import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PlayerService } from "./player.service";

@Injectable({ providedIn: 'root' })
export class Validation {    
    constructor(private playerService: PlayerService){}
    
    checkName(name: string): ValidatorFn  {
        return (control: AbstractControl): ValidationErrors | null => {
            const playerName = name.normalize(control.value);
            return playerName ? {playerName : {value: control.value}} : null   
          };
    }
    
}
