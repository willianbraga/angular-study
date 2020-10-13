import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mode = 'list';
  public title: String = "Minhas Tarefas";
  public todos: Todo[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  removeTodo(todo: Todo) {

    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo) {

    todo.done = true;
    this.save();
  }

  markAsUndone(todo) {

    todo.done = false;
    this.save();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(title, false, id));
    this.save();
    this.clear();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  clear() {
    this.form.reset();
  }

  load() {
    this.todos = JSON.parse(localStorage.getItem('todos'));
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
