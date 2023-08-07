import { QuestionBase } from "./question-base";

export class FooQuestion extends QuestionBase {
  heading: number;
  correctAnswer: number;

  constructor() {
    super();
    this.heading = Math.round(Math.random()*360);
    this.correctAnswer = (this.heading + 180) % 360;
  }

  getQuestionText(): string {
      return `What's the reciprocal of ${this.heading}° ?`;
  }

  gradeAnswer(val: string): boolean {
    console.log('4real yo')
    return parseInt(val) === this.correctAnswer;
  }
}