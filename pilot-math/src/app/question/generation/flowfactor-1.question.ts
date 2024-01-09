import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class FlowFactor1Question extends QuestionBase {
  questionName = 'Flow factor 1';

  flowFactor: number;
  fuelTableKg: number;

  fuelNeededKg: number;

  createQuestion(): void {
    this.flowFactor = randomNumber(1, 15, 1);
    this.fuelTableKg = randomNumber(8000, 15000, 500);
    this.fuelNeededKg = this.fuelTableKg * (1 - this.flowFactor / 100);
  }

  getQuestionText(): string {
    return `Een vliegtuig is een low consumer betreffende de fuel. De flow factor is -${this.flowFactor}%. De hoeveelheid fuel volgens de tabellen is ${this.fuelTableKg} kg. Hoeveel fuel is dan nodig?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.fuelNeededKg) < 10;
  }

  getCorrectAnswer(): string {
    return `${this.fuelNeededKg.toFixed(0)} kg`;
  }
}
