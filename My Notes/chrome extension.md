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
