import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // 1. Enforce strict encapsulation by declaring locators as private properties
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly alternativeFlash: Locator;

  // 2. The constructor receives Playwright's Page object from the test file
  constructor(page: Page) {
    // 3. Pass 'page' up to initialize the inherited BasePage constructor
    super(page); 
    
    // 4. Safely instantiate user-facing locators using the inherited 'this.page' instance
    this.emailInput = this.page.getByLabel('Email');
    this.passwordInput = this.page.getByLabel('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Sign In' });
    this.alternativeFlash = this.page.locator('#flash');
  }

  /**
   * Opens the login page using the inherited relative path routing utility.
   */
  async open(): Promise<void> {
    await this.navigate('/login');
  } 
  
  /**
   * Executes a complete, atomic login business flow.
   * Keeps test scripts clean by wrapping multiple structural actions into a single method.
   */
  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}