title: Hello World
subtitle: "Just for testing."
date: 2015-06-28 16:27:30
updated: 2016-06-28 16:27:30
cover: "quick-brown-fox.jpg"
catalog: true

categories:
- 巧技

tags:
- 测试
- HEXO
---

THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
the quick brown fox jumps over the lazy dog

<!--more--> 

# 纳凉
携扙来追柳外凉，画桥南畔倚胡床。
月明船笛参差起，风定池莲自在香。 

# Hexo
Welcome to [Hexo](http://hexo.io/)! This is your very first post. Check [documentation](http://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](http://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](http://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](http://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](http://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](http://hexo.io/docs/deployment.html)

# Setup
## Initialise
```shell
git clone --single-branch https://github.com/brightonzhang/brightonzhang.com.git bzcom/
cd bzcom
npm install 
```

## Migrate
```shell
for md in *.md
do
    if [ ! -d ${md%.md} ]
    then
        mkdir ${md%.md}
    fi
done
```

> The header image is from [SKETCH THAT](https://sketchthatout.wordpress.com/tag/art/page/4/)
