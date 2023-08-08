import { QuestionBase } from "./question-base";

export class Convert2Question extends QuestionBase {
  qtyUsg: number;
  qtyL: number;

  createQuestion(): void {
      this.qtyUsg = Math.floor(Math.random()*45)+5;
      this.qtyL = this.qtyUsg * 6;
  }

  getQuestionText(): string {
      return `Hoeveel lb is ${this.qtyUsg} USG brandstof?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.qtyL) < 0.5;
  }

  getCorrectAnswer(): string {
      return `${this.qtyL.toFixed(1)} NM`;
  }
}