import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { MyBookingsPage } from '../pages/MyBookings';
import { EventPage } from '../pages/EventPage';
import { ApiDocsPage } from '../pages/APIDocsPage';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

// Define the shape of our fixtures for strong typing and IntelliSense
type AppFixtures = {
  // LoginPage fixture for testing login functionalities
  loginPage: LoginPage;

  // DashboardPage fixture for testing dashboard functionalities
  dashboardPage: DashboardPage;

  // AdminPage fixture for testing admin functionalities
  adminPage : AdminPage;

  // ApiDocsPage fixture for testing API documentation functionalities
  apiDocsPage : ApiDocsPage;

  // EventPage fixture for testing event-related functionalities
  eventPage: EventPage;

  // MyBookingsPage fixture for testing user bookings
  myBookingsPage : MyBookingsPage;

  // JSON data fixture returns any valid JSON object
  jsonData: any;

  // Excel data fixture returns an object with Email and Password properties
  excelData: { Email: string; Password: string }; 
};

// Extend the base test with our custom fixtures
export const test = base.extend<AppFixtures>({
  // Page Fixtures
  // Each fixture initializes a page object and makes it available for tests
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  adminPage :async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  apiDocsPage:async ({ page }, use) => {
    await use(new ApiDocsPage(page));
  },
  eventPage:async ({ page }, use) => {
    await use(new EventPage(page));
  },
  myBookingsPage:async ({ page }, use) => {
    await use(new MyBookingsPage(page));
  },

  // Data Fixture: Reads standard JSON directly from the filesystem
  jsonData: async ({}, use: (arg: any) => Promise<void>) => {
    const jsonPath = path.resolve(__dirname, '../data/credentials.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    await use(JSON.parse(rawData));
  },

  // Data Fixture: Reads and parses Excel using 'xlsx'
  excelData: async ({}, use: (arg: { Email: string; Password: string }) => Promise<void>) => {
    const excelPath = path.resolve(__dirname, '../data/credentials.xlsx');
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Converts sheet rows into a clean array of objects: [{ Email: '...', Password: '...' }]
    const dataRows = XLSX.utils.sheet_to_json<{ Email: string; Password: string }>(worksheet);
    await use(dataRows[0]); // Returns the first data row object
  }
});

export { expect } from '@playwright/test';