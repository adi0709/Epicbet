import { test as base } from '@playwright/test';
import HomePage from './pageObjectModel/pages/HomePage';
import SearchPage from './pageObjectModel/pages/SearchPage';

export const test = base.extend({
    homePage: async ({ page, context }, use) => {
        const homePage = new HomePage(page, context);
        await use(homePage);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
});

export { expect } from '@playwright/test';
