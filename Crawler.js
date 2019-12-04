const puppeteer = require('puppeteer');
const fs = require('fs');

let Links_Array = [];

crawlPage();

function crawlPage() {
    (async () => {

        const args = [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--blink-settings=imagesEnabled=false",
        ];
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
        };

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.goto("https://www.ecri.org/library/general-topics/accidents", {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
   
        const hrefs = await page.$$eval('a', as => as.map(a => a.href));

        hrefs.forEach(t=>fs.appendFile('MyLinks.txt', t+"\n", (err) => {
            if(err) throw err;
            console.log('saved!!');
        }));
        await page.close();
        await browser.close();

    })().catch((error) => {
        console.error(error);
    });;
}