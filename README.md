# InPost Test Automation Framework

This is a test automation framework built using [Playwright](https://playwright.dev/), TypeScript, and several development tools such as ESLint and Prettier for linting and code formatting.

## Project Structure

 - **_elements/_**: Contains reusable UI element locators and components.
 - **_helpers/_**: Contains utility/helper functions to support the test scripts.
 - **_page-objects/_**: Implements the Page Object Model (POM) pattern, encapsulating page interaction logic.
 - **_tests/_**: Contains all test files, usually written in TypeScript.
 - **_.prettierrc.cjs_** # Prettier configuration (CommonJS format).
 - **_eslint.config.js_** # ESLint configuration (Flat Config format).
 - **_package.json_** # Node.js project dependencies and scripts.
 - **_playwright.config.ts_** # Playwright configuration.
 - **_README.md_** # Project documentation (this file).
 - **_yarn.lock_** # Lock file for yarn dependencies.

## Setup

### Prerequisites

- **Node.js** (v16.x or higher)
- **Yarn** (v1.x or higher)
- **Playwright** (installed via npm/yarn)

### Install Dependencies

To install all required dependencies for the project, run the following command:

```bash
yarn install
```
### Install Playwright Browsers

After installing dependencies, there is a need to install Playwright browsers:

```bash
npx playwright install
```
### Running Tests

To run all tests in headed mode (with the browser UI):

```bash
yarn test
```
### Linting and Formatting
ESLint
ESLint is used to enforce code style and catch errors. The ESLint configuration file is eslint.config.js.

To run the linter:
