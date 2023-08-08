import { QuestionBase } from './question-base';

export class Speed1Question extends QuestionBase {
  gsKnots: number;
  timeMinutes: number;
  distanceNm: number;

  createQuestion(): void {
    this.gsKnots = Math.floor(Math.random() * 12) * 10 + 80;
    this.timeMinutes = Math.floor(Math.random() * 58) + 2;
    this.distanceNm = (this.gsKnots * this.timeMinutes) / 60;
  }

  getQuestionText(): string {
    return `Groundspeed is ${this.gsKnots}kts, hoeveel afstand in NM leg je af in ${this.timeMinutes} minuten?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.distanceNm) < 1;
  }

  getCorrectAnswer(): string {
    return this.distanceNm.toFixed(1);
  }
}
