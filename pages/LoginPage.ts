import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Utilizing the new best-practice role/label helpers directly from BasePage
  private readonly emailInput = this.getByLabel('Email');
  private readonly passwordInput = this.getByLabel('Password');
  private readonly loginButton = this.getByRole('button', { name: 'Sign In' });
  
  // Utilizing the escape hatch for a raw selector element if needed
  private readonly alternativeFlash = this.locator('#flash'); 



 // Opens the login page of the application.
 // This method wraps the navigation logic, making tests highly readable.
 // 1. 'async' defines this as an asynchronous method that returns a Promise.
  //    Web navigation takes time, so JavaScript must handle it asynchronously.
  
  // 2. '(): Promise<void>' is the TypeScript return type. 
  //    It states that once this async task finishes, it returns absolutely no data ('void').


async open(): Promise<void> {
    await this.navigate('/login');
  } 
  
  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}