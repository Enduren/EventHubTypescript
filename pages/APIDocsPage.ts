import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class ApiDocsPage extends BasePage {

    // Locators
      readonly dashboardHeader: Locator = this.locator('text=Amazing Events');

}