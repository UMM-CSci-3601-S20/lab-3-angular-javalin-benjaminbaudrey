import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    readonly todoUrl: string = environment.API_URL + 'todos';

    constructor(private httpClient: HttpClient) {

    }
    getTodos(): Observable<Todo[]> {
        return this.httpClient.get<Todo[]>(this.todoUrl);
    }
    // does not filter yet. placeholder function
    filterTodos(todos: Todo[]): Todo[] {
        let filteredTodos = todos;
        return filteredTodos;
    }
}
