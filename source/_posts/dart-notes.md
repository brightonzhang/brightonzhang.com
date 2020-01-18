---
title: Dart笔记
catalog: false
date: 2018-07-31 20:22:23
updated: 2020-01-17 20:22:23
subtitle:
cover:
categories: 技术
tags:
---

Dart 是谷歌开发的一种通用编程语言，后被 Ecma 认定为标准（ECMA-408）。它被用于构建 Web、服务器、桌面和移动应用程序。

Dart is a client-optimized programming language for apps on multiple platforms. It is developed by Google and is used to build mobile, desktop, backend and web applications. Dart is an object-oriented, class defined, garbage-collected language using a C-style syntax that transcompiles optionally into JavaScript.

<!--more--> 

https://dart.dev/

https://www.dartcn.com/

```dart
// 定义一个函数
printInteger(int aNumber) {
  print('The number is $aNumber.'); // 打印到控制台。
}

// 应用从这里开始执行。
main() {
  var number = 42; // 声明并初始化一个变量。
  printInteger(number); // 调用函数。
}
```

在学习 Dart 语言时, 应该基于以下事实和概念：

- 任何保存在变量中的都是一个 *对象* ， 并且所有的对象都是对应一个 *类* 的实例。 无论是数字，函数和 `null` 都是对象。所有对象继承自 [Object](https://api.dartlang.org/stable/dart-core/Object-class.html) 类。
- 尽管 Dart 是强类型的，但是 Dart 可以推断类型，所以类型注释是可选的。如果要明确说明不需要任何类型， [需要使用特殊类型 `dynamic`](https://www.dartcn.com/guides/language/effective-dart/design#do-annotate-with-object-instead-of-dynamic-to-indicate-any-object-is-allowed) 。
- Dart 支持泛型，如 `List ` （整数列表）或 `List ` （任何类型的对象列表）。
- Dart 支持顶级函数（例如 `main（）` ）， 同样函数绑定在类或对象上（分别是 *静态函数* 和 *实例函数* ）。 以及支持函数内创建函数 （ *嵌套* 或 *局部函数* ） 。

- 类似地， Dart 支持顶级 *变量* ， 同样变量绑定在类或对象上（静态变量和实例变量）。 实例变量有时称为字段或属性。
- 与 Java 不同，Dart 没有关键字 “public” ， “protected” 和 “private” 。 如果标识符以下划线（_）开头，则它相对于库是私有的。 有关更多信息，参考 [库和可见性](https://www.dartcn.com/guides/language/language-tour#库和可见性)。
- *标识符* 以字母或下划线（_）开头，后跟任意字母和数字组合。
- Dart 语法中包含 *表达式（ expressions ）*（有运行时值）和 *语句（ statements ）*（没有运行时值）。 例如，[条件表达式](https://www.dartcn.com/guides/language/language-tour#conditional-expressions) `condition ? expr1 : expr2` 的值可能是 `expr1` 或 `expr2` 。 将其与 [if-else 语句](https://www.dartcn.com/guides/language/language-tour#if-和-else) 相比较，if-else 语句没有值。 一条语句通常包含一个或多个表达式，相反表达式不能直接包含语句。
- Dart 工具提示两种类型问题：*警告_和_错误*。 警告只是表明代码可能无法正常工作，但不会阻止程序的执行。 错误可能是编译时错误或者运行时错误。 编译时错误会阻止代码的执行; 运行时错误会导致代码在执行过程中引发 [异常]（#exception）。


