import { QuestionBase } from './question-base';
import { randomNumber } from '../helpers';

export class DescentDistance1Question extends QuestionBase {
  questionName = 'Descent distance 1';

  descentRateFpm: number;
  descentFromFt: number;
  descentToFt: number;
  tasKts: number;
  headwindKts: number;
  groundSpeedKts: number;

  timeMinutes: number;
  groundDistanceNm: number;

  descentRates = [100, 200, 500, 1000, 1500, 2000, 2500];

  createQuestion(): void {
    this.descentRateFpm =
      this.descentRates[randomNumber(0, this.descentRates.length - 1)];

    this.descentFromFt = randomNumber(10000, 20000, 1000);
    this.descentToFt = randomNumber(4000, 9000, 1000);
    this.tasKts = randomNumber(150, 250, 10);
    this.headwindKts = randomNumber(10, 40, 10);

    this.timeMinutes =
      (this.descentFromFt - this.descentToFt) / this.descentRateFpm;
    this.groundSpeedKts = this.tasKts - this.headwindKts;

    this.groundDistanceNm = (this.groundSpeedKts / 60) * this.timeMinutes;
  }

  getQuestionText(): string {
    return `Hoeveel NM over de grond als men daalt met ${
      this.descentRateFpm
    } ft/min van FL${this.descentFromFt / 100} to FL${
      this.descentToFt / 100
    } met een TAS van ${this.tasKts} kts en een headwind van ${
      this.headwindKts
    } kts?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.timeMinutes) < 1;
  }

  getCorrectAnswer(): string {
    return `${this.groundDistanceNm.toFixed(0)} NM`;
  }
}
