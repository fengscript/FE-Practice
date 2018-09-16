
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


## cherrio
**感叹一下，`cheerio` 真棒**

```javascript
body = iconv.decode(body, 'gbk');
const $ = cheerio.load(body);
const list = $(".list");
```

导入方式：
```javascript
const cheerio = require('cheerio');
const $ = cheerio.load('<ul id="fruits">...</ul>');


const $ = require('cheerio');
$('ul', '<ul id="fruits">...</ul>');

const $ = require('cheerio');
$('li', 'ul', '<ul id="fruits">...</ul>');
```


# 踩坑
## `request` 和 `superagent`
如果爬虫的数据在 `document` 里，用 `request` 可以明显加快爬虫效率；如果爬虫的数据是页面 `AJAX` 请求得到的，就需要等到页面加载完再爬虫，此时就需要 `SuperAgent` 了。 

[参考](https://segmentfault.com/a/1190000011793407)
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


### JSON序列化
碰到过这种情况
```javascript
request.get({
        url: url,
        encoding: 'utf-8'
    }, function (err, res, body) {
        console.log("statusCode " + res.statusCode);
        if (err) {
            console.log(err)
        }
        body = JSON.parse(body);
        let data = body["data"];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
……
```
`body` 取到了，但是直接 `body.data` 去取东西，就会报错：
```bash
for (let index = 0; index < data.length; index++) {
                                         ^
TypeError: Cannot read property 'length' of undefined
```
`body`打印了明显能看到那些属性，但是这里确取不到，灵机一动，经过上面看到的 `JSON.pase` 一下后就OK了




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
