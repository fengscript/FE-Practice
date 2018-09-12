# install
```bash
npm config set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
```


## 使用自带 `chromium`



## 使用本地 `chrome`
```javascript
(async () => {
        const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/chrome/Application/chrome',
              headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({path: 'example.png'});
      
        await browser.close();
      })();
```
