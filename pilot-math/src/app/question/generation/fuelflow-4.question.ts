import { Injectable } from '@angular/core';
import { pad, randomNumber } from '../helpers';

@Injectable()
export class FuelFlow4Question {
  questionName = 'Fuel flow 4';

  fuelLeftL: number;
  fuelUsageL: number;
  fuelUsageNm: number;

  distLeftNm: number;

  createQuestion(): void {
    this.fuelLeftL = randomNumber(50, 150, 5);
    this.fuelUsageL = randomNumber(80, 150, 5);
    this.fuelUsageNm = randomNumber(200, 400, 5);

    const fuelFlow = this.fuelUsageL / this.fuelUsageNm;
    this.distLeftNm = this.fuelLeftL / fuelFlow;
  }

  getQuestionText(): string {
    return `De fuel in de tank is nog ${this.fuelLeftL} l. Het verbruik over de laatste ${this.fuelUsageNm} NM was ${this.fuelUsageL} l. Hoever kan men nog vliegen?`;
  }

  gradeAnswer(val: string): boolean {
    return Math.abs(parseFloat(val) - this.distLeftNm) < 5;
  }

  getCorrectAnswer(): string {
    return `${this.distLeftNm.toFixed(0)} NM`;
  }
}
