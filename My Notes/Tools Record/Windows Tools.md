## cmder 配置

### 添加环境变量

在系统变量添加

变量名：`CMDER_HOME`
变量值： 安装绝对路径

最后在Path添加一条
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





# Chrome Extendtions

- workona 管理session和tabs
- session buddy 暂存tabs
- one tab 和 better one tab 管理tab

---

# Tools Records

- cmder
- snipaste
- 