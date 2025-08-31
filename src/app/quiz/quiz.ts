import { NgIf,NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';


type ChoiceKey = 'A' | 'B' | 'C' | 'D';

type Question = {
  id: string;
  text: string;
  choices: {A:string; B:string; C:string; D:string};
}

@Component({
  selector: 'app-quiz',
  imports: [ReactiveFormsModule, NgForOf, NgIf, NgxPrintModule, MatIcon],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {

  private fBuilder:FormBuilder = inject(FormBuilder);
  mode: 'build' | 'print' = 'build';

  questions: Question[] = [];
    keys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  constructor(){}

  fGroup = this.fBuilder.group({
    id:[''],
    text: ['',Validators.required],
    A: ['',Validators.required],
    B: ['',Validators.required],
    C: ['',Validators.required],
    D: ['',Validators.required],
    
  })

    private swap(list: Question[], i: number, j: number): Question[] {
    if (i === j) return list;
    const copy = list.slice();
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
    return copy;
  }
  moveUp(i: number): void {
    if (i <= 0) return;
    this.questions = this.swap(this.questions, i, i - 1);
  }
  moveDown(i: number): void {
    if (i >= this.questions.length - 1) return;
    this.questions = this.swap(this.questions, i, i + 1);
  }
  moveToTop(i: number): void {
    if (i <= 0) return;
    const copy = this.questions.slice();
    const [q] = copy.splice(i, 1);
    copy.unshift(q);
    this.questions = copy;
  }
  moveToBottom(i: number): void {
    if (i >= this.questions.length - 1) return;
    const copy = this.questions.slice();
    const [q] = copy.splice(i, 1);
    copy.push(q);
    this.questions = copy;
  }

    private newId(): string {
    return 'q_' + Math.random().toString(36).slice(2) + '_' + Date.now();
  }

  resetForm(): void {
    this.fGroup.reset({
      id: '',
      text: '',
      A: '',
      B: '',
      C: '',
      D: '',
    });
  }

  addQuestion(): void {
    if (this.fGroup.invalid) {
      return;
    }
    const v: any = this.fGroup.getRawValue();
    const q: Question = {
      id: v.id || this.newId(),
      text: v.text,
      choices: { A: v.A, B: v.B, C: v.C, D: v.D },
    };

    const list = this.questions.slice();
    const idx = list.findIndex((x) => x.id === q.id);
    if (idx >= 0) {
      list[idx] = q;
    } else {
      list.push(q);
    }
    this.questions = list;
    this.resetForm();
  }

  edit(i: number): void {
    const q = this.questions[i];
    this.fGroup.setValue({
      id: q.id,
      text: q.text,
      A: q.choices.A,
      B: q.choices.B,
      C: q.choices.C,
      D: q.choices.D,
    });
    window.scrollTo(0, 0);
  }

  remove(i: number): void {
    const list = this.questions.slice();
    const removed = list.splice(i, 1)[0];
    this.questions = list;
  }
  
  
}
