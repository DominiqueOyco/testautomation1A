import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
});

test.describe('login page', () => {
    test('Verify user is able to input username in the username field', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
    })

    test('Verify user is able to enter a hidden password in the password field', async ({ page }) => {
        await page.getByPlaceholder('Password').fill('secret_sauce')
    })

    test('Verify Login CTA transfers user to the products page when the username and password are valid', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button').click();
        await page.waitForTimeout(500)
        await expect(page.url()).toBe('https://www.saucedemo.com/v1/inventory.html')
    })

    test('Verify Login CTA does not transfer user to the main page when the username and password are invalid', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('aaaaa')
        await page.getByPlaceholder('Password').fill('aaaaa')
        await page.getByRole('button').click();
        await page.waitForTimeout(500)
        await expect(page.url()).toBe('https://www.saucedemo.com/v1/index.html')
    })

    test('Verify invalid credentials produces an error: Epic sadface: Username and password do not match any user in this service', async ({ page }) => {

    })
})

test.describe('products page', () => {
    test('Verify swaglabs logo is visible at the top center of the products page', async ({ page }) => {

    })

    test('Verify user is able to sort the products by name on ascending order', async ({ page }) => {

    })

    test('Verify user is able to sort the products by name on descending order', async ({ page }) => {

    })

    test('Verify user is able to sort the products by price on ascending order', async ({ page }) => {

    })

    test('Verify user is able to sort the products by price on descending order', async ({ page }) => {

    })

    test('Verify user is able to add products to their cart', async ({ page }) => {

    })

    test('Verify clicking cart icon shows the items that the user added to the cart', async ({ page }) => {

    })

    test('Verify user perform actions on the top left hamburger icon', async ({ page }) => {

    })
})