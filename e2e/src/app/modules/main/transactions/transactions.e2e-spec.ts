import { by, element, ElementFinder } from "protractor";
import { TransactionsPage } from "./transactions.po";

describe('transactions page use cases', () => {
    let page = new TransactionsPage();

    beforeAll(() => {
        page.navigateTo();
        element(by.id('user')).sendKeys('user');
        element(by.id('password')).sendKeys('pass');
        element(by.id('submitButton')).click();
    });

    beforeEach(() => {
        element(by.id('description')).clear();
    });

    it('the system displays transactions sorted descending by date', async () => {
        page.getTransactionDates().then((transactionDates: Date[]) => {
            expect(transactionDates.every((value, index, array) => index == 0 || array[index - 1] >= value)).toBeTruthy();
        });
    });

    it('the system displays transactions sorted ascending by date when the user tries to sort by date', async () => {
        element.all(by.tagName('tr')).then((outerFinderArray: ElementFinder[]) => {
            outerFinderArray[0].all(by.tagName('th')).then((innerFinderArray: ElementFinder[]) => {
                innerFinderArray[1].element(by.tagName('span')).click();
            });
        });

        page.getTransactionDates().then((transactionDates: Date[]) => {
            expect(transactionDates.every((value, index, array) => index == 0 || array[index - 1] <= value)).toBeTruthy();
        });
    });

    it('the system displays an empty notification message when there are no transactions', () => {
        element(by.id('description')).sendKeys('non_existent_description');
        expect(element(by.id('description')).getAttribute('value')).toEqual('non_existent_description');
        element(by.id('alertsContainer')).all(by.tagName('div')).then((elementFinderArray: ElementFinder[]) => {
            expect(elementFinderArray.length === 1).toBeTruthy(); // alert message is displayed
        });
    });

    it('the system displays matching transactions when the user tries to search a transaction', () => {
        const searchKey = 'ut';
        element(by.id('description')).sendKeys(searchKey);
        element.all(by.tagName('tr')).then((outerFinderArray: ElementFinder[]) => {
            outerFinderArray.slice(1, outerFinderArray.length).forEach((outerFinder: ElementFinder) => {
                outerFinder.all(by.tagName('td')).then((innerFinderArray: ElementFinder[]) => {
                    innerFinderArray[4].getText().then((text: string) => {
                        expect(text).toContain(searchKey);
                    });
                });
            });
        });
    });
});

