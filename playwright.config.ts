import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // all tests
  globalTimeout: 5 * 60 * 1000,
  // single test
  timeout: 2 * 60 * 1000,
  // assertion
  expect: { timeout: 15000 },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.demoblaze.com/index.html',
    // page navigation (page.goto)
    navigationTimeout: 30 * 1000,
    // actions (locator.click, etc)
    actionTimeout: 15 * 1000,
    viewport: {
      width: 1920,
      height: 1080,
    },
    // screenshot: 'only-on-failure',
    screenshot: 'on',
    video: {
      // mode: 'retain-on-failure',
      mode: 'retain-on-failure',
      size: {
        width: 1920,
        height: 1080,
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});
