---
title: JavaScript 编程风格推荐
catalog: true
date: 2019-11-09 21:20:21
updated: 2020-01-09 21:20:21
subtitle:
cover: /posts/javascript-basic/fa9189f8764dd5ad.jpg
categories: 技术
tags:
- JavaScript
---

在 [Airbnb](https://github.com/airbnb/javascript) 公司的 JavaScript 风格规范中挑了一些需要特别注意的点。

<!--more--> 


# 对象Objects

对象浅拷贝时，更推荐使用扩展运算符[就是`...`运算符]，而不是`Object.assign`。获取对象指定的几个属性时，用对象的rest解构运算符[也是`...`运算符]更好。
```js
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good es6扩展运算符 ...
const original = { a: 1, b: 2 };
// 浅拷贝
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

// rest 赋值运算符
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

# 数组Arrays


用扩展运算符做数组浅拷贝，类似上面的对象浅拷贝。

用 `...` 运算符而不是[`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)来将一个可迭代的对象转换成数组。

```js
  const foo = document.querySelectorAll('.foo');
  
  // good
  const nodes = Array.from(foo);
  
  // best
  const nodes = [...foo];
```

用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 去将一个类数组对象转成一个数组。

```js
  const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

  // bad
  const arr = Array.prototype.slice.call(arrLike);
  
  // good
  const arr = Array.from(arrLike);
```


用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 而不是 `...` 运算符去做map遍历。 因为这样可以避免创建一个临时数组。

```js
  // bad
  const baz = [...foo].map(bar);
  
  // good
  const baz = Array.from(foo, bar);
```

# 函数Functions

**用命名函数表达式而不是函数声明。**eslint: [func-style](http://eslint.org/docs/rules/func-style)

**函数表达式：** const func = function () {}
 **函数声明：** function func() {}

 Why? **函数声明时作用域被提前了，这意味着在一个文件里函数很容易（太容易了）在其定义之前被引用。这样伤害了代码可读性和可维护性。如果你发现一个函数有大又复杂，这个函数妨碍这个文件其他部分的理解性，这可能就是时候把这个函数单独抽成一个模块了。别忘了给表达式显示的命名，不用管这个名字是不是由一个确定的变量推断出来的，这消除了由匿名函数在错误调用栈产生的所有假设，这在现代浏览器和类似**babel**编译器中很常见** ([Discussion](https://github.com/airbnb/javascript/issues/794)) 
**另附**[**原文**](https://github.com/airbnb/javascript#functions--declarations) ：
Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error’s call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))

```js
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
// 函数表达式名和声明的函数名是不一样的
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

 **把立即执行函数包裹在圆括号里。** eslint: [wrap-iife](http://eslint.org/docs/rules/wrap-iife.html)
   Why? immediately invoked function expression = IIFE Why? **一个立即调用的函数表达式是一个单元** - **把它和他的调用者（圆括号）包裹起来，在括号中可以清晰的地表达这些。** Why? **注意：在模块化世界里，你几乎用不着** IIFE

```js
// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```



# 比较运算Comparison Operators & Equality

条件语句如'if'语句使用强制`ToBoolean'抽象方法来评估它们的表达式，并且始终遵循以下简单规则：
  - **Objects** 计算成 **true**
  - **Undefined** 计算成 **false**
  - **Null** 计算成 **false**
  - **Booleans** 计算成 **the value of the boolean**
  - Numbers
    - **+0, -0, or NaN** 计算成 **false**
    - 其他 **true**
  - Strings
    - `''` 计算成 **false**
    - 其他 **true**

```js
if ([0] && []) {
  // true
  // 数组（即使是空数组）是对象，对象会计算成true
}
```