import {chromium, test} from '@playwright/test';
import HomePage from "../pages/homePage";

const languages = require("../resources/jsonFiles/langaugeMenu.json");

test.describe('Validate if the language change functionality works', () => {
    let browser;
    let page;
    let homePage;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        homePage = new HomePage(page);
    });

    test.beforeEach(async ({page, context}) => {
        // Adding the cookie value for gdpr to get rid of the gdpr cookie pop up
        await homePage.setGdprCookie();

        // Navigating to the website and validating the successful landing on the homepage
        await homePage.navigateToSite();
        await homePage.validateNavigationToSite();
    });

    test('Validate the language menu items', async () => {
        // Validating the language change menu has all the options
        await homePage.validateLanguageMenu()
    })

    test('Validate changing of language of the website', async () => {

        // Validating the language change functionality works for all the options available
        for (const language of languages) {
            await homePage.changeLanguage(language.key);
            await homePage.validatingLanguageChange(language.key, language.url, language.loginText, language.signUpText)
        }

    });
})

