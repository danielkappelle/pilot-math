import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { QuestionBase } from './generation/question-base';
import { Convert2Question } from './generation/convert-2.question';
import { Convert1Question } from './generation/convert-1.question';
import { Speed1Question } from './generation/speed-1.question';
import { ClimbRate1Question } from './generation/climb-rate-1.question';
import { ClimbRate2Question } from './generation/climb-rate-2.question';
import { DescentDistance1Question } from './generation/descent-distance-1.question';
import { Time1Question } from './generation/time-1.question';
import { MultiDistance1Question } from './generation/multiple-distances-1.question';
import { FuelFlow1Question } from './generation/fuelflow-1.question';
import { FuelFlow2Question } from './generation/fuelflow-2.question';
import { FuelFlow3Question } from './generation/fuelflow-3.question';
import { FuelFlow4Question } from './generation/fuelflow-4.question';
import { FuelFlow5Question } from './generation/fuelflow-5.question';
import { Descent1Question } from './generation/descent-1.question';
import { Descent2Question } from './generation/descent-2.question';
import { FlowFactor1Question } from './generation/flowfactor-1.question';
import { LandingFactor1Question } from './generation/landingfactor-1.question';
import { Wca1Question } from './generation/wca-1.question';
import { Wca2Question } from './generation/wca-2.question';

interface LastQuestion {
  text?: string;
  correctAnswer?: string;
  correct?: boolean;
  givenAnswer?: string;
  questionName?: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public answerForm: UntypedFormGroup;
  public questionTypesForm: UntypedFormGroup;

  public questionText: string;
  public correct = 0;
  public incorrect = 0;
  public currentQuestion: QuestionBase;
  public questions: QuestionBase[] = [];
  public lastQuestion: LastQuestion;

  constructor(private fb: UntypedFormBuilder) {}

  get typeControls() {
    return (this.questionTypesForm.controls['types'] as FormArray).controls;
  }

  ngOnInit(): void {
    this.answerForm = this.fb.group({
      answer: [],
    });

    this.questions.push(new Convert1Question());
    this.questions.push(new Convert2Question());
    this.questions.push(new Speed1Question());
    this.questions.push(new ClimbRate1Question());
    this.questions.push(new ClimbRate2Question());
    this.questions.push(new DescentDistance1Question());
    this.questions.push(new Time1Question());
    this.questions.push(new MultiDistance1Question());
    this.questions.push(new FuelFlow1Question());
    this.questions.push(new FuelFlow2Question());
    this.questions.push(new FuelFlow3Question());
    this.questions.push(new FuelFlow4Question());
    this.questions.push(new FuelFlow5Question());
    this.questions.push(new Descent1Question());
    this.questions.push(new Descent2Question());
    this.questions.push(new FlowFactor1Question());
    this.questions.push(new LandingFactor1Question());
    this.questions.push(new Wca1Question());
    this.questions.push(new Wca2Question());

    this.questionTypesForm = this.fb.group({
      types: this.fb.array(this.questions.map(() => true)),
    });

    this.createQuestion();
  }

  createQuestion(): void {
    // Filter selected questions
    const filteredTypes = this.typeControls
      .map((control, idx) => ({ idx, val: control.value }))
      .filter((control) => control.val)
      .map((control) => this.questions[control.idx]);

    if (!filteredTypes.length) {
      return;
    }

    this.currentQuestion =
      filteredTypes[Math.floor(Math.random() * filteredTypes.length)];
    this.currentQuestion.createQuestion();
    this.questionText = this.currentQuestion.getQuestionText();
  }

  submitAnswer(): void {
    const value = this.answerForm.controls['answer'].value;
    this.lastQuestion = {
      text: this.currentQuestion.getQuestionText(),
      correctAnswer: this.currentQuestion.getCorrectAnswer(),
      givenAnswer: value,
      questionName: this.currentQuestion.questionName,
    };

    if (this.currentQuestion.gradeAnswer(value)) {
      this.correct++;
      this.lastQuestion.correct = true;
    } else {
      this.incorrect++;
      this.lastQuestion.correct = false;
    }

    this.answerForm.controls['answer'].reset();
    this.createQuestion();
  }

  selectAll() {
    this.typeControls.forEach((control) => {
      control.setValue(true);
    });
  }

  deselectAll() {
    this.typeControls.forEach((control) => {
      control.setValue(false);
    });
  }
}
