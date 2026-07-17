import { BasePage } from './BasePage';

export class MyBookingsPage extends BasePage {
    //define selectors
    readonly dashboardHeader = this.locator('text=My Bookings');


}