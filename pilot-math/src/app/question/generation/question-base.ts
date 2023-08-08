import { Injectable } from '@angular/core';

@Injectable()
export abstract class QuestionBase {
  constructor() {}

  createQuestion(): void {}

  getQuestionText(): string {
    return '';
  }

  gradeAnswer(val: string): boolean {
    return true;
  }

  getCorrectAnswer(): string {
    return '';
  }
}
