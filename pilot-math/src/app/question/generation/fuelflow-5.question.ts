import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class FuelFlow5Question {
  questionName = 'Fuel flow 5';

  distToGoNm: number;
  fuelFlow: number;
  fuelInTankL: number;
  speedKts: number;
  fuelAtAlternateL: number;
  extraDistNm: number;

  createQuestion(): void {
    this.distToGoNm = randomNumber(50, 150, 5);
    this.fuelFlow = randomNumber(20, 50, 1);
    this.speedKts = randomNumber(80, 120, 5);
    this.fuelAtAlternateL = randomNumber(5, 30, 1);
    let extraFuel = randomNumber(15, 30, 1);

    const timeToGoHr = this.distToGoNm / this.speedKts;
    const fuelToGoL = timeToGoHr * this.fuelFlow;
    this.fuelInTankL = Math.ceil(fuelToGoL + this.fuelAtAlternateL + extraFuel);
    extraFuel = this.fuelInTankL - fuelToGoL - this.fuelAtAlternateL;

    this.extraDistNm = (extraFuel / this.fuelFlow) * this.speedKts;
  }

  getQuestionText(): string {
    return `Men is nog ${this.distToGoNm} NM van de bestemming. De fuel flow is ${this.fuelFlow} l/uur. In de tank zit nog ${this.fuelInTankL} l. De vliegsnelheid is ${this.speedKts} kts. Hoever kan men na de bestemming nog doorvliegen naar een alternate met reserve op de alternate van ${this.fuelAtAlternateL} l?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.extraDistNm) < 5;
  }

  getCorrectAnswer(): string {
    return `${this.extraDistNm.toFixed(0)} NM`;
  }
}
