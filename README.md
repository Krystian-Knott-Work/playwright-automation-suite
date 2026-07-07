# Playwright Automation Suite 🎭

[![Playwright Tests](https://github.com/Krystian-Knott-Work/playwright-automation-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/Krystian-Knott-Work/playwright-automation-suite/actions)

## 📌 Overview
This repository contains a robust, scalable, and fully automated web UI testing framework built with **Playwright** and **TypeScript**. It serves as a comprehensive showcase of modern Quality Assurance engineering practices, focusing on maintainability, speed, and reliability. 

The framework currently tests the [SauceDemo](https://www.saucedemo.com/) web application, covering complex scenarios including authentication flows, session management, and dynamic product sorting.

## 🏗️ Architecture & Best Practices

* **Page Object Model (POM):** Strict separation of test logic and page interactions. Locators and methods are encapsulated within dedicated classes (`LoginPage`, `ProductPage`).
* **Data-Driven Testing (DDT):** Test parameterization is implemented to efficiently run scenarios across multiple data sets (e.g., verifying multiple sorting options and problem user accounts) without code duplication.
* **Modern Locators:** Heavy utilization of user-facing locators (`getByRole`, `getByText`, `getByPlaceholder`) to ensure tests are resilient and accessible.
* **Continuous Integration (CI/CD):** Fully integrated with **GitHub Actions**. Tests are automatically triggered on every push to the repository, ensuring continuous quality feedback.

## 💻 Tech Stack
* **Test Runner / Framework:** Playwright Test
* **Language:** TypeScript
* **CI/CD:** GitHub Actions
* **Version Control:** Git

## 📂 Project Structure
```text
├── .github/workflows/   # CI/CD pipelines (GitHub Actions)
├── pages/               # Page Object Model classes (e.g., login.page.ts)
├── tests/               # Test spec files (e.g., login.spec.ts, products.spec.ts)
├── playwright.config.ts # Playwright configuration and global settings
└── package.json         # Project dependencies and npm scripts

## ⚙️ CI/CD & Automation
This project is equipped with a fully automated **CI/CD pipeline** using **GitHub Actions**. 

* **Automated Execution:** Every push to the `main` branch triggers the full test suite across multiple browsers (Chromium, Firefox, WebKit).
* **Test Reporting:** Allure reports are automatically generated and archived after every CI run, ensuring full traceability and visibility into test results.
* **Badges:** The build status badge at the top of this file provides real-time feedback on the project's health.