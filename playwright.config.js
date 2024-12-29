import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [["dot"], ["line"], ["allure-playwright"]],
  use: {
    baseURL: 'https://epicbet.com/',
    browserName: 'chromium',
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure'
  }
});
