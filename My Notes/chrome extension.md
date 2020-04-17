# Manifest

all_frames : 将 js 和 css 注入到 `matches` 匹配到的所有 frame 中，还是只注入到 top frame 中

```js
{
  "name": "xxx",
  "description": "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2, //必须大于1
  "background":{
      "scripts":["background.js"],
      "persistent": false
  }
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
    //   或者
        //"matches": [”<all_frames>"],
      "js": ["content.js"]
    }
  ],
  "permissions": ["activeTab", "storage", "tabs"],
  "web_accessible_resources" : [
    "images/*",
    "style.css"
  ]
}

```

- permissions
- web_accessible_resources : 插入图片需要这个

# content & background

content 中的代码，不能直接读取到原页面函数等

background 中 数组里面脚本的顺序会影响脚本执行

## load external manifest

add to the `web_accessible_resources`, then

```js
//Code for displaying <extensionDir>/images/myimage.png:
var imgURL = chrome.runtime.getURL("images/myimage.png");
document.getElementById("someImage").src = imgURL;
```

## run_at

设置脚本运行时机： document_start | document_idel | document_end

```javascript
  "content_scripts": [
    {
      "run_at": "document_end",
    }
```

# api

## tab window commands

三连发

```js
  chrome.commands.onCommand.addListener(command => {
    console.log("Command:", command);
    chrome.tabs.query({ active: true }, tabs => {
      chrome.windows.create(
        {
          tabId: tabs[0].id
          // left:,
          // top:,
        },
        obj => {
          alert(JSON.stringify(obj));
        }
      );
    });
```

1. commands
   在 `manifest` 中设置

```json
"commands": {
    "split-screen-left": {
      "suggested_key": {
        "default": "Shift+Alt+Q",
        "mac": "Shift+Alt+Q"
      },
      "description": "Toggle tab to left"
    },
```

然后 `chrome.commands.onCommand.addListener` 监听

2. 获取当前 tab
   给个 `active: true`即可
   `chrome.tabs.query({ active: true }, e => {})`

永远当前 windows

```
  {
      active: true,
      currentWindow: true
    },
```

3. 创建新窗口
   `chrome.windows.create`
   可以给一个 tabId，用前面已有的 tab 的 id 的话，会把原来 tab 挪过来

```js
chrome.windows.create(
  {
    tabId: tabs[0].id
    // left:,
    // top:,
  },
  obj => {
    alert(JSON.stringify(obj));
  }
);
```

# tips

有时候，扩展有 error 会造成函数运行问题，所以即使清理

# Notes

https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script/9517879#9517879
