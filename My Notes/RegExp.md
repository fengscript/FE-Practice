空字符

```javascript
let pattern = new RegExp(/^\s*$/);
```



特定单词后面一个单词

```regexp
/(?<=\bin\b\s+)\w+\b/
```

```javascript
'get1_install2_app3_list4_by5_android6'.replace(/(\d)_(\w)/g, (e, p1, p2) => (p1 % 2 ? p1 : '') + p2.toUpperCase())
```
