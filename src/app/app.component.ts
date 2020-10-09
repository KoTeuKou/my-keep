import {Component, OnDestroy, OnInit} from '@angular/core';
import {INote, Note} from './note-model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  notes: INote[];
  title = 'my-keep';
  form: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.httpClient.get<Note[]>('/api/notes').subscribe(value => {
      this.notes = value;
    });

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
      this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  private createFromForm(): INote {
    return {
      ...new Note(),
      id: this.form.get(['id']).value,
      title: this.form.get(['title']).value,
      text: this.form.get(['text']).value
    };
  }

  saveNote(): void {
    const iNote = this.createFromForm();
    this.httpClient.post<number>('/api/add', {
      title: iNote.title,
      text: iNote.text
    }).subscribe(value => {
      console.log(value);
      iNote.id = value; });
    this.notes.push(iNote);
  }

  deleteNote(): void {
    const updatingNote = this.createFromForm();
    const id = updatingNote.id;
    const index = this.notes.findIndex(value => value.id === id);
    this.notes.splice(index, 1);
    this.httpClient.delete('/api/delete/' + id).subscribe(() => {});
  }

  update(): void {
    const updatingNote = this.createFromForm();
    const iNote = this.notes.find(value => value.id === updatingNote.id);
    iNote.title = updatingNote.title;
    iNote.text = updatingNote.text;
    this.httpClient.put<Note>('/api/update', {
      id: iNote.id,
      title: updatingNote.title,
      text: updatingNote.text
    }).subscribe(() => {});
  }

  fillForm(note: INote): void {
    if (note === null) {
      this.form.reset();
    } else {
      this.form = this.fb.group({
        id: note.id,
        title: note.title,
        text: note.text
      });
    }
  }

}
