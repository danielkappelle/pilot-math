import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class FuelFlow1Question {
  questionName = 'Fuel flow 1';

  distanceNm: number;
  speedKts: number;
  fuelFlowLbHr: number;

  fuelUsed: number;

  createQuestion(): void {
    this.distanceNm = randomNumber(50, 200, 10);
    this.speedKts = randomNumber(60, 120, 5);
    this.fuelFlowLbHr = randomNumber(60, 80);

    const timeHr = this.distanceNm / this.speedKts;
    this.fuelUsed = timeHr * this.fuelFlowLbHr;
  }

  getQuestionText(): string {
    return `Afstand is ${this.distanceNm} NM. Snelheid is ${this.speedKts} kt. Fuel flow is ${this.fuelFlowLbHr} lb/hr. Hoeveel brandstof is verbruikt?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.fuelUsed) <= 10;
  }

  getCorrectAnswer(): string {
    return `${this.fuelUsed.toFixed(1)} lbs`;
  }
}
