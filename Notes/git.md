# CONFIG
## `git config`
主要控制三个环境变量文件：
- `/etc/gitconfig` ：系统中对所有用户都普遍适用的配置。 `git config --system`
- `~/.gitconfig` ：只适用于该用户。`git config --global` 
- `.git/config`(工作目录中)：仅针对当前项目有效。
**每一个级别的配置都会覆盖上层的相同配置**

`Windows` 系统上，Git 会找寻用户主目录下的 `.gitconfig` 文件


## `ssh`

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

## name set

```bash

```



# USE
## branch

```bash
git checkout -b xxx
# 等于
git branch xxx
git checkout xxx

git merge xxx
git checkout -d xxx
```

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
  - `git rebase -i [startpoint] [endpoint]`
- 复制 `commit` 到其他分支
  - `git rebase [startpoint] [endpoint] --onto [branchName]`

```bash
git rebase --onto master branch1 branch2
```

## cheery-pick

对已经存在的 commit 进行 再次提交，新的提交跟之前 hash 值不同，但标识名一样
选择一个 commit，合并进当前分支
`git cherry-pick <commit id>`

## tag

```bash
git tag lightTagName
git tag -a name -m 'message'
git push origin TagName
git push origin --tag   // all tags
```

# Revert

## `amend` 修改最后一次提交

```bash
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容

## `reset` 取消已经暂存的文件
```bash
git reset HEAD <file>...

// git reset HEAD benchmarks.rb
```

## `checkout --` 取消对文件的修改


## 与其他 SVN 区别
VCS, Version Control System

Subversion

`git svn` : Subversion 双向桥接工具。把 Git 变成了 Subversion 服务的客户端，从而让你在本地享受到 Git 所有的功能，而后直接向 Subversion 服务器推送内容，仿佛在本地使用了 Subversion 客户端

## OTHER
`fast-forward`: `master` 分支是当前提交分支的直接上游，所以从 `master` 合并一个下游分支时，就会直接将指针向前移动
