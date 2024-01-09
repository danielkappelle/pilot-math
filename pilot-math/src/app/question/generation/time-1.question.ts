import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Time1Question extends QuestionBase {
  questionName = 'Time 1';

  takeOffHr: number;
  takeOffMin: number;
  flightTimeHr: number;
  flightTimeMin: number;

  arrivalTimeHr: number;
  arrivalTimeMin: number;

  createQuestion(): void {
    this.takeOffHr = randomNumber(0, 12);
    this.takeOffMin = randomNumber(0, 60);
    this.flightTimeHr = randomNumber(0, 12);
    this.flightTimeMin = randomNumber(0, 60);

    const arrivalTime =
      this.takeOffHr * 60 +
      this.takeOffMin +
      this.flightTimeHr * 60 +
      this.flightTimeMin;

    this.arrivalTimeHr = Math.floor(arrivalTime / 60);
    this.arrivalTimeMin = arrivalTime % 60;
  }

  getQuestionText(): string {
    return `Take-off time is ${this.takeOffHr}:${pad(
      this.takeOffMin,
    )} UTC. De vliegtijd is ${this.flightTimeHr}:${pad(
      this.flightTimeMin,
    )}. Hoe laat komt men aan?`;
  }

  gradeAnswer(val: string): boolean {
    const hr = parseInt(val.split(':')[0]);
    const min = parseInt(val.split(':')[1]);
    return hr * 60 + min === this.arrivalTimeHr * 60 + this.arrivalTimeMin;
  }

  getCorrectAnswer(): string {
    return `${this.arrivalTimeHr}:${pad(this.arrivalTimeMin)}`;
  }
}
