import { Injectable } from '@angular/core';
import {
  angleDiff,
  compareAngles,
  pad,
  randomNumber,
  toAngle,
} from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Rate1TurnQuestion extends QuestionBase {
  questionName = 'Rate 1 turn';

  currentHdg: number;
  desiredHdg: number;
  hdgDiff: number;
  timeSeconds: number;

  createQuestion(): void {
    this.currentHdg = randomNumber(0, 360, 1);
    this.desiredHdg = randomNumber(0, 360, 10);
    this.hdgDiff = angleDiff(this.currentHdg, this.desiredHdg);
    this.timeSeconds = this.hdgDiff / 3;
  }

  getQuestionText(): string {
    return `HDG: ${this.currentHdg}º, maak een Rate 1 bocht naar ${this.desiredHdg}º. Hoeveel seconden?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.timeSeconds) < 1;
  }

  getCorrectAnswer(): string {
    return `Bocht van ${this.hdgDiff}º, dus ${this.timeSeconds.toFixed(
      0,
    )} seconden`;
  }
}
