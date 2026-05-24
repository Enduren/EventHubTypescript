import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  // Locators
  readonly dashboardHeader: Locator = this.locator('text=Amazing Events');
}