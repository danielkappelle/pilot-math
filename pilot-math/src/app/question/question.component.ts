import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  public answerForm: UntypedFormGroup;
  public questionText: string;
  public correctAnswer: number;
  public correct = 0;
  public incorrect = 0;

  constructor (
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.answerForm = this.fb.group({
      answer: []
    });

    this.createQuestion();
  }

  createQuestion(): void {
    const heading = Math.round(Math.random()*360);
    this.questionText = `What's the reciprocal of ${heading}° ?`;
    this.correctAnswer = (heading + 180) % 360;
  }

  submitAnswer(): void {
    const value = this.answerForm.controls['answer'].value;
    if (parseInt(value) === this.correctAnswer) {
      console.log('good');
      this.correct++;
    } else {
      this.incorrect++;
      console.log('not so good');
    }

    this.answerForm.controls['answer'].reset();
    this.createQuestion();
  }
}