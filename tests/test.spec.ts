import { test } from '@playwright/test';
import * as crypto from 'crypto';

test('basic navigation', async ({ page, isMobile }) => {
  await page.goto('/');

  if (isMobile) await page.getByRole('banner').locator('svg').click();
  await page.getByRole('banner').getByRole('link', { name: 'Розклад' }).click();
  await page.waitForURL('/schedule-importer', { timeout: 15000 });

  await page
    .getByRole('banner')
    .getByRole('link', { name: "Cтудентські об'єднання" })
    .click();
  await page.waitForURL('/clubs', { timeout: 15000 });

  await page.getByRole('banner').getByRole('link', { name: 'FAQ' }).click();
  await page.waitForURL('/faq', { timeout: 15000 });

  await page.getByRole('link', { name: 'Політика конфіденційності' }).click();
  await page.waitForURL('/privacy', { timeout: 15000 });

  await page.getByRole('button', { name: 'Увійти' }).click();
  await page.waitForURL('/login', { timeout: 15000 });

  if (isMobile)
    await page.getByRole('link', { name: 'Зареєструватися' }).click();
  else await page.getByRole('button', { name: 'Зареєструватися' }).click();

  await page.waitForURL('/register', { timeout: 15000 });
  await page.waitForSelector('button[type="submit"]');
  await page.getByRole('link', { name: 'logo' }).click();

  await page.waitForURL('/', { timeout: 15000 });
});

test('auth flow', async ({ page }) => {
  const email = `${crypto.randomUUID()}@test.com`;
  const firstName = 'John';
  const lastName = 'Doe';
  const password = `Abcdefg123_`;

  await page.goto('/register', { timeout: 15000 });
  await page.waitForSelector('input[type="email"]');
  await page.getByRole('textbox', { name: 'Пошта' }).fill(email);
  await page.getByRole('textbox', { name: 'Прізвище' }).fill(lastName);
  await page.getByRole('textbox', { name: "Ім'я" }).fill(firstName);

  await page
    .getByRole('textbox', { name: 'Пароль', exact: true })
    .fill(password);
  await page
    .getByRole('textbox', { name: 'Підтвердіть пароль' })
    .fill(password);

  await page.getByText('Оберіть факультет').click();
  await page.waitForSelector('div[data-radix-popper-content-wrapper]');
  await page.getByPlaceholder('Пошук').fill('ІПСА');
  await page.getByRole('option').click();

  await page.getByText('Оберіть групу').click();
  await page.waitForTimeout(100);
  await page.waitForSelector('div[data-radix-popper-content-wrapper]');
  await page.getByPlaceholder('Пошук').fill('КН-42');
  await page.getByRole('option').click();

  await page
    .getByRole('checkbox', { name: 'Даю згоду на обробку персональних даних' })
    .check();
  await page.getByRole('button', { name: 'Зареєструватися' }).click();

  await page.waitForURL('/', { timeout: 15000 });
  await page.getByText('Ви успішно зареєструвалися', { exact: true }).waitFor();

  await page.goto('/login', { timeout: 15000 });
  await page.waitForSelector('input[type="email"]');
  await page.getByRole('textbox', { name: 'Пошта' }).fill(email);
  await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  await page.getByRole('button', { name: 'Увійти' }).click();

  await page.waitForURL('/profile', { timeout: 15000 });
  await page.getByRole('button', { name: 'Видалити акаунт' }).click();
  await page.getByRole('button', { name: 'Видалити' }).click();

  await page.waitForURL('/login', { timeout: 15000 });
});
