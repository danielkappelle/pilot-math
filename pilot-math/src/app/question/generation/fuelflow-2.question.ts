import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class FuelFlow2Question extends QuestionBase {
  questionName = 'Fuel flow 2';

  flightTimeMin: number;
  flightTimeHr: number;
  fuelFlowLbHr: number;

  fuelUsed: number;

  createQuestion(): void {
    const flightTime = randomNumber(0, 5 * 60);
    this.fuelFlowLbHr = randomNumber(60, 80);

    this.fuelUsed = (flightTime / 60) * this.fuelFlowLbHr;
    this.flightTimeHr = Math.floor(flightTime / 60);
    this.flightTimeMin = Math.floor(flightTime % 60);
  }

  getQuestionText(): string {
    return `Fuel flow is ${this.fuelFlowLbHr} lb/hr. Vliegtijd is ${
      this.flightTimeHr
    }:${pad(this.flightTimeMin)}. Hoeveel is het verbruik?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.fuelUsed) <= 5;
  }

  getCorrectAnswer(): string {
    return `${this.fuelUsed.toFixed(1)} lbs`;
  }
}
