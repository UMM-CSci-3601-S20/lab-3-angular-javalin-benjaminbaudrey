import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoCardComponent } from './todo-card.component';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: any[] = [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    BrowserAnimationsModule,
    RouterTestingModule,
];

describe('Todo list', () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [COMMON_IMPORTS],
            declarations: [TodoListComponent, TodoCardComponent],
            // providers:    [ TodoService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{ provide: TodoService, useValue: new MockTodoService() }]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    // testing basic functionality
    it('contains all the todos', () => {
        expect(todoList.serverFilteredTodos.length).toEqual(3);
    });

    it('contains a todo with owner \'Chris\'', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Chris')).toBe(true);
    });

    it('contains a todo with owner \'Pat\'', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Pat')).toBe(true);
    });

    it('contains a todo with owner \'Jamie\'', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Jamie')).toBe(true);
    });
    // testing owner filter
    it('has 1 todo with Jamie as the owner', () => {
        expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.owner === 'Jamie').length).toBe(1);
    });
    it('has no todos with Blanche as the owner', () => {
        expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.owner === 'Blanche').length).toBe(0);
    });
    // testing category filter
    it('has 1 todo with homework as the category', () => {
        expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.category === 'homework').length).toBe(1);
    });
    it('has no todos with minecraft as the category', () => {
        expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.category === 'minecraft').length).toBe(0);
    });

});

describe('Misbehaving Todo List', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoServiceStub: {
        getTodos: () => Observable<Todo[]>;
        getTodosFiltered: () => Observable<Todo[]>;
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoServiceStub = {
            getTodos: () => new Observable(observer => {
                observer.error('Error-prone observable');
            }),
            getTodosFiltered: () => new Observable(observer => {
                observer.error('Error-prone observable');
            })
        };

        TestBed.configureTestingModule({
            imports: [COMMON_IMPORTS],
            declarations: [TodoListComponent],
            // providers:    [ TodoService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{ provide: TodoService, useValue: todoServiceStub }]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('generates an error if we don\'t set up a TodoListService', () => {
        // Since the observer throws an error, we don't expect todos to be defined.
        expect(todoList.serverFilteredTodos).toBeUndefined();
    });
});
