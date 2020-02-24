import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?: { owner?: string, category?: string, status?: boolean, body?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.owner) {
        // if we get passed todo requested owner, update the httpParams to that owner
        httpParams = httpParams.set('owner', filters.owner);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  filterTodos(todos: Todo[], filters: { owner?: string, category?: string, status?: boolean, body?: string }): Todo[] {

    let filteredTodos = todos;

    // Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.owner.toLowerCase().indexOf(filters.owner) !== -1; // -1 is returned if index with substring not found
      });
    }

    return filteredTodos;
  }
}
