// tests/selenium/loginTest.js
// Create folder: tests/selenium/

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Legal Rights Portal - E2E Tests', function() {
    this.timeout(30000);
    let driver;
    const baseUrl = process.env.BASE_URL || 'http://localhost';

    before(async function() {
        // Configure Chrome options
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        // Connect to Selenium Hub
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .usingServer('http://selenium-hub:4444/wd/hub')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    describe('Home Page Tests', function() {
        it('should load home page successfully', async function() {
            await driver.get(baseUrl);
            const title = await driver.getTitle();
            assert.strictEqual(title, 'Legal Rights Portal');
        });

        it('should display all feature cards', async function() {
            await driver.get(baseUrl);
            const featureCards = await driver.findElements(By.className('feature-card'));
            assert.strictEqual(featureCards.length, 5);
        });

        it('should navigate to Legal Rights page', async function() {
            await driver.get(baseUrl);
            const legalRightsCard = await driver.findElement(By.xpath("//h3[contains(text(),'Legal Rights')]"));
            await legalRightsCard.click();
            await driver.wait(until.urlContains('/legal-rights'), 5000);
            const currentUrl = await driver.getCurrentUrl();
            assert(currentUrl.includes('/legal-rights'));
        });
    });

    describe('Login Tests', function() {
        it('should show login form', async function() {
            await driver.get(`${baseUrl}/login`);
            const emailInput = await driver.findElement(By.css('input[type="email"]'));
            const passwordInput = await driver.findElement(By.css('input[type="password"]'));
            const submitButton = await driver.findElement(By.css('button[type="submit"]'));
            
            assert(emailInput);
            assert(passwordInput);
            assert(submitButton);
        });

        it('should show validation for empty fields', async function() {
            await driver.get(`${baseUrl}/login`);
            const submitButton = await driver.findElement(By.css('button[type="submit"]'));
            await submitButton.click();
            
            // Check if browser validation appears
            const emailInput = await driver.findElement(By.css('input[type="email"]'));
            const isValid = await driver.executeScript('return arguments[0].checkValidity();', emailInput);
            assert.strictEqual(isValid, false);
        });

        it('should toggle between login and signup', async function() {
            await driver.get(`${baseUrl}/login`);
            
            // Check initial state (Login)
            let heading = await driver.findElement(By.css('h2')).getText();
            assert.strictEqual(heading, 'Login');
            
            // Click toggle button
            const toggleButton = await driver.findElement(By.xpath("//button[contains(text(),'Sign up here')]"));
            await toggleButton.click();
            
            // Wait for state change
            await driver.sleep(500);
            
            // Check new state (Sign Up)
            heading = await driver.findElement(By.css('h2')).getText();
            assert.strictEqual(heading, 'Sign Up');
        });
    });

    describe('Legal Rights Page Tests', function() {
        it('should load legal rights', async function() {
            await driver.get(`${baseUrl}/legal-rights`);
            await driver.wait(until.elementLocated(By.className('right-card')), 10000);
            
            const rightCards = await driver.findElements(By.className('right-card'));
            assert(rightCards.length > 0, 'No legal rights loaded');
        });

        it('should filter rights using search', async function() {
            await driver.get(`${baseUrl}/legal-rights`);
            await driver.wait(until.elementLocated(By.className('search-bar')), 5000);
            
            const searchBar = await driver.findElement(By.className('search-bar'));
            await searchBar.sendKeys('cyberbullying');
            
            // Wait for filtering
            await driver.sleep(1000);
            
            const rightCards = await driver.findElements(By.className('right-card'));
            assert(rightCards.length > 0, 'Search should return results');
        });

        it('should expand and collapse categories', async function() {
            await driver.get(`${baseUrl}/legal-rights`);
            await driver.wait(until.elementLocated(By.className('category-heading')), 5000);
            
            const categoryHeading = await driver.findElement(By.className('category-heading'));
            
            // Click to expand
            await categoryHeading.click();
            await driver.sleep(500);
            
            // Check if rights are visible
            const rightsList = await driver.findElements(By.className('right-card'));
            assert(rightsList.length > 0, 'Category should expand');
        });
    });

    describe('Quiz Page Tests', function() {
        it('should display quiz selection', async function() {
            await driver.get(`${baseUrl}/quizzes`);
            const quizCards = await driver.findElements(By.className('feature-card'));
            assert.strictEqual(quizCards.length, 2);
        });

        it('should start normal quiz', async function() {
            await driver.get(`${baseUrl}/quizzes`);
            const normalQuizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
            await normalQuizCard.click();
            
            await driver.wait(until.elementLocated(By.className('quiz-container')), 5000);
            const quizContainer = await driver.findElement(By.className('quiz-container'));
            assert(quizContainer);
        });
    });

    describe('Flashcards Page Tests', function() {
        it('should display flashcard stages', async function() {
            await driver.get(`${baseUrl}/flashcards`);
            const stageCards = await driver.findElements(By.className('feature-card'));
            assert.strictEqual(stageCards.length, 2);
        });

        it('should navigate to Stage 1', async function() {
            await driver.get(`${baseUrl}/flashcards`);
            const stage1Card = await driver.findElement(By.xpath("//h3[contains(text(),'Stage 1')]"));
            await stage1Card.click();
            
            await driver.wait(until.urlContains('/flashcards/fg1'), 5000);
            const currentUrl = await driver.getCurrentUrl();
            assert(currentUrl.includes('/flashcards/fg1'));
        });
    });

    describe('Helpline Page Tests', function() {
        it('should display all helpline numbers', async function() {
            await driver.get(`${baseUrl}/help`);
            
            // Wait for helpline cards to load
            await driver.wait(until.elementLocated(By.xpath("//h3[contains(text(),'Police')]")), 5000);
            
            const helplineCards = await driver.findElements(By.css('.grid > div'));
            assert(helplineCards.length >= 7, 'Should display at least 7 helplines');
        });

        it('should have call buttons with tel: links', async function() {
            await driver.get(`${baseUrl}/help`);
            await driver.wait(until.elementLocated(By.css('a[href^="tel:"]')), 5000);
            
            const callButtons = await driver.findElements(By.css('a[href^="tel:"]'));
            assert(callButtons.length > 0, 'Call buttons should be present');
        });
    });

    describe('Navigation Tests', function() {
        it('should navigate through all pages using navbar', async function() {
            const pages = [
                { path: '/', expectedText: 'Welcome' },
                { path: '/legal-rights', expectedText: 'Legal Rights' },
                { path: '/flashcards', expectedText: 'Flashcard Stage' },
                { path: '/quizzes', expectedText: 'Choose Your Quiz' },
                { path: '/login', expectedText: 'Login' }
            ];

            for (const page of pages) {
                await driver.get(`${baseUrl}${page.path}`);
                await driver.wait(until.elementLocated(By.css('body')), 5000);
                const bodyText = await driver.findElement(By.css('body')).getText();
                assert(bodyText.includes(page.expectedText), 
                    `Page ${page.path} should contain "${page.expectedText}"`);
            }
        });

        it('should have working back buttons', async function() {
            await driver.get(`${baseUrl}/quizzes`);
            const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
            await quizCard.click();
            
            await driver.wait(until.elementLocated(By.className('quiz-container')), 5000);
            
            // This test would need a back button to be present in the quiz UI
            // Adjust based on your actual implementation
        });
    });

    describe('Responsive Design Tests', function() {
        it('should work on mobile viewport', async function() {
            await driver.manage().window().setRect({ width: 375, height: 667 });
            await driver.get(baseUrl);
            
            const body = await driver.findElement(By.css('body'));
            const isDisplayed = await body.isDisplayed();
            assert(isDisplayed);
            
            // Reset viewport
            await driver.manage().window().setRect({ width: 1920, height: 1080 });
        });

        it('should work on tablet viewport', async function() {
            await driver.manage().window().setRect({ width: 768, height: 1024 });
            await driver.get(baseUrl);
            
            const featureCards = await driver.findElements(By.className('feature-card'));
            assert(featureCards.length > 0);
            
            // Reset viewport
            await driver.manage().window().setRect({ width: 1920, height: 1080 });
        });
    });
});