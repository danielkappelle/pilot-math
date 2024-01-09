import { QuestionBase } from './question-base';

export class Convert1Question extends QuestionBase {
  questionName = "Conversion 1";

  qtyLiter: number;
  density: number;
  mass: number;

  createQuestion(): void {
    this.qtyLiter = Math.floor(Math.random() * 95) + 5;
    this.density = 0.72;
    this.mass = this.qtyLiter * this.density;
  }

  getQuestionText(): string {
    return `Hoeveel kg weegt ${this.qtyLiter}l fuel met specific gravity ${this.density} kg/l ?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.mass) < 1;
  }

  getCorrectAnswer(): string {
    return `${this.mass.toFixed(1)} kg`;
  }
}
