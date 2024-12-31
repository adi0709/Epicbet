import { test } from '../support/base.fixture';
import BaseTest from './baseTest';

test.describe('Validate if search functionality of the site', () => {
    const teamName = 'Liverpool';

    test.beforeEach(async ({ homePage }) => {
        const baseTest = new BaseTest();
        await baseTest.setup(homePage);
    });

    test('Validate if searching for a team shows correct results', async ({
        homePage,
        searchPage,
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
