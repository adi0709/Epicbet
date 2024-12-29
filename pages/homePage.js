const {expect} = require("@playwright/test");
const languages = require("../resources/jsonFiles/langaugeMenu.json");
const gdprCookieData = require("../resources/jsonFiles/gdprCookie.json");

class HomePage {
    constructor(page, context) {
        this.page = page;
        this.context = context;

        // Defining selectors
        this.languageButton = page.locator('[data-testid="language-button"]');
        this.languageMenuItem = page.locator('[data-testid="language-menu"] > div');
        this.loginButton = page.locator('[data-testid="login-button"]');
        this.signUpButton = page.locator('[data-testid="signup-button"]');
        this.menuButton = page.locator('[data-testid="menu-button"]');

        // Define expected language items for validation
        this.expectedLanguages = languages;

    }

    // Defining Dynamic Selectors
    getNavigationSelectors(menuId){
        return this.page.locator(`[data-testkey="${menuId}"]`);
    }

    getLanguageSelectors(languageCode){
        return this.page.locator(`[data-testkey="${languageCode}"]`)
    }


    // Creating Actions using the above selectors
    async setGdprCookie() {
        await this.page.context().addCookies([
            gdprCookieData
        ]);
    }

    async navigateToSite() {
        await this.page.goto('/');
    }

    async validateNavigationToSite(){
        await expect(this.page).toHaveTitle(/Epicbet/);
        await this.loginButton.isVisible();
        await this.signUpButton.isVisible();
        await this.menuButton.isVisible();
    }

    async validateLanguageMenuItems() {
        // Assert the number of menu items
        await expect(this.languageMenuItem).toHaveCount(this.expectedLanguages.length);

        // Validate each language menu item
        await Promise.all(
            this.expectedLanguages.map(async (item, index) => {
                const menuItem = this.languageMenuItem.nth(index);
                // Validating the key of the selectors
                await expect(menuItem).toHaveAttribute('data-testkey', item.key);

                // Validating the value of the selectors
                await expect(menuItem).toHaveText(item.text);
            })
        );
    }

    async validateLanguageMenu() {
        // Click the language button to display the menu
        await this.languageButton.click();

        // Validate the language menu
        await this.validateLanguageMenuItems();
    }

    async changeLanguage(languageCode) {
        // Click the language button to display the menu
        await this.languageButton.click();

        // Select and click the desired language option
        const languageOption = this.getLanguageSelectors(languageCode);
        if (!languageOption) {
            throw new Error(`Unsupported language code: ${languageCode}`);
        }

        // Clicking the language option
        await languageOption.click();
    }

    async validatingLanguageChange(languageCode, url, loginText, signUpText) {

        // Validating the Url to change as per the change in language
        await expect(this.page).toHaveURL(`${languageCode}/${url}`);

        await this.loginButton.isVisible();
        await expect(this.loginButton).toHaveText(loginText);

        await this.signUpButton.isVisible();
        await expect(this.signUpButton).toHaveText(signUpText);
    }

    async validatingMenuItem(menuId, menuText){
        const navigationItem = this.getNavigationSelectors(menuId)
        await navigationItem.isVisible();
        await expect(navigationItem).toHaveText(menuText);
    }

    async visitingNavigationMenuItem(menuId){
        await this.getNavigationSelectors(menuId).click();

    }

    async validatingVisitingNavigationMenuItem(url){
        await expect(this.page).toHaveURL(`${url}`)
    }
}

module.exports = HomePage;
