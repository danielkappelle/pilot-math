import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { QuestionBase } from './generation/question-base';
import { Convert2Question } from './generation/convert-2.question';
import { Convert1Question } from './generation/convert-1.question';
import { Speed1Question } from './generation/speed-1.question';
import { ClimbRate1Question } from './generation/climb-rate-1.question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public answerForm: UntypedFormGroup;
  public questionText: string;
  public correct = 0;
  public incorrect = 0;
  public currentQuestion: QuestionBase;
  public questions: QuestionBase[] = [];
  public incorrectQuestionText: string;
  public incorrectQuestionAnswer: string;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.answerForm = this.fb.group({
      answer: [],
    });

    this.questions.push(new Convert1Question());
    this.questions.push(new Convert2Question());
    this.questions.push(new Speed1Question());
    this.questions.push(new ClimbRate1Question());

    this.createQuestion();
  }

  createQuestion(): void {
    this.currentQuestion =
      this.questions[Math.floor(Math.random() * this.questions.length)];
    console.log(this.currentQuestion);
    this.currentQuestion.createQuestion();
    this.questionText = this.currentQuestion.getQuestionText();
  }

  submitAnswer(): void {
    const value = this.answerForm.controls['answer'].value;
    if (this.currentQuestion.gradeAnswer(value)) {
      this.correct++;
      this.incorrectQuestionText = undefined;
      this.incorrectQuestionAnswer = undefined;
    } else {
      this.incorrect++;
      this.incorrectQuestionText = this.currentQuestion.getQuestionText();
      this.incorrectQuestionAnswer = this.currentQuestion.getCorrectAnswer();
    }

    this.answerForm.controls['answer'].reset();
    this.createQuestion();
  }
}
