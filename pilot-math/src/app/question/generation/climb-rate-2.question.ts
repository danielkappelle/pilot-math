import { QuestionBase } from './question-base';

export class ClimbRate2Question extends QuestionBase {
  questionName = 'Climb rate 2';

  climbRateFpm: number;
  climbFromFt: number;
  climbToFt: number;
  timeMinutes: number;

  createQuestion(): void {
    this.climbFromFt = Math.floor(Math.random() * 20) * 200;
    this.climbToFt =
      this.climbFromFt + Math.floor(Math.random() * 50 + 2) * 200;
    this.timeMinutes = Math.floor(Math.random() * 7) * 2 + 2;
    this.climbRateFpm = (this.climbToFt - this.climbFromFt) / this.timeMinutes;
  }

  getQuestionText(): string {
    return `Men klimt in ${this.timeMinutes} minuten van ${this.climbFromFt} ft naar ${this.climbToFt} ft. Wat is de Rate of Climb in ft/min?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.climbRateFpm) < 100;
  }

  getCorrectAnswer(): string {
    return `${this.climbRateFpm} ft/min`;
  }
}
