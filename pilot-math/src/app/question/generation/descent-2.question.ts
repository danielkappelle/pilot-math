import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';
import { QuestionBase } from './question-base';

@Injectable()
export class Descent2Question extends QuestionBase {
  questionName = 'Descent 2';

  rodFpm: number;
  descentFromFt: number;
  descentToFt: number;
  tasKts: number;
  ewcKts: number;

  distNm: number;

  createQuestion(): void {
    this.rodFpm = randomNumber(400, 800, 50);
    this.descentFromFt = randomNumber(80, 200, 5) * 100;
    this.descentToFt = this.descentFromFt - randomNumber(20, 50, 5) * 100;
    this.tasKts = randomNumber(90, 150, 5);
    this.ewcKts = randomNumber(-20, 20, 5);

    const gsKts = this.tasKts + this.ewcKts;
    const descentFt = this.descentFromFt - this.descentToFt;
    const timeMin = descentFt / this.rodFpm;
    this.distNm = (gsKts / 60) * timeMin;
  }

  getQuestionText(): string {
    return `Een vliegtuig heeft een Rate of Descent van ${
      this.rodFpm
    } ft/min. De daling gaat van FL${this.descentFromFt / 100} naar FL${
      this.descentToFt / 100
    }. De gemiddelde snelheid door de lucht (TAS) is ${
      this.tasKts
    } kts met een EWC van ${
      this.ewcKts
    } kts. Hoeveel NM van tevoren moet de daling worden ingezet?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.distNm) < 2;
  }

  getCorrectAnswer(): string {
    return `${this.distNm.toFixed(1)} NM`;
  }
}
