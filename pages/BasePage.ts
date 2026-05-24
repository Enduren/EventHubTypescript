import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path: string = ''): Promise<void> {
    // Clean up the path: if it starts with a '/', remove it so we don't duplicate slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Playwright automatically joins this with the baseURL from playwright.config.ts
    await this.page.goto(cleanPath);
  }
  
  // 1. Kept as a fallback/escape hatch for IDs and CSS (e.g., '#flash', 'form#checkboxes')
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // 2. NEW: Added best-practice shortcuts that your Page Objects can inherit!
  getByRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role, options);
  }

  getByLabel(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(text, options);
  }

  getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }
}