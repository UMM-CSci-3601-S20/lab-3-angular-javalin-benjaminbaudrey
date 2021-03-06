import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      category: 'homework',
      status: true,
      body: 'lab 3'
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      category: 'groceries',
      status: false,
      body: 'eggs'
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      category: 'video games',
      status: true,
      body: 'minecraft'
    }
  ];
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with filter parameter \'body\'', () => {

    todoService.getTodos({ body: 'ipsum' }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('body')
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('body')).toContain('ipsum');

    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with filter parameter\'status\'', () => {

    todoService.getTodos({ status: true }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('status')).toContain('true');

    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with filter parameter\'limit\'', () => {

    todoService.getTodos({ limit: 20 }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('limit')
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('limit').length).toBeLessThanOrEqual(20);

    req.flush(testTodos);
  });

  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(3);
    const todoOwner = 'Chris';
    expect(todoService.filterTodos(testTodos, { owner: todoOwner }).length).toBe(1);
  });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(3);
    const todoCategory = 'groceries';
    expect(todoService.filterTodos(testTodos, { category: todoCategory }).length).toBe(1);
  });

  it('filterTodos() filters by body', () => {
    expect(testTodos.length).toBe(3);
    const todoBody = 'minecraft';
    expect(todoService.filterTodos(testTodos, { body: todoBody }).length).toBe(1);
  });

});
