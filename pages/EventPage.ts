import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class EventPage extends BasePage {

    //event page locators
    readonly eventHeader : Locator = this.locator('h1:has-text("Upcoming Events")')

    constructor(page: Page) {
    // 3. Pass 'page' up to initialize the inherited BasePage constructor
    super(page); 

        this.eventHeader = this.page.locator('h1:has-text("Upcoming Events")');

    }

    //verify event page header
    async verifyEventPageHeader(): Promise<void> {
        await this.eventHeader.waitFor({ state: 'visible' });
    }
}