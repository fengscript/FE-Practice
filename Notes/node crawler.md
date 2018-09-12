
# 基本 `module` 使用
```json
{
    "async": "^2.6.1",
    "cheerio": "^1.0.0-rc.2",
    "iconv-lite": "^0.4.24",
    "mysql": "^2.16.0",
    "request": "^2.88.0",
    "superagent": "^3.8.3",
    "superagent-charset": "^1.2.0"
}
```
**感叹一下，`cheerio` 真棒**

# 踩坑
## `request` 和 `superagent`
如果爬虫的数据在 `document` 里，用 `request` 可以明显加快爬虫效率；如果爬虫的数据是页面 `AJAX` 请求得到的，就需要等到页面加载完再爬虫，此时就需要 `SuperAgent` 了。 


## 关于编码
### `request`
国内中文编码错误的，用 `iconv-lite` 这个库

如果是 `request` ，那么请求时候，会自动编码成 `utf-8`，所以，我们需要 `encoding`设为null，请求来数据了再手动编码
```javascript
 request.get({
        url: url,
        encoding: null
    }, function (err, res, body) {
        console.log("statusCode " + res.statusCode);
        if (err) {
            console.log(err)
        }
        body = iconv.decode(body,'gbk');
})
```

### `superagent`
如上，就需要 `superagent-charset` 这个库，具体用法谷歌去吧烦死了


# 其他奇形怪状的库


## puppteer
### install
```bash
npm config set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
```


### 使用自带 `chromium`



### 使用本地 `chrome`
```javascript
(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/chrome/Application/chrome',
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
        path: 'example.png'
    });

    await browser.close();
})();
```
