import {Component, OnDestroy, OnInit} from '@angular/core';
import {INote, Note} from './note-model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  notes: INote[];
  title = 'my-keep';
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.notes = [new Note(1, 'Название1', 'Текст1'), new Note(2, 'Lel', 'EKE')];
  }

  private createFromForm(): INote {
    return {
      ...new Note(),
      id: null,
      tittle: this.form.get(['title']).value,
      text: this.form.get(['text']).value
    };
  }

  saveNote(): void {
    const iNote = this.createFromForm();
    this.notes.push(iNote);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.splice(this.notes.findIndex(value => value.id === id), 1);
  }
}
