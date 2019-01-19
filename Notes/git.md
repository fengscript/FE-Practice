
# Prepare

## 与其他 SVN 区别
OTHER
- 集中式
- 关心文件内容的具体差异
- branch是一个完整的目录。且这个目录拥有完整的实际文件


Git
- 分布式（比如不担心文件损坏，本地查看所有 log）
- 只关心文件数据的整体是否发生变化
- 内容存储使用的是SHA-1哈希算法,保证代码、文件内容的完整性
- 速度更快
- 分支



Git则在每一个commit时，保存一个整个文件的 `content copy`，将文件在那个时刻的状态做一个快照，并且保存对那个快照的引用。为了更加高效，如果文件本身没有做变更，git并不会重新保存一份，而仅仅重新引用这个已经保存过的文件快照

它们管理分支大多采取备份所有项目文件到特定目录的方式，所以根据项目文件数量和大小不同，可能花费的时间也会有相当大的差别，快则几秒，慢则数分钟。而 Git 的实现与项目复杂度无关，它永远可以在几毫秒的时间内完成分支的创建和切换


- VCS, Version Control System
- CVCS, Centralized Version Control Systems

Subversion

`git svn` : Subversion 双向桥接工具。把 Git 变成了 Subversion 服务的客户端，从而让你在本地享受到 Git 所有的功能，而后直接向 Subversion 服务器推送内容，仿佛在本地使用了 Subversion 客户端

## 文件
在 Git 内都只有三种状态：
- 已修改（modified - not staged ）- `git add / git commit`
- 已暂存（staged）
- 已提交（committed）- `git commit`

那么这个怎么说？
- untracked


即 `git add` -> `git commit`

也可以跳过使用暂存区： `git commit -a`


三个工作区：
- working directory
- staging area
- git directory


查看未暂存的文件： `git diff`
查看已暂存，未提交的文件： `git diff --staged`

`git commit -v`:将修改差异的每一行都包含到注释中来


文件改名：`git move xxx newxxx`

### `commit`

**每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较**

在 Git 中提交时，会保存一个提交（commit）对象，该对象包含一个指向暂存内容快照的指针，包含本次提交的作者等相关附属信息，包含零个或多个指向该提交对象的父对象指针：首次提交是没有直接祖先的，普通提交有一个祖先，由两个或多个分支合并产生的提交则有多个祖先。

当使用 `git commit` 新建一个提交对象前，Git 会先计算每一个子目录（本例中就是项目根目录）的校验和，然后在 Git 仓库中将这些目录保存为树（tree）对象。之后 Git 创建的提交对象，除了包含相关提交信息以外，还包含着指向这个树对象（项目根目录）的指针，如此它就可以在将来需要的时候，重现此次快照的内容了。


### 移除文件
`git rm fileName`：从已跟踪文件清单中移除（即暂存区域）并连带从工作目录中删除指定的文件

如果手动删除的，那还会在 `暂存区`， `git status`会看到 `Changes not staged for commit:`

删除之前修改过并且已经放到暂存区：`git rm -f xxx`

只移出跟踪区，不删除文件：`git rm --cached xxx`



## Revert

### `amend` 修改最后一次提交

```bash
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容

### `reset` 取消已经暂存的文件
```bash
git reset HEAD <file>...

// git reset HEAD benchmarks.rb
```

### `checkout --` 取消对文件的修改


## OTHER
`fast-forward`: `master` 分支是当前提交分支的直接上游，所以从 `master` 合并一个下游分支时，就会直接将指针向前移动



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


# remote
`git remote` : 每个远程库的简短名字
`git remote -v` : 显示对应的克隆地址（--verbose）

在克隆完某个项目后，至少可以看到一个名为 `origin` 的远程库，默认使用这个名字来标识你所克隆的原始仓库

## add
`git remote add [shortname] [url]`

`git remote show [remote-name]`

## update
`git fetch [remote-name]`

`git push [remote-name] [branch-name]`


`git remote rename`

`git remote rm`

# branch

```bash
git checkout -b xxx
# 等于
git branch xxx
git checkout xxx

git merge xxx
git checkout -d xxx
```

`Git` 中的分支，其实本质上仅仅是个指向 `commit` 对象的可变指针。`Git` 会使用 `master` 作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的 `master` 分支，它在每次提交的时候都会自动向前移动。

创建一个新的分支就是创建一个新的分支指针

`Git` 知道你当前在哪个分支上工作的呢？它保存着一个名为 `HEAD` 的特别指针，是一个指向你正在工作中的本地分支的指针（译注：将 HEAD 想象为当前分支的别名。

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
