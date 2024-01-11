import { Injectable } from '@angular/core';
import { compareAngles, pad, randomNumber, toAngle } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Wca1Question extends QuestionBase {
  questionName = 'WCA 1';

  rwyHdg: number;
  windHdg: number;
  windKts: number;
  tasKts: number;

  landingHdg: number;

  createQuestion(): void {
    this.rwyHdg = randomNumber(0, 350, 10);
    this.windHdg = randomNumber(0, 350, 10);
    this.windKts = randomNumber(5, 40, 5);
    this.tasKts = randomNumber(80, 120, 10);

    const speedFactor = this.tasKts / 60;
    const xwc =
      this.windKts * Math.sin(((this.windHdg - this.rwyHdg) / 180) * Math.PI);
    const wca = xwc / speedFactor;
    this.landingHdg = toAngle(this.rwyHdg + wca);
  }

  getQuestionText(): string {
    return `De runway heading is ${pad(this.rwyHdg, 3)}°. De w/v is ${
      this.windHdg
    }°/${this.windKts} kt. De TAS is ${
      this.tasKts
    } kts. Wat wordt de magnetic heading bij de nadering?`;
  }

  gradeAnswer(val: string): boolean {
    return compareAngles(parseFloat(val), this.landingHdg, 5);
  }

  getCorrectAnswer(): string {
    return `${this.landingHdg.toFixed(0)}°`;
  }
}
