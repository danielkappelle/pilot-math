import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class Wca1Question {
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
    this.landingHdg = (this.rwyHdg + wca) % 360;
  }

  getQuestionText(): string {
    return `De runway heading is ${this.rwyHdg}°. De w/v is ${this.windHdg}°/${this.windKts} kt. De TAS is ${this.tasKts} kts. Wat wordt de magnetic heading bij de nadering?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.landingHdg) < 5;
  }

  getCorrectAnswer(): string {
    return `${this.landingHdg.toFixed(0)}°`;
  }
}
