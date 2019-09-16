---
title: async-await函数同时触发多个异步操作
catalog: false
date: 2019-09-16 12:56:43
updated: 2019-09-16 12:56:43
subtitle:
cover: /posts/javascript-basic/fa9189f8764dd5ad.jpg
categories: 技术
tags: 
- JavaScript
---

JS中使用 `async-await` 等待异步操作完成的过程中，如果前后两个异步操作不存在依赖关系，那同时触发这些操作则是更好的方案。

<!--more--> 

阮一峰的[《ECMAScript 6 入门》中关于async函数的使用注意点](http://es6.ruanyifeng.com/#docs/async#使用注意点)中有这样一段： 

<hr/>

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
let foo = await getFoo();
let bar = await getBar();
```

上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。

<hr/>

第一次阅读时，对于文中的方法一觉得好理解，方法二却有点犯迷糊了。写了[测试代码](https://raw.githubusercontent.com/brightonzhang/cavy/master/js/test-async-await.html)验证结果确实如此。又倒回去阅读了前文，终于明白了，简要整理如下。

首先，`async`函数返回一个 Promise 对象。当函数执行的时候，一旦遇到`await`就会先返回。

然后，`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。

还有，`await`命令后面是一个 Promise 对象（或者`thenable`对象），返回该对象的结果——根据状态由`pending`变为`fulfilled`或`rejected`。

看下面的代码：

```js
async function sleep(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function getFoo() {
    console.log('getFoo start');
    await sleep(1000);
    console.log('getFoo done');
}

async function triggerSimultaneously() {
    console.log('triggerSimultaneously: ');
    const startTime = Date.now();

    const fooPromise = getFoo();
    console.log('triggerSimultaneously: got promises');

    const foo = await fooPromise;
    console.log('triggerSimultaneously cost: ' + (Date.now() - startTime));
}

triggerSimultaneously();
```

执行结果为：

```
triggerSimultaneously: 
getFoo start
triggerSimultaneously: got promises
//Promise {<pending>}
getFoo done
triggerSimultaneously cost: 1005
```

代码第18行` const fooPromise = getFoo();`即触发了`getFoo`中的异步操作，并且返回一个promise对象，其状态为pending。

代码第21行`const foo = await fooPromise;`，使用`await`命令等待fooPromise状态改变后返回。

这样就很好理解书中的方法二的写法了：先调用所有需要的函数触发异步操作并立即返回promise对象，然后使用await命令等待所有异步操作完成。



