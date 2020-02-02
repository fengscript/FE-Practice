# Tools Records

## Windows

**Code**

- cmder
- snipaste
- zeal 文档管理
- 小程序开发工具
- postman

**Tools**

- ditto
- color schemer studio
- listary
- fdm
- 坚果云
- 火绒
- Q-dir
- 向日葵
- uTools https://u.tools/ 启动器 插件


**Study**

- typora
- mendeley 文献阅读管理 https://www.mendeley.com/

**Media**

- xnview
- potplayer
- Listen 1
- music tools 音乐下载
**System**
- refus 引导盘制作


**Work**
ppt
- iSlide
- PA 口袋动画
- OneKey Tool
- pixel map generator

## Mac



# Some Config

## cmder

### 添加环境变量

在系统变量添加

变量名：`CMDER_HOME`
变量值： 安装绝对路径

最后在 Path 添加一条
`%CMDER_HOME%`

### 添加到鼠标右键

```bash
cmder.exe /REGISTER ALL
```

### 命令提示符

在 cmder 执行

```bash
cmderr
cd vendor/
vi clink.lua

大概 41 行
local cmder_prompt = "\x1b[1;32;40m{cwd} {git}{hg}{svn} \n\x1b[1;30;40m{lamb} \x1b[0m"
这一行下面的 lamb 变量里面的字符修改成自己想要的
```

### alians

```bash
cmderr
cd config
vi user-aliases.cmd
```


## Vscode
自定义快捷键:
```bash
Ctrl+P  keybindings
```



# Chrome Extendtions

- workona 管理 session 和 tabs
- session buddy 暂存 tabs
- one tab 和 better one tab 管理 tab

---
