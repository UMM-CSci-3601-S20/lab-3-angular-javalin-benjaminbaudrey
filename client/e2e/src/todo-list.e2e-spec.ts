import { TodoPage } from './todo-list.po';
import { browser, protractor, by, element, promise } from 'protractor';

describe('Todo List', () => {
    let page: TodoPage;
    // before the tests, we need to make our todos page
    beforeEach(() => {
        page = new TodoPage();
        page.navigateTo();
    });
    // our todos page should be called todos
    it('Should have the correct title', () => {
        expect(page.getTodoTitle()).toEqual('Todos');
    });
    // it should have some todo cards displayed
    // expecting getTodoCards to be an array
    it('Should have all the todo cards displayed', () => {
        expect(page.getTodoCards().count()).toBeGreaterThan(0);
    });
    // it should display only todos that match a given filter
    it('Should type Blanche in the owner filter and check that it returned the correct todos', () => {
        page.typeInput('todo-owner-input', 'Blanche');

        // should only see todos from Blanche
        page.getTodoCards().each(e => {
            expect(e.element(by.className('todo-card-owner')).getText()).toEqual('Blanche'); // also tested against wrong failed as expected
        });
    });

    it('Should type a partial owner into the owner filter and check that the correct elements were returned', () => {
        page.typeInput('todo-owner-input', 'b');
        // grab all the owners from the todo-card-owner class and convert it to text
        let owners = page.getTodoCards().map(e => e.element(by.className('todo-card-owner')).getText());
        // we should see these owners
        expect(owners).toContain('Barry');
        expect(owners).toContain('Blanche');
        expect(owners).toContain('Roberta');
        // we should not see these
        expect(owners).not.toContain('Fry');
        expect(owners).not.toContain('Workman');
        expect(owners).not.toContain('Dawn');

    });
    // category testing

    it('Should type Blanche in the owner filter and check that it returned the correct todos', () => {
        page.typeInput('todo-category-input', 'video games');

        // should only see todos from Blanche
        page.getTodoCards().each(e => {
            expect(e.element(by.className('todo-card-category')).getText()).toEqual('video games');
        });
    });

    it('Should type d into the category filter and check that the correct elements were returned', () => {
        page.typeInput('todo-category-input', 'd');

        let categories = page.getTodoCards().map(e => e.element(by.className('todo-card-category')).getText());

        expect(categories).toContain('video games');
        expect(categories).toContain('software design');

        expect(categories).not.toContain('homework');
        expect(categories).not.toContain('groceries');

    });

    it('Should type ipsum into the body filter and check that the correct number of elements were returned', () => {
        page.typeInput('todo-body-input', 'Ipsum');
        expect(page.getTodoCards().count()).toEqual(71);
    });

    it('Should select a status and check that it returned the correct todos', () => {
        page.selectMatSelectValue('todo-status-select', 'complete');

        page.getTodoCards().each(e => {
            expect(e.element(by.className('todo-card-status')).getText()).toEqual('true');
        });
    });
});

