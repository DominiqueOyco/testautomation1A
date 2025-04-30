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
        await page.getByPlaceholder('Username').fill('aaaaa')
        await page.getByPlaceholder('Password').fill('aaaaa')
        await page.getByRole('button').click();
        await page.waitForTimeout(500)
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })
})

//todo: add login validation before each tests in the products page
test.describe('products page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/index.html');
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button').click();
    });

    test('Verify swaglabs logo is visible at the top center of the products page', async ({ page }) => {
        await page.getByRole('img', { name: 'Swag Labs' }).isVisible()
    })

    test('Verify user is able to sort the products by name on ascending order', async ({ page }) => {
        //uses the id or class that contains the dropdown and selects the name (label) of the option
        await page.locator('.product_sort_container').selectOption({ label: 'Name (A to Z)' })
    })

    test('Verify user is able to sort the products by name on descending order', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption({ label: 'Name (Z to A)' })
    })

    test('Verify user is able to sort the products by price on ascending order', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption({ label: 'Price (low to high)' })
    })

    test('Verify user is able to sort the products by price on descending order', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption({ label: 'Price (high to low)' })
    })

    test('Verify user is able to add products to their cart', async ({ page }) => {
        //nth is used to select element with same name or class
        //nth=0 is the first element, nth=1 is the second element, nth=-1 is the last element
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=0').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=1').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=-1').click();
    })

    test('Verify clicking cart icon shows the items that the user added to the cart', async ({ page }) => {
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=0').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=1').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=-1').click();
    })

    test('Verify user is able to remove products from their cart by pressing the remove CTA', async ({ page }) => {
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=0').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=1').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=-1').click();
        await page.getByRole('button', { name: 'REMOVE' }).locator('nth=0').click();
        await page.getByRole('button', { name: 'REMOVE' }).locator('nth=-1').click();
    })

    test('Verify user is able to remove products from their cart by pressing the remove CTA on the cart page', async ({ page }) => {
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=0').click();
        await page.getByRole('button', { name: 'ADD TO CART' }).locator('nth=1').click();
        await page.locator('.shopping_cart_container').click();
        await page.getByRole('button', { name: 'REMOVE' }).locator('nth=0').click();
    })

    test('Verify user is able to logout', async ({ page }) => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page.url()).toBe('https://www.saucedemo.com/v1/index.html')
    })
})