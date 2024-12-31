import { test } from '../support/base.fixture';
import BaseTest from './baseTest';
const navigationMenu = require('../resources/jsonFiles/navigationMenu.json');
const languages = require('../resources/jsonFiles/langaugeMenu.json');

test.describe('Validate if navigating to different items in the navigation menu works', () => {
    const englishLanguageValues = languages[0];

    test.beforeEach(async ({ homePage }) => {
        const baseTest = new BaseTest();
        await baseTest.setup(homePage);

        // Navigating to the website and validating the successful landing on the homepage
        await homePage.navigateToSite();
        await homePage.validateNavigationToSite();
        await homePage.changeLanguage(
            englishLanguageValues.key,
            englishLanguageValues.url,
            englishLanguageValues.loginText,
            englishLanguageValues.signUpText
        );
    });

    test('Validate if all the items in the navigation are present', async ({
        homePage,
    }) => {
        // Validating the navigation menu has all the options available
        for (const menuOption of navigationMenu) {
            await homePage.validatingMenuItem(
                menuOption.testId,
                menuOption.text
            );
        }
    });

    test('Validate if all the items in the navigation can be visited', async ({
        homePage,
    }) => {
        // Validating the navigation menu has all the options available
        for (const menuOption of navigationMenu) {
            await homePage.visitingNavigationMenuItem(menuOption.testId);
            await homePage.validatingVisitingNavigationMenuItem(menuOption.url);
        }
    });
});
