# Prepare

## 与其他 SVN 区别

OTHER

- 集中式
- 关心文件内容的具体差异
- branch 是一个完整的目录。且这个目录拥有完整的实际文件

Git

- 分布式（比如不担心文件损坏，本地查看所有 log）
- 只关心文件数据的整体是否发生变化
- 内容存储使用的是 SHA-1 哈希算法,保证代码、文件内容的完整性
- 速度更快
- 分支

Git 则在每一个 commit 时，保存一个整个文件的 `content copy`，将文件在那个时刻的状态做一个快照，并且保存对那个快照的引用。为了更加高效，如果文件本身没有做变更，git 并不会重新保存一份，而仅仅重新引用这个已经保存过的文件快照

其他 VCS 管理分支大多采取备份所有项目文件到特定目录的方式，所以根据项目文件数量和大小不同，可能花费的时间也会有相当大的差别，快则几秒，慢则数分钟。而 Git 的实现与项目复杂度无关，它永远可以在几毫秒的时间内完成分支的创建和切换

> 有些版本管理工具是保存每个版本之间的变化，这样虽然总文件体积小，但是每检出一个文件都要从最开始的版本一个个修改叠加上去，很慢

- VCS, Version Control System
- CVCS, Centralized Version Control Systems

Subversion

`git svn` : Subversion 双向桥接工具。把 Git 变成了 Subversion 服务的客户端，从而让你在本地享受到 Git 所有的功能，而后直接向 Subversion 服务器推送内容，仿佛在本地使用了 Subversion 客户端

# 文件

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
查看已暂存，未提交的文件： `git diff --cached`

`git commit -v`:将修改差异的每一行都包含到注释中来

文件改名：`git move xxx newxxx`

## `commit`

**每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较**

> Snapshot:In computer systems, a snapshot is the state of a system at a particular point in time.

> Git 是记录和组装一系列快照流的微型系统，关心文件数据的整体是否发生变化。每次 commit 的时候保存一次快照，而每个快照都包含了完整的数据；后者则关心文件内容的具体差异。第一次保存了完整的数据，往后每次保存的都不是完整的数据，只会记录基于之前的版本和现在两者的变化信息，对于此外没有变化的都不会去记录。

在 Git 中提交时，会保存一个提交（commit）对象，该对象包含一个指向暂存内容快照的指针，包含本次提交的作者等相关附属信息，**包含零个或多个指向该提交对象的父对象指针**：首次提交是没有直接祖先的，普通提交有一个祖先，由两个或多个分支合并产生的提交则有多个祖先。

当使用 `git commit` 新建一个提交对象前，Git 会先计算每一个子目录的校验和，然后在 Git 仓库中将这些目录保存为树（tree）对象。之后 Git 创建的提交对象，除了包含相关提交信息以外，还包含着指向这个树对象（项目根目录）的指针，如此它就可以在将来需要的时候，重现此次快照的内容了。

## 移除文件

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

### `checkout --` 取消对文件的修改(没有 暂存 或者 commit)

```bash
git checkout -- <file>
```

### `reset` 取消已经暂存的文件

```bash
git reset HEAD <file>...

// git reset HEAD benchmarks.rb
```
#### 撤销上一次 `commit`
```bash
git reset --soft HEAD~ // HEAD~ (HEAD 的父结点)
```


### `revert` 添加一次新的提交覆盖上次提交
```bash
git revert
```

很明显，`HEAD` 后移了



# remote

远程引用是对远程仓库的引用（指针）

远程跟踪分支是远程分支状态的引用。 它们是你不能移动的本地引用，当你做任何网络通信操作时，它们会自动移动。

`git remote` : 每个远程库的简短名字
`git remote -v` : 显示对应的克隆地址（--verbose）

在克隆完某个项目后，至少可以看到一个名为 `origin` 的远程库，默认使用这个名字来标识你所克隆的原始仓库

`git fetch origin` :查找 “origin” 是哪一个服务器，从中抓取本地没有的数据，并且更新本地数据库，移动 `origin/master` 指针指向新的、更新后的位置。

## add

`git remote add [shortname] [url]`

`git remote show [remote-name]`

## update

`git fetch [remote-name]`

`git push [remote-name] [branch-name]`

`git push origin branchName:newBranchName`

`git remote rename`

`git remote rm` rm 一个远程地址

## track

从一个远程跟踪分支检出一个本地分支会自动创建一个叫做 “跟踪分支”（有时候也叫做 “上游分支”）

跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 `git pull`，`Git` 能自动地识别去哪个服务器上抓取、合并到哪个分支。

### 本地没有，track 一个 remote 分支

克隆一个仓库时，它通常会自动地创建一个跟踪 `origin/master` 的 `master` 分支。 也可以设置其他的跟踪分支 - 其他远程仓库上的跟踪分支，或者不跟踪 `master` 分支：
`git checkout -b [branch] [remotename]/[branch]`

`Git`提供了 `--track` 快捷方式：
`git checkout --track origin/branch`

或者设置别名：
`git checkout --track newBranchName origin/branch`

### 本地已有分支 track 一个 remote

设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支，使用 `-u` 或 `--set-upstream-to` 选项运行 git branch 来显式地设置

```bash
$ git branch -u origin/branch
```

查看本地所有跟踪分支：

```bash
git branch -vv
```

### 远程跟踪分支有更新

抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝），即不会有一个新的分支 - 只有一个不可以修改的 `origin/branch` 指针。可以运行

```bash
git merge origin/branch
```

将这些工作合并到当前所在的分支，或者也可以在远程跟踪分支上建立自己的本地分支：

```bash
git checkout -b myBranch origin/branch
```

### 本地分支有更新

推送本地分支 `local_branch` 到远程分支 `remote_branch` 并建立关联关系

    a.远程已有 `remote_branch` 分支并且已经关联本地分支 `local_branch` 且本地已经切换到 `local_branch`
    - `git push`

    b.远程已有 `remote_branch` 分支但未关联本地分支 `local_branch` 且本地已经切换到 `local_branch`
    - `git push -u origin/remote_branch`

    c.远程没有 `remote_branch` 分支，本地已经切换到 `local_branch`
    - `git push origin local_branch:remote_branch`

### 删除 remote 分支

```bash
git push origin --delete branch
```

`git remote prune` 移除 remote 删除，本地还在的分支。（刷新本地仓库与远程仓库的保持这些改动的同步）

# branch
>  Git 处理分支的方式可谓是难以置信的轻量，创建新分支这一操作几乎能在瞬间完成，并且在不同分支之间的切换操作也是一样便捷。 与许多其它版本控制系统不同，Git 鼓励在工作流程中频繁地使用分支与合并，哪怕一天之内进行许多次

`master`, `branch`,`HEAD`,`Tag`都是指针，`tag`不能移动


```bash
git checkout -b xxx
# 等于
git branch xxx
git checkout xxx

git merge xxx
git checkout -d xxx
```

**`Git` 中的分支，其实本质上仅仅是个指向 `commit` 对象的可变指针。`Git` 会使用 `master` 作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的 `master` 分支，它在每次提交的时候都会自动向前移动。**

**创建一个新的分支就是创建一个新的分支指针**

`Git` 知道你当前在哪个分支上工作的呢？它保存着一个名为 `HEAD` 的特别指针，是一个指向你正在工作中的本地分支的指针（译注：将 HEAD 想象为当前分支的别名。

## 合并

在一个分支完成一部分工作，需要 `master` 上最新的代码时，合并 `master` 到目前分支

```bash
git merge master
```

# submodule

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
  - `git submodule update --remote xxx` (Sup Directory) 自动进入子目录抓取相关更新

- Push
  - `push` 时候检查本地子模块更改是否提交 `git push --recurse-submodules=check`

## rebase

整合来自不同分支的修改主要有两种方法：`merge` 以及 `rebase`

`rebase` 命令将提交到某一分支上的所有修改都移至另一分支上

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

# `HEAD` `head`

`HEAD` 是 `current branch` ，默认指向当前分支的最新提交，`checkout` 会指向新的分支

> https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#r_git_reset
> HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交。 这表示 HEAD 将是下一次提交的父结点。 通常，理解 HEAD 的最简方式，就是将它看做 你的上一次提交 的快照。

`head` 是 `commit` 对象的引用，每个 `head` 都有一个名字（分支名字或者标签名字等等），默认情况下，每个叫`master` 的 `repository` 都会有一个 `head`, 一个 `repository` 可以包含任意数量的 `head` 。在任何时候，只要这个 `head` 被选择成为 `current head` ，那么这个 `head` 就成了 `HEAD`

# interactive mode

```bash
git add -i
#
git add --interactive
```

# stash

```bash
git stash = git stash save
git stash list
git stash --keep-index  //不要储藏任何你通过 git add 命令已暂存的东西


// 掏出来
git stash apply
git stash apply stash@{2}
git stash branch
```

- `--patch` 标记：Git 不会储藏所有修改过的任何东西，但是会交互式地提示哪些改动想要储藏、哪些改动需要保存在工作目录中
- `--include-untracked` 或 `-u` 储藏任何创建的未跟踪文件(默认情况下，`git stash` 只会储藏已经在索引中的文件)

# ignore

在工作目录下创建一个 `.gitignore` 的文件，以 `glob`（简化的正则）模式写入希望忽略的文件/目录名：

- `*` 匹配零个或多个任意字符；
- `[abc]` 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）
- `[a-z]`匹配一段
- `?`只匹配一个任意字符；
- `**` 表示匹配任意中间目录，比如`a/**/z` 可以匹配 a/z, a/b/z 或 `a/b/c/z`等。

可以参考这个：https://github.com/github/gitignore

# clean

- `git clean` 从工作目录中移除未被追踪的文件(再也不能找回)
- `git stash --all` 移除每一样东西并存放在栈中

# OTHER

`fast-forward`: `master` 分支是当前提交分支的直接上游，所以从 `master` 合并一个下游分支时，就会直接将指针向前移动

## CONFIG

### `git config`

主要控制三个环境变量文件：

- `/etc/gitconfig` ：系统中对所有用户都普遍适用的配置。 `git config --system`
- `~/.gitconfig` ：只适用于该用户。`git config --global`
- `.git/config`(工作目录中)：仅针对当前项目有效。
  **每一个级别的配置都会覆盖上层的相同配置**

`Windows` 系统上，Git 会找寻用户主目录下的 `.gitconfig` 文件

### `ssh`

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

### name set

```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

## 其他疑难杂症

### 分支名和文件名重复

可以添加 `--` 连字符来检出文件：

```bash
git checkout -- name
```

### `git-pull-rebase`

```bash
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase
```
