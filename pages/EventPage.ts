import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class EventPage extends BasePage {

    //event page locators
    readonly eventHeader : Locator = this.locator('h1:has-text("Upcoming Events")')

}