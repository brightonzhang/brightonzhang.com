---
title: 使用Promise.reject而不是throw？
catalog: false
date: 2020-01-10 12:02:44
updated: 2020-01-10 12:02:44
subtitle:
cover: /posts/javascript-basic/fa9189f8764dd5ad.jpg
categories: 技术
tags:
- JavaScript

---

Promise的构造函数，以及被 `then` 调用执行的函数基本上都可以认为是在 `try...catch` 代码块中执行的，所以在这些代码中即使使用 `throw` ，程序本身也不会因为异常而终止。如果在Promise中使用 `throw` 语句的话，会被 `try...catch` 住，最终promise对象也变为Rejected状态。

那如果想将promise对象的状态设置为Rejected，是选择使用 `reject` 还是 `throw` 呢？

《JavaScript Promise迷你书》给出的答案是：使用 `reject` 而不是 `throw` 。

<!--more--> 

因为我们很难区分 `throw` 是我们主动抛出来的，还是因为真正的其它 **异常** 导致的。使用 `reject` 会比使用 `throw` 安全。

https://www.kancloud.cn/kancloud/promises-book/44236

SO也有个回答：

There is no advantage of using one vs the other, but, there is a specific case where `throw` won't work. However, those cases can be fixed.

Any time you are inside of a promise callback, you can use `throw`. However, if you're in any other asynchronous callback, you must use `reject`.

Another important fact is that `reject()` **DOES NOT** terminate control flow like a `return` statement does. In contrast `throw` does terminate control flow.

https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw