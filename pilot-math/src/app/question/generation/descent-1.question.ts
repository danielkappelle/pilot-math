import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class Descent1Question {
  questionName = 'Descent 1';

  todFt: number;
  rodFpm: number;
  timeMin: number;
  gsKts: number;

  distNm: number;
  distFt: number;

  createQuestion(): void {
    this.todFt = randomNumber(8000, 15000, 500);
    this.rodFpm = randomNumber(200, 1000, 50);
    this.timeMin = randomNumber(5, 20, 1);
    this.gsKts = randomNumber(70, 120, 1);

    this.distFt = this.rodFpm * this.timeMin;
    this.distNm = (this.gsKts / 60) * this.timeMin;
  }

  getQuestionText(): string {
    return `TOD ligt op ${this.todFt} ft. ROD is ${this.rodFpm} ft/min. De daling heeft ${this.timeMin} min geduurd. De gemiddelde grondsnelheid is ${this.gsKts} kts. Hoe groot is de daalafstand, verticaal en horizontaal. Antwoord <verticaal in ft>,<horizontaal in NM>`;
  }

  gradeAnswer(val: string): boolean {
    let parts;
    try {
      parts = val.split(',');
    } catch {
      return false;
    }
    if (parts.length < 2) {
      return false;
    }
    const vertical = Math.abs(parseFloat(parts[0]) - this.distFt) < 100;
    const horizontal = Math.abs(parseFloat(parts[1]) - this.distNm) < 2;
    return vertical && horizontal;
  }

  getCorrectAnswer(): string {
    return `${this.distFt.toFixed(0)} ft verticaal, ${this.distNm.toFixed(
      1,
    )} NM horizontaal`;
  }
}
