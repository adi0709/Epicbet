const {expect} = require("@playwright/test");

class SearchPage {
    constructor(page) {
        this.page = page;

        // Defining selectors
        this.searchContainer = page.locator('[data-testid="search-container"]')
        this.searchContainerText = this.searchContainer.getByText('Epic Search')
        this.searchInput = this.searchContainer.locator('[data-testid="search-input"]')
        this.matchContainer = this.searchContainer.locator('[data-testid="match-container"]')
        this.getOddsContainer = (currentMatchContainer) => currentMatchContainer.locator('[data-market-name="1x2"]');
        this.getOutcomeButton = (currentOddsContainer) => currentOddsContainer.locator('[data-testid="outcome-button"]');

    }

    // Defining Methods
    async validatingSearchContainerOpening() {
        await this.searchContainer.waitFor();
        await this.searchContainerText.isVisible();
    }

    async typeTextInSearchBox(text) {
        const searchInput = this.searchInput
        await searchInput.isVisible();
        await searchInput.pressSequentially(text, {delay: 500});
    }

    async validateSearchTextAndOddsButtons(text) {
        const matchContainer = this.matchContainer
        const matchCount = await matchContainer.count();
        if (matchCount >= 1) {
            for (let i = 0; i < matchCount; i++) {
                const currentMatchContainer = matchContainer.nth(i)
                // Validating the text is present in the displayed match containers
                await expect(currentMatchContainer).toContainText(new RegExp(text, 'i'),{message: `Validating each match container to have the searched ${text}`})

                // Get the odds container for the current match
                const currentOddsContainer = this.getOddsContainer(currentMatchContainer);
                await currentOddsContainer.isVisible();

                // Validate outcome buttons within the current odds container
                const currentOutcomeButton = this.getOutcomeButton(currentOddsContainer);
                await expect(currentOutcomeButton).toHaveCount(3, {message: "Validating each match to have 3 odds selection buttons"});
            }
        }
    }
}

module.exports = SearchPage;
