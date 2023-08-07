import { Injectable } from '@angular/core';

@Injectable()
export abstract class QuestionBase {
  constructor() {}

  getQuestionText(): string {
    return "";
  }

  gradeAnswer(val: string): boolean {
    return true;
  }
}
