import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: [['dot'], ['line'], ['html'], ['allure-playwright']],
    use: {
        baseURL: 'https://epicbet.com/',
        browserName: 'chromium',
        trace: 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
