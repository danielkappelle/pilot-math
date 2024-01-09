import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class FuelFlow3Question extends QuestionBase {
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
    try {
      const hrs = parseInt(val.split(':')[0]);
      const mins = parseInt(val.split(':')[1]);
      return Math.abs(hrs + mins / 60 - this.timeLeftHr) < 10 / 60;
    } catch {
      return false;
    }
  }

  getCorrectAnswer(): string {
    const hr = Math.floor(this.timeLeftHr);
    const min = Math.round((this.timeLeftHr * 60) % 60);
    return `${hr}:${pad(min)}`;
  }
}
