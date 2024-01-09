import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class LandingFactor1Question extends QuestionBase {
  questionName = 'Landing factor 1';

  landingFactor: number;
  ldr: number;

  ldrFactored: number;

  createQuestion(): void {
    this.landingFactor = randomNumber(1, 15, 1);
    this.ldr = randomNumber(500, 2300, 100);
    this.ldrFactored = this.ldr * (1 + this.landingFactor / 100);
  }

  getQuestionText(): string {
    return `De landing distance is volgens de tabel ${this.ldr} meter. Volgens een bepaalde regel is er ${this.landingFactor}% meer nodig. Wat is de nieuwe landing distance?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.ldrFactored) < 5;
  }

  getCorrectAnswer(): string {
    return `${this.ldrFactored.toFixed(0)} m`;
  }
}
