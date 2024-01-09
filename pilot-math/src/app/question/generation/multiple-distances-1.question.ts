import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class MultiDistance1Question {
  questionName = 'Multiple distances 1';

  takeOffHr: number;
  takeOffMin: number;
  groundSpeedKts: number;
  distancesNm: number[];

  arrivalTimeHr: number;
  arrivalTimeMin: number;

  createQuestion(): void {
    this.takeOffHr = randomNumber(0, 24);
    this.takeOffMin = randomNumber(0, 60);

    this.distancesNm = [];
    for (let i = 0; i < randomNumber(4, 6); i++) {
      this.distancesNm.push(randomNumber(2, 30));
    }

    const totalDistance = this.distancesNm.reduce((prev, cur) => prev + cur, 0);

    this.groundSpeedKts = randomNumber(80, 150, 10);

    const flightTimeMin = (totalDistance / this.groundSpeedKts) * 60;

    const arrivalTime = this.takeOffHr * 60 + this.takeOffMin + flightTimeMin;

    this.arrivalTimeHr = Math.floor(arrivalTime / 60);
    this.arrivalTimeMin = Math.round(arrivalTime % 60);
  }

  getQuestionText(): string {
    return `Vertrek vanaf een luchthaven om ${this.takeOffHr}:${pad(
      this.takeOffMin,
    )}. Men vliegt via de vertrekroute de volgende afstanden: ${this.distancesNm.join(
      ', ',
    )} NM. De gemiddelde grondsnelheid is ${
      this.groundSpeedKts
    } kts. Hoe laat komt men aan?`;
  }

  gradeAnswer(val: string): boolean {
    let hr, min: number;
    try {
      hr = parseInt(val.split(':')[0]);
      min = parseInt(val.split(':')[1]);
    } catch {
      return false;
    }
    return (
      Math.abs(
        hr * 60 + min - (this.arrivalTimeHr * 60 + this.arrivalTimeMin),
      ) <= 5
    );
  }

  getCorrectAnswer(): string {
    return `${this.arrivalTimeHr}:${pad(this.arrivalTimeMin)}`;
  }
}
