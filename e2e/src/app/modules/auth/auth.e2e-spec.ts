import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from "../../../app.po";

describe('login page use cases', () => {
    let page = new AppPage();

    it('the system redirects to transaction list when the user tries to login with valid credentials', () => {
        page.navigateTo();
        element(by.id('user')).sendKeys('user');
        element(by.id('password')).sendKeys('pass');
        element(by.id('submitButton')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'home/transactions');
    });

    it('the system displays an error when the user tries to login with invalid credentials', () => {
        page.navigateTo();
        element(by.id('user')).sendKeys('incorrect_user');
        element(by.id('password')).sendKeys('incorrect_pass');
        element(by.id('submitButton')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
        element(by.id('alertsContainer')).all(by.tagName('div')).then((elementFinderArray: ElementFinder[]) => {
            expect(elementFinderArray.length === 1).toBeTruthy(); // alert message is displayed
        });
    });

    it('given a user who is not logged in, the system redirects to login page when he tries to access transactions screen', () => {
        page.navigateTo(browser.baseUrl + 'home/transactions');
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
