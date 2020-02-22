import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: []
})

export class TodoListComponent implements OnInit {
    // not yet filtered, but naming them as such
    public serverFilteredTodos: Todo[];
    public filteredTodos: Todo[];

    public todoOwner: string;
    public todoCategory: string;
    public todoStatus: boolean;
    public todoDescription: string;

    constructor(private todoService: TodoService) {

    }

    // this will start an asynchronous operation that updates the todos list later
    ngOnInit(): void {

    }
}