import {test, expect} from '@playwright/test';

test.describe ('Nawigacja i weryfikacja podstawowych elementow', () => {

  test('Weryfikacja tytulu i przejscia do dokumentacji', async({page}) =>{

    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

    const getStartedButton = page.getByRole('link', {name: 'Get started'});

    await getStartedButton.click();

    await expect(page).toHaveURL(/.*intro/);

    const heading = page.getByRole('heading', {name: 'Installation'});

    await expect(heading).toBeVisible();
  })
})