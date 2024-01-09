import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Twc1Question extends QuestionBase {
  questionName = 'TWC 1';

  rwyHdg: number;
  windHdg: number;
  windKts: number;

  twcKts: number;

  createQuestion(): void {
    this.rwyHdg = randomNumber(0, 350, 10);
    this.windHdg = (this.rwyHdg + 180 + randomNumber(-90, 90, 5)) % 360;
    this.windKts = randomNumber(5, 40, 5);

    this.twcKts =
      -1 *
      Math.cos(((this.windHdg - this.rwyHdg) / 180) * Math.PI) *
      this.windKts;
  }

  getQuestionText(): string {
    return `De baanrichting is ${pad(
      this.rwyHdg,
      3,
    )}°. De wind van de toren is ${this.windHdg} met ${
      this.windKts
    } kt. Hoe groot is de tailwind component?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.twcKts) < 3;
  }

  getCorrectAnswer(): string {
    return `${this.twcKts.toFixed(0)} kt`;
  }
}
