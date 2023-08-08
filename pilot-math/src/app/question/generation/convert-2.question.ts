import { QuestionBase } from "./question-base";

export class Convert2Question extends QuestionBase {
  questionName = "Conversion 2";

  qtyUsg: number;
  qtyLbs: number;

  createQuestion(): void {
      this.qtyUsg = Math.floor(Math.random()*45)+5;
      this.qtyLbs = this.qtyUsg * 6;
  }

  getQuestionText(): string {
      return `Hoeveel lb is ${this.qtyUsg} USG brandstof?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.qtyLbs) < 0.5;
  }

  getCorrectAnswer(): string {
      return `${this.qtyLbs.toFixed(1)} lbs`;
  }
}