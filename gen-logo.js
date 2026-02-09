const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 512, height: 512 });
    await page.goto('file://' + path.join(__dirname, 'logo-gen.html'));
    await page.waitForTimeout(1000); // Let fonts load
    await page.screenshot({ path: 'logo-512.png', omitBackground: false });
    console.log('Created logo-512.png');
    await browser.close();
})();
