import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo List', () => {
    let page: TodoPage;
    //before the tests, we need to make our todos page
    beforeEach(() => {
        page = new TodoPage();
        page.navigateTo();
    });
    //our todos page should be called todos
    it('Should have the correct title', () => {
        expect(page.getTodoTitle()).toEqual('Todos');
    });
    //it should have some todo cards displayed
    //expecting getTodoCards to be an array
    it('Should have all the todo cards displayed', () => {
        expect(page.getTodoCards().length > 0);
    });

});
