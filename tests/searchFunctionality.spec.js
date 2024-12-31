import { test, chromium } from '@playwright/test';
import HomePage from '../support/pageObjectModel/pages/HomePage';
import SearchPage from '../support/pageObjectModel/pages/SearchPage';

test.describe('Validate if search functionality of the site', () => {
    let browser;
    let page;
    let homePage;
    let searchPage;
    const teamName = 'Liverpool';

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });

    test.beforeEach(async () => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);

        // Adding the cookie value for gdpr to get rid of the gdpr cookie pop up
        await homePage.setGdprCookie();

        // Navigating to the website and validating the successful landing on the homepage
        await homePage.navigateToSite();
        await homePage.validateNavigationToSite();
    });

    test('Validate if searching for a team shows correct results', async ({
        page,
    }) => {
        // Ensure search button is visible and perform a search
        await homePage.clickSearchButton();

        // Wait for the search container and validate that it is open
        await searchPage.validatingSearchContainerOpening();

        // Input teamName of your choice into the search input
        await searchPage.typeTextInSearchBox(teamName);

        // Validate that "Liverpool" is present in the match container
        await searchPage.validateSearchTextAndOddsButtons(teamName);
    });
});
