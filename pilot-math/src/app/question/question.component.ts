import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { QuestionBase } from "./generation/question-base";
import { FooQuestion } from "./generation/foo.question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  public answerForm: UntypedFormGroup;
  public questionText: string;
  public correct = 0;
  public incorrect = 0;
  public currentQuestion: QuestionBase;

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
    this.currentQuestion = new FooQuestion();
    this.questionText = this.currentQuestion.getQuestionText();
  }

  submitAnswer(): void {
    const value = this.answerForm.controls['answer'].value;
    if (this.currentQuestion.gradeAnswer(value)) {
      this.correct++;
    } else {
      this.incorrect++;
    }

    this.answerForm.controls['answer'].reset();
    this.createQuestion();
  }
}