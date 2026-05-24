import { test, expect } from '../fixtures/app.fixture';

test.describe('EventHub Authentication E2E Pipeline', () => {

  test('Authentication via configuration JSON payload', async ({ loginPage, dashboardPage, jsonData }) => {
    // Using property keys matching the structure of your JSON file
    await loginPage.open();
    await loginPage.login(jsonData.username, jsonData.password);
    
    // Assert successful landing
    await expect(dashboardPage.dashboardHeader).toBeVisible();
  });

  test('Authentication via external Excel spreadsheet record', async ({ loginPage, dashboardPage, excelData }) => {
    await loginPage.open();
    
    // Using property keys matching the column headers defined in your Excel file
    await loginPage.login(excelData.Email, excelData.Password);
    
    // Assert successful landing
    await expect(dashboardPage.dashboardHeader).toBeVisible();
  });

});