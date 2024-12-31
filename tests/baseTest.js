class BaseTest {
    async setup(homePage) {
        // Set GDPR cookie and navigate to the site
        await homePage.setGdprCookie();
        await homePage.navigateToSite();
        await homePage.validateNavigationToSite();
    }
}

module.exports = BaseTest;
