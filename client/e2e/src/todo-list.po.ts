import { browser, by, element, Key, ElementFinder } from 'protractor';

export class TodoPage {
    navigateTo() {
        return browser.get('/todos');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getTodoCards() {
        return element(by.className('todo-cards-container')).all(by.tagName('app-todo-card'));
    }

    getTodoTitle() {
        const title = element(by.className('todo-list-title')).getText();
        return title;
    }

    typeInput(inputId: string, text: string) {
        let input = element(by.id(inputId));
        input.click();
        input.sendKeys(text);
    }

    selectMatSelectValue(selectID: string, value: string) {
        let sel = element(by.id(selectID));
        return sel.click().then(() => {
          return element(by.css('mat-option[value="' + value + '"]')).click();
        });
      }
}
