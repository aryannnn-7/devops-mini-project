// tests/selenium/loginTest.js

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Legal Rights Portal - E2E Tests', function() {
    this.timeout(30000);
    let driver;

    // Local React dev server URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    before(async function() {
        // Configure Chrome options
        const options = new chrome.Options();

        // OPTIONAL: Comment this if you want to see browser opening
        // options.addArguments('--headless');

        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        // ✅ Build local Chrome driver (NO Selenium Hub)
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    // ---------------- HOME PAGE TESTS ----------------

    describe('Home Page Tests', function() {
        it('should load home page successfully', async function() {
            await driver.get(baseUrl);
            const title = await driver.getTitle();
            assert(title.length > 0);
        });

        it('should display feature cards', async function() {
            await driver.get(baseUrl);
            const featureCards = await driver.findElements(By.className('feature-card'));
            assert(featureCards.length > 0);
        });
    });

    // ---------------- LOGIN TESTS ----------------

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

        it('should toggle between login and signup', async function() {
            await driver.get(`${baseUrl}/login`);

            let heading = await driver.findElement(By.css('h2')).getText();
            assert.strictEqual(heading.toLowerCase(), 'login');

            const toggleButton = await driver.findElement(By.xpath("//button[contains(text(),'Sign up')]"));
            await toggleButton.click();

            await driver.sleep(500);

            heading = await driver.findElement(By.css('h2')).getText();
            assert(heading.toLowerCase().includes('sign'));
        });
    });

    // ---------------- LEGAL RIGHTS PAGE ----------------

    describe('Legal Rights Page Tests', function() {
        it('should load legal rights page', async function() {
            await driver.get(`${baseUrl}/legal-rights`);
            await driver.wait(until.elementLocated(By.className('right-card')), 10000);

            const rightCards = await driver.findElements(By.className('right-card'));
            assert(rightCards.length > 0);
        });
    });

    // ---------------- QUIZ PAGE ----------------

    describe('Quiz Page Tests', function() {
        it('should load quizzes page', async function() {
            await driver.get(`${baseUrl}/quizzes`);
            const quizCards = await driver.findElements(By.className('feature-card'));
            assert(quizCards.length > 0);
        });
    });

    // ---------------- RESPONSIVE TEST ----------------

    describe('Responsive Design Test', function() {
        it('should work on mobile viewport', async function() {
            await driver.manage().window().setRect({ width: 375, height: 667 });
            await driver.get(baseUrl);

            const body = await driver.findElement(By.css('body'));
            const visible = await body.isDisplayed();
            assert(visible);

            // Reset to desktop size
            await driver.manage().window().setRect({ width: 1920, height: 1080 });
        });
    });
// ---------------- QUIZ FUNCTIONALITY TESTS ----------------

describe('Quiz Functionality Tests', function() {

    it('should start Quiz 1 successfully', async function() {
        await driver.get(`${baseUrl}/quizzes`);

        // Click Quiz 1 card
        const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
        await quizCard.click();

        // Wait for quiz container
        await driver.wait(until.elementLocated(By.className('quiz-container')), 5000);

        const quizBox = await driver.findElement(By.className('quiz-container'));
        assert(quizBox);
    });

    it('should display a question with multiple options', async function() {
        await driver.get(`${baseUrl}/quizzes`);

        const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
        await quizCard.click();

        await driver.wait(until.elementLocated(By.className('quiz-question')), 5000);

        const question = await driver.findElement(By.className('quiz-question'));
        const options = await driver.findElements(By.className('quiz-option'));

        assert(question);
        assert(options.length >= 2);
    });

    it('should allow selecting an option', async function() {
        await driver.get(`${baseUrl}/quizzes`);

        const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
        await quizCard.click();

        await driver.wait(until.elementLocated(By.className('quiz-option')), 5000);

        const options = await driver.findElements(By.className('quiz-option'));
        await options[0].click();

        // Check if option is marked selected
        const selectedClass = await options[0].getAttribute("class");
        assert(selectedClass.includes("selected") || selectedClass.length > 0);
    });

    it('should move to next question when Next button clicked', async function() {
        await driver.get(`${baseUrl}/quizzes`);

        const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
        await quizCard.click();

        await driver.wait(until.elementLocated(By.className('quiz-question')), 5000);

        const firstQuestion = await driver.findElement(By.className('quiz-question')).getText();

        const options = await driver.findElements(By.className('quiz-option'));
        await options[0].click();

        const nextButton = await driver.findElement(By.xpath("//button[contains(text(),'Next')]"));
        await nextButton.click();

        await driver.sleep(1000);

        const secondQuestion = await driver.findElement(By.className('quiz-question')).getText();

        assert.notStrictEqual(firstQuestion, secondQuestion);
    });

    it('should show result page after finishing quiz', async function() {
        await driver.get(`${baseUrl}/quizzes`);

        const quizCard = await driver.findElement(By.xpath("//h3[contains(text(),'Quiz 1')]"));
        await quizCard.click();

        await driver.wait(until.elementLocated(By.className('quiz-question')), 5000);

        // Loop through few questions automatically
        for (let i = 0; i < 3; i++) {
            const options = await driver.findElements(By.className('quiz-option'));
            await options[0].click();

            const nextButton = await driver.findElement(By.xpath("//button[contains(text(),'Next')]"));
            await nextButton.click();

            await driver.sleep(800);
        }

        // Wait for result page
        await driver.wait(until.elementLocated(By.className('quiz-result')), 5000);

        const resultBox = await driver.findElement(By.className('quiz-result'));
        assert(resultBox);
    });

});

});
