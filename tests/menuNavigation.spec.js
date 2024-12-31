import {test, chromium} from '@playwright/test';
import HomePage from "../support/pageObjectModel/pages/HomePage";
const navigationMenu = require("../resources/jsonFiles/navigationMenu.json");
const languages = require("../resources/jsonFiles/langaugeMenu.json");

test.describe('Validate if navigating to different items in the navigation menu works', () => {
    // Creating a variable homePage which will be used to assign an instance of HomePage class
    let browser;
    let page;
    let homePage;
    const englishLanguageValues = languages[0]

    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        homePage = new HomePage(page);
    });

    test.beforeEach(async () => {
        // Adding the cookie value for gdpr to get rid of the gdpr cookie pop up
        await homePage.setGdprCookie();

        // Navigating to the website and validating the successful landing on the homepage
        await homePage.navigateToSite();
        await homePage.validateNavigationToSite();
        await homePage.changeLanguage(englishLanguageValues.key, englishLanguageValues.url, englishLanguageValues.loginText, englishLanguageValues.signUpText)
    });

    test('Validate if all the items in the navigation are present', async () => {
        // Validating the navigation menu has all the options available
        for (const menuOption of navigationMenu) {
            await homePage.validatingMenuItem(menuOption.testId, menuOption.text)
        }
    })

    test('Validate if all the items in the navigation can be visited', async () => {
        // Validating the navigation menu has all the options available
        for (const menuOption of navigationMenu) {
            await homePage.visitingNavigationMenuItem(menuOption.testId)
            await homePage.validatingVisitingNavigationMenuItem(menuOption.url)
        }
    })

})

