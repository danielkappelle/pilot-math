import { QuestionBase } from './question-base';

export class ClimbRate1Question extends QuestionBase {
  questionName = 'Climb rate 1';

  climbRateFtMin: number;
  climbFromFt: number;
  climbToFt: number;
  timeMinutes: number;

  climbRates = [50, 100, 200, 500, 1000, 1500, 2000, 2500];

  createQuestion(): void {
    this.climbRateFtMin =
      this.climbRates[Math.floor(Math.random() * this.climbRates.length)];
    this.climbFromFt = Math.floor(Math.random() * 4) * 500;
    this.climbToFt = this.climbFromFt + Math.floor(Math.random() * 4 + 2) * 500;
    this.timeMinutes =
      (this.climbToFt - this.climbFromFt) / this.climbRateFtMin;
  }

  getQuestionText(): string {
    return `Een vliegtuig heeft een climb rate van ${this.climbRateFtMin} ft/min. Hoe lang duurt het om te klimmen van ${this.climbFromFt} ft naar ${this.climbToFt} ft? Geef het antwoord als mm:ss`;
  }

  gradeAnswer(val: string): boolean {
    try {
      const mins = parseInt(val.split(':')[0]);
      const secs = parseInt(val.split(':')[1]);
      return Math.abs(mins + secs / 60 - this.timeMinutes) < 1;
    } catch {
      return false;
    }
  }

  getCorrectAnswer(): string {
    const min = Math.floor(this.timeMinutes);
    const sec = Math.round((this.timeMinutes * 60) % 60);
    return `${min} min ${sec} sec`;
  }
}
