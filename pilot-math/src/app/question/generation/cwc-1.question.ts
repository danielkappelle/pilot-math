import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Cwc1Question extends QuestionBase {
  questionName = 'CWC 1';

  rwyHdg: number;
  windHdg: number;
  windKts: number;

  cwcKts: number;

  createQuestion(): void {
    this.rwyHdg = randomNumber(0, 350, 10);
    this.windHdg = randomNumber(0, 350, 10);
    this.windKts = randomNumber(5, 40, 5);

    this.cwcKts =
      Math.abs(Math.sin(((this.windHdg - this.rwyHdg) / 180) * Math.PI)) *
      this.windKts;
  }

  getQuestionText(): string {
    return `De baanrichting is ${pad(
      (this.rwyHdg / 10).toFixed(0),
      2,
    )}. De wind van de toren is ${this.windHdg} met ${
      this.windKts
    } kt. Hoe groot is de dwarswind component?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.cwcKts) < 3;
  }

  getCorrectAnswer(): string {
    return `${this.cwcKts.toFixed(0)} kt`;
  }
}
