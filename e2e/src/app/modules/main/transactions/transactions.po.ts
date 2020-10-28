import { by, element, ElementFinder } from "protractor";
import { AppPage } from "../../../../app.po";

export class TransactionsPage extends AppPage {
    async getTransactionDates(): Promise<Date[]> {
        const datesArray: Date[] = [];
        await element.all(by.tagName('tr')).then((outerFinderArray: ElementFinder[]) => {
            outerFinderArray.slice(1, outerFinderArray.length).forEach((outerFinder: ElementFinder) => {
                outerFinder.all(by.tagName('td')).then((innerFinderArray: ElementFinder[]) => {
                    innerFinderArray[1].getText().then((dateText: string) => {
                        const dateParts = dateText.split('-');
                        datesArray.push(new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10))
                        );
                    });
                });
            });
        });
        return datesArray;
    }
}
