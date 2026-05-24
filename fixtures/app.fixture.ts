import { test as base } from '@playwright/test';
// Fixed the directory paths (assuming standard structure '../pages/')
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

// 1. Types declaration
type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  jsonData: any;
  excelData: { Email: string; Password: string }; // Typed properly for excellent IntelliSense
};

export const test = base.extend<AppFixtures>({
  // Page Fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Data Fixture: Reads standard JSON directly
  // FIXED: Explicitly typed 'use' callback to satisfy strict 'noImplicitAny' rules
  jsonData: async ({}, use: (arg: any) => Promise<void>) => {
    const jsonPath = path.resolve(__dirname, '../data/credentials.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    await use(JSON.parse(rawData));
  },

  // Data Fixture: Reads and parses Excel using 'xlsx'
  // FIXED: Explicitly typed 'use' with your custom spreadsheet row structure
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