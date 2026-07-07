import { test, expect } from '../fixtures/app.fixture';

test.describe('EventHub Event Handling E2E Pipeline', () => {

    test.beforeEach(async ({ page,loginPage, dashboardPage,excelData }) => {
        //login to the application before each test
        await loginPage.open();
    
        // Using property keys matching the column headers defined in your Excel file
        await loginPage.login(excelData.Email, excelData.Password);
        
        // Assert successful landing
        await expect(dashboardPage.dashboardHeader).toBeVisible();
        
    })

    test('Event Hub e2e', async ({ page }) => {

        await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
        
    })
    
    

 
});