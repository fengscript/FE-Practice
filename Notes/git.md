# config
## ssh
```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

## name



## submodule

将一个 `Git` 仓库作为另一个 `Git` 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

- Clone:
  > 克隆含有子模块的 `respository` 时会默认包含子模块目录，但是里面没有任何文件
    - `git submodule init` 初始化本地配置文件
    - `git submodule update` 从该项目中抓取所有数据并检出父项目中列出的合适的提交，即将子模块更新到与最近提交相同时的状态
    - `git clone --recursive xxx` `clone` 时候自动 `init` and `update` 所有子模块

- ADD: `git submodule add URL PATH`
    默认情况下，子模块会将子项目放到一个与仓库同名的目录中
    
    会有一个 `.gitgitmodules` 文件保存项目 URL 与已经拉取的本地目录之间的映射
    可以通过 `git config submodule.xxx.url` 在本地私有的重置这个地址

- Update
  - `git fetch`,`git merge` or (Submodule Directory)
  - `git submodule update --remote xxx` (Sup Directory)

- Push
  - `push` 时候检查本地子模块更改是否提交 `git push --recurse-submodules=check`


## rebase

- 合并多个 `commit`
  - `(startpoint, endpoint]`
  - `git rebase -i  [startpoint]  [endpoint] `
- 复制 `commit` 到其他分支
  - ` git rebase   [startpoint]   [endpoint]  --onto  [branchName]`


## cheery-pick
对已经存在的 commit 进行 再次提交，新的提交跟之前 hash 值不同，但标识名一样
选择一个commit，合并进当前分支
`git cherry-pick <commit id>`

