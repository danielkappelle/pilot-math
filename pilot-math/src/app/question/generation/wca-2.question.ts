import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Wca2Question extends QuestionBase {
  questionName = 'WCA 2';

  awyHdg: number;
  windHdg: number;
  windKts: number;
  tasKts: number;

  magHdg: number;

  createQuestion(): void {
    this.awyHdg = randomNumber(0, 350, 10);
    this.windHdg =
      this.awyHdg + randomNumber(70, 120, 5) * Math.sign(Math.random() - 0.5);
    this.windKts = randomNumber(30, 60, 5);
    this.tasKts = randomNumber(200, 450, 10);

    const speedFactor = this.tasKts / 60;
    const xwc =
      this.windKts * Math.sin(((this.windHdg - this.awyHdg) / 180) * Math.PI);
    const wca = xwc / speedFactor;
    this.magHdg = (this.awyHdg + wca) % 360;
  }

  getQuestionText(): string {
    return `Men vliegt op een airway met MT van ${this.awyHdg}°. De w/v is ${this.windHdg}°/${this.windKts}kt. TAS is ${this.tasKts} kts. Wat wordt de MH?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.magHdg) < 5;
  }

  getCorrectAnswer(): string {
    return `${this.magHdg.toFixed(0)}°`;
  }
}
