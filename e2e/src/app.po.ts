import { browser } from 'protractor';

export class AppPage {
  navigateTo(url?: string): Promise<unknown> {
    return browser.get(url || browser.baseUrl) as Promise<unknown>;
  }
}
