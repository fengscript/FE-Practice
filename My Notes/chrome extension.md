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
  "permissions": ["activeTab", "storage", "tabs"]
}

```

# content & background

content 中的代码，不能直接读取到原页面函数等


background 中 数组里面脚本的顺序会影响脚本执行
## run_at
设置脚本运行时机： document_start | document_idel | document_end
```javascript
  "content_scripts": [
    {
      "run_at": "document_end",
    }
```

# api

# tips

有时候，扩展有 error 会造成函数运行问题
