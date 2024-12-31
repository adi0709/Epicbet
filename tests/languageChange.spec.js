import { test } from '../support/base.fixture';
import BaseTest from './baseTest';
const languages = require('../resources/jsonFiles/langaugeMenu.json');

test.describe('Validate if the language change functionality works', () => {
    test.beforeEach(async ({ homePage }) => {
        const baseTest = new BaseTest();
        await baseTest.setup(homePage);
    });

    test('Validate the language menu items', async ({ homePage }) => {
        // Validating the language change menu has all the options
        await homePage.validateLanguageMenu();
    });

    test('Validate changing of language of the website', async ({
        homePage,
    }) => {
        // Validating the language change functionality works for all the options available
        for (const language of languages) {
            await homePage.changeLanguage(language.key);
            await homePage.validatingLanguageChange(
                language.key,
                language.url,
                language.loginText,
                language.signUpText
            );
        }
    });
});
