import { defineConfig, devices } from '@playwright/test';

/**
 * Konfiguracja Playwright pod kątem CI/CD i lokalnego developmentu.
 */
export default defineConfig({
  testDir: './tests',
  /* Uruchamianie testów równolegle */
  fullyParallel: true,
  /* Zapobieganie przypadkowemu użyciu test.only na CI */
  forbidOnly: !!process.env.CI,
  /* Retry na CI dla stabilności (flaky tests) */
  retries: process.env.CI ? 2 : 0,
  /* Ograniczenie liczby workerów na CI, aby nie przeciążyć serwera */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reportery: list do konsoli, HTML do analizy, JUnit dla systemów CI (Jenkins/Azure) */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }]
  ],
  
  use: {
    /* Bazowy URL pobierany ze zmiennej środowiskowej lub domyślny lokalny */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Zbieranie artefaktów tylko w przypadku awarii (optymalizacja dla CI) */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Konfiguracja przeglądarek */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Opcjonalnie: uruchomienie serwera lokalnego przed testami */
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});