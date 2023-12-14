import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class FuelFlow3Question {
  questionName = 'Fuel flow 3';

  fuelLeftL: number;
  fuelFlowLHr: number;

  timeLeftHr: number;

  createQuestion(): void {
    this.fuelFlowLHr = randomNumber(50, 150, 5);
    this.fuelLeftL = randomNumber(250, 1000, 10);

    this.timeLeftHr = this.fuelLeftL / this.fuelFlowLHr;
  }

  getQuestionText(): string {
    return `Men heeft nog ${this.fuelLeftL} l in de tank. Het verbruik is ${this.fuelFlowLHr} l/hr. Hoe lang kan nog worden doorgevlogen? Antwoord hh:mm`;
  }

  gradeAnswer(val: string): boolean {
    const hrs = parseInt(val.split(':')[0]);
    const mins = parseInt(val.split(':')[1]);
    return Math.abs(hrs + mins / 60 - this.timeLeftHr) < 10 / 60;
  }

  getCorrectAnswer(): string {
    const hr = Math.floor(this.timeLeftHr);
    const min = Math.round((this.timeLeftHr * 60) % 60);
    return `${hr}:${pad(min)}`;
  }
}
