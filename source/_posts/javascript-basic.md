---
title: 前端开发：JavaScript入门
catalog: true
date: 2016-10-21 12:06:56
subtitle:
updated: 2016-10-21 15:43:09
cover: fa9189f8764dd5ad.png
categories:
- 技术
tags: 
- 前端
- Web
- HTML
---

JavaScript(JS)是一门完备的轻量级解释型、动态编程语言。当应用于HTML文档时，可为网站提供动态交互特性。由布兰登·艾克(Brendan Eich)发明。其标准为ECMAScript，最新版ECMAScript 6标准（简称ES6）于2015年6月正式发布。

浏览器在读取一个网页时，代码（HTML, CSS和JavaScript）将在一个运行环境（浏览器标签）中得到执行。在HTML和CSS集合组装成一个网页后，浏览器的JavaScript引擎将执行JavaScript代码——通常会按从上往下的顺序执行代码。
<!--more--> 


在HTML页面中插入JavaScript，需要使用`<script>`标签。之前会在`<script>`标签中使用`type="text/javascript"`——现在已经不必这样做了——JavaScript 是所有现代浏览器以及HTML5中的默认脚本语言。

JavaScript代码可以直接存放在`<script>`标签中；也可以保存到外部文件.js中，然后在`<script>`标签的 "src" 属性中设置该文件。`<script>`标签可位于HTML的`<body>`或`<head>`部分中，或者同时存在于两个部分中。通常的做法是把函数放入`<head>`部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容。

另外，JavaScript的位置也可能影响其调用的时机。HTML元素是按其在页面中出现的次序调用的。如果用JavaScript来管理页面上的元素（更精确的说法是使用DOM），若JavaScript 加载于欲操作的 HTML元素之前，则代码将出错。更多相关请参考[脚本调用策略](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript#%E8%84%9A%E6%9C%AC%E8%B0%83%E7%94%A8%E7%AD%96%E7%95%A5)。

# 开始

JavaScript 是一种面向对象的动态语言，它包含类型、运算符、标准内置（ built-in）对象和方法。它的语法来源于 Java 和 C，所以这两种语言的许多语法特性同样适用于 JavaScript。

JavaScript语句以`;`结束。但是，JavaScript并不强制要求在每个语句的结尾加`;`——JavaScript引擎会自动在每个语句的结尾补上——尽管这可能在某些情况下会改变程序的语义。

JavaScript也是在双斜杠`//`后添加单行注释，在`/*`和`*/`之间添加多行注释。

# 变量与类型


变量在JavaScript中就是用一个变量名表示，变量名是大小写英文、数字、`$`和`_`的组合，且不能用数字开头，也不要以下划线开头—— 以下划线开头的被某些JavaScript设计为特殊的含义，因此可能让人迷惑。当然，变量名也不能是[JavaScript的关键字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)。

JavaScript 中声明一个新变量的方法是使用关键字 `let` 、`const` 和 `var`：

- `let` 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。
- `const` 允许声明一个不可变的常量。这个常量在定义域内总是可见的。

- `var` 是最常见的声明变量的关键字。它没有其他两个关键字的种种限制。这是因为它是传统上在 JavaScript 声明变量的唯一方法。使用 `var` 声明的变量在它所声明的整个函数都是可见的。

> 起初，JavaScript 与其他语言的（如 Java）的重要区别是在 JavaScript 中语句块(blocks)是没有作用域的，只有函数有作用域。因此如果在一个复合语句中（如 if 控制结构中）使用 `var` 声明一个变量，那么它的作用域是整个函数（复合语句在函数中）。 但是从 ECMAScript Edition 6 开始将有所不同的， `let` 和 `const` 关键字允许创建块作用域的变量。

JavaScript是一种“动态类型语言”，变量本身类型不固定。所以声明时无需指定类型，可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型，但是要注意只能用`var`声明一次。

说到类型，JavaScript 中的类型应该包括这些：

- [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)（数字）：JavaScript 不区分整数值和浮点数值，采用“IEEE 754 标准定义的双精度64位格式”（"double-precision 64-bit format IEEE 754 values"）表示。
- [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)（字符串）：一串UTF-16编码单元的序列，以单引号'或双引号"括起来的任意文本。
- [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)（布尔）：true` 和 `false：`false`、`0`、空字符串(`""`)、`NaN`、`null` 和 `undefined` 被转换为 `false`；所有其他值被转换为 `true`。
- [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)（符号）：ES6新增。
- [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)（对象）
  - [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function)（函数）
  - [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)（数组）
  - [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date)（日期）
  - [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp)（正则表达式）
- [`Null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Null)（空）：一个空值（non-value），必须使用null关键字才能访问。
- [`Undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Undefined)（未定义）：一个未初始化的值，也就是还没有被分配的值。
- [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)（错误）

```javascript
var myNumber = '500'; 
typeof myNumber;// "string"
myNumber = 500; 
typeof myNumber;// "number"
```


## 字符串

JavaScript的字符串就是用`''`或`""`括起来的字符表示。

如果`'`本身也是一个字符，那就可以用`""`括起来，反之亦然。

转义字符`\`可以转义很多字符，比如`\n`表示换行，`\t`表示制表符，`\\`表示的字符就是`\`。`\x##`是十六进制表示的ASCII字符，`\u####`表示一个Unicode字符：

多行字符串可以用`\n`。但最新的ES6标准新增了一种多行字符串的表示方法，用反引号“\` ... \`” ——键盘上数字键1的左边那个。

**连接字符串**

在JavaScript中连接字符串使用加号(+)操作符。

如果连接一个字符串和一个数字，JS会将数字转换为字符串，并将这两个字符串连接在一起。
`'Front ' + 242; //"Front 242"`

ES6新增了一种模板字符串，可以替换字符串中的变量以实现字符串连接

```javascript
var name = 'Brighton';
var message = `Hello, ${name}!`;
alert(message); //Hello, Brighton!
```

**操作字符串**

需要特别注意的是，字符串是不可变的。字符串方法本身不会改变原有字符串的内容，而是返回一个新字符串。

`length`: 获取字符串长度。
`[]`: 获取字符串某个指定位置的字符，索引号从0开始。
`toUpperCase()`：把一个字符串全部变为大写。
`toLowerCase()`：把一个字符串全部变为小写。
`indexOf()`：搜索指定字符串出现的位置。
`substring()`：返回指定索引区间的子串。
`slice()`：提取字符串的一部分。
`replace()`：将字符串中的一个子字符串替换为另一个子字符串。

## 数组

数组提供了一种顺序存储一组元素的功能，并可以按索引来读写。

数组由方括号构成，其中包含用逗号分隔的元素列表。可以将任何类型的元素存储在数组中 - 字符串，数字，对象，另一个变量，甚至另一个数组，也可以混合和匹配项目类型。

使用括号表示法访问和修改数组中的元素；使用 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性可以获取数组的长度（数组中有多少项元素）。

大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript的数组却不是这样的。通过索引赋值时，若索引超过了范围，会直接引起数组的变化；直接给length赋一个新的值也会导致数组大小的变化。
```js
var arr = [1, 2, 3];
arr.length; // 3
arr[3]; // undefined
arr[3] = 'four';
arr; // [1, 2, 3, "four"]
arr.length = 6;
arr; // [1, 2, 3, "four", undefined, undefined]
arr.length = 2;
arr; // [1, 2]
```
**添加和删除数组项**
[`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 和 [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)在数组末尾添加或删除一个项目；[`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 和 [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 则可以数组的开始增删项目。

**字符串和数组之间的转换**
数组[`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) 方法可以将数组转换为字符串；[`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 方法也可以完成类似的操作。而字符串的[`split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)方法可以将字符串转换为数组。

 ```js
   var myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
   var myArray = myData.split(',');
   myArray; //["Manchester", "London", "Liverpool", "Birmingham", "Leeds", "Carlisle"]
   myArray.length; //6
   myArray[0]; // "Manchester"
   myArray[1]; // "London"
   myArray[myArray.length-1]; // "Carlisle"

   var myNewString = myArray.join(',');
   myNewString; //"Manchester,London,Liverpool,Birmingham,Leeds,Carlisle"

   var dogNames = ["Rocket","Flash","Bella","Slugger"];
   myArray.toString(); //"Manchester,London,Liverpool,Birmingham,Leeds,Carlisle"
 ```

更多数组自带方法，查看[ array 方法的完整文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)。

## 对象

JavaScript的对象可以简单理解成“名称-值”对，是一种无序的集合数据类型，它由若干成员组成——通常由一些变量和函数组成，称之为对象里面的属性和方法。

JavaScript用一个`{...}`表示一个对象，成员以键值对`xxx: xxx`形式声明，用`,`隔开。最后一个成员后不需要`,`。“名称”部分是一个 JavaScript 字符串，“值”部分可以是任何 JavaScript 的数据类型——包括对象。

```js
var person = {
  name : {
    first : 'Bob',
    last : 'Smith'
  },
  age : 32,
  gender : 'male',
  interests : ['music', 'skiing'],
  bio : function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

访问对象成员有两种方式：

- 点表示法(dot notation)
```js
person.age
person.name.first
```

- 括号表示法(bracket notation)
```js
person['age']
person['name']['first']
```

括号表示法看起来很像访问一个数组的元素，从根本上来说是一回事儿，你使用了关联了值的名字，而不是索引去选择元素。所以对象有时被称之为关联数组(associative array)——对象做了字符串到值的映射，而数组做的是数字到值的映射。

点表示法只能接受字面量的成员的名字，不接受变量作为名字。而括号表示法则可以使用变量。因此，括号表示法不仅可以动态的去设置对象成员的值，还可以动态的去设置成员的名字。另外，若对象成员名字不是一个有效的变量名，就必须用''括起来，且访问这个成员也必须用括号['xxx']。

```js
person['eyes'] = 'hazel'
person.farewell = function() { alert("Bye everybody!") }

var myDataName = 'height'
var myDataValue = '1.75m'
person[myDataName] = myDataValue
```

另外，JavaScript规定，访问不存在的属性不报错，而是返回undefined。可以用`in`操作符检测对象是否拥有某一属性。




## 运算符

算数运算符：`+`, `-`, `*`, `/`, `%`(求余/取模)

操作运算符/赋值运算符：`=`（赋值）, `+=`（递增赋值）, `-=`（递减赋值）, `*=`（乘法赋值）, `/=`（除法赋值）

逻辑运算符（返回布尔值）：`&&`（与）, `||`（或）, `!`（非）

`&&` 和 `||` 运算符使用短路逻辑（short-circuit logic），是否会执行第二个语句（操作数）取决于第一个操作数的结果。

比较运算符（返回布尔值）：`===`（严格等于）, `!==`（严格不等于）, `<`（小于）, `>`（大于）, `<=`（小于或等于）, `>=`（大于或等于）

JavaScript中还有`==`和`!=`来判断相等和不相等，但它们与`===`/`!==`不同，前者测试值是否相同，但是数据类型可能不同，而后者的严格版本测试值和数据类型是否相同。严格的版本往往导致更少的错误，建议使用这些严格的版本。

# 控制结构

## 条件

### if


JavaScript中用到的最常见的条件语句类型就是`if ... else`语句。
```js
if (condition) {
  code to run if condition is true
} else {
  run some other code instead
}
```

其中`else`语句是可选的。如果语句块只包含一条语句，那么可以省略`{}`——尽管强烈建议不要这样。

如果需要更细致地判断条件，可以使用多个`if...else...`的组合：

```js
var age = 3;
if (age >= 18) {
    alert('adult');
} else if (age >= 6) {
    alert('teenager');
} else {
    alert('kid');
}
```

### switch

```js
switch (expression) {
  case choice1:
    run this code
    break;

  case choice2:
    run this code instead
    break;
    
  // include as many cases as you like

  default:
    actually, just run this code
}
```

在 `switch` 的表达式和 `case` 的表达式是使用 `===` 严格相等运算符进行比较的。

### 三元运算符

```js
// ( condition ) ? run this code : run this code instead

var greeting = ( isBirthday ) ? 'Happy birthday Mrs. Smith — we hope you have a great day!' : 'Good morning Mrs. Smith.';
```

## 循环

### for

```js
for (initializer; exit-condition; final-expression) {
  // code to run
}
```

JavaScript 也还包括其他两种重要的`for`循环：

- [`for`...`of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

```js
for (let value of array) {
  // do something with value
}
```

- [`for`...`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) ：

```js
for (let property in object) {
  // do something with object property
}
```

### while

```js
initializer
while (exit-condition) {
  // code to run

  final-expression
}
```

### do…while

```js
initializer
do {
  // code to run

  final-expression
} while (exit-condition)
```

另外，break语句立即退出循环，continue语句则跳过当前循环而执行下一个循环。 

# 函数

## 定义与调用

在JavaScript中，定义函数的方式如下：

```js
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```

上述`abs()`函数的定义如下：

- `function`指出这是一个函数定义；
- `abs`是函数的名称；
- `(x)`括号内列出函数的参数，多个参数以`,`分隔；
- `{ ... }`之间的代码是函数体，可以包含若干语句，甚至可以没有任何语句。

请注意，函数体内部的语句在执行时，一旦执行到`return`时，函数就执行完毕，并将结果返回。因此，函数内部通过条件判断和循环可以实现非常复杂的逻辑。

如果没有`return`语句，函数执行完毕后也会返回结果，只是结果为`undefined`。

由于JavaScript的函数也是一个对象，上述定义的`abs()`函数实际上是一个函数对象，而函数名`abs`可以视为指向该函数的变量。

因此，第二种定义函数的方式如下：

```js
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};
```

在这种方式下，`function (x) { ... }`是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量`abs`，所以，通过变量`abs`就可以调用该函数。

上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个`;`，表示赋值语句结束。

调用函数时，按顺序传入参数即可：

```js
abs(10); // 返回10
abs(-9); // 返回9
```

由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：

```js
abs(10, 'blablabla'); // 返回10
abs(-9, 'haha', 'hehe', null); // 返回9
```

传入的参数比定义的少也没有问题：

```js
abs(); // 返回NaN
```

此时`abs(x)`函数的参数`x`将收到`undefined`，计算结果为`NaN`。

要避免收到`undefined`，可以对参数进行检查：

```js
function abs(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```

### arguments

JavaScript还有一个免费赠送的关键字`arguments`，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。利用`arguments`，可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：

```js
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
```

实际上`arguments`最常用于判断传入参数的个数。你可能会看到这样的写法：

```js
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
```

要把中间的参数`b`变为“可选”参数，就只能通过`arguments`判断，然后重新调整参数并赋值。

### rest参数

ES6标准引入了rest参数：

```js
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```

rest参数只能写在最后，前面用`…`标识。传入的参数先绑定`a`、`b`，多余的参数以数组形式交给变量`rest`。如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是`undefined`）。

## 内部函数
JavaScript 允许在一个函数内部定义函数，即嵌套函数——它们可以访问父函数作用域中的变量。

如果某个函数依赖于其他的一两个函数，而这一两个函数对你其余的代码没有用处，你可以将它们嵌套在会被调用的那个函数内部，这样做可以减少全局作用域下的函数的数量，这有利于编写易于维护的代码。

这也是一个减少使用全局变量的好方法。当编写复杂代码时，程序员往往试图使用全局变量，将值共享给多个函数，但这样做会使代码很难维护。内部函数可以共享父函数的变量，所以你可以使用这个特性把一些函数捆绑在一起，这样可以有效地防止“污染”你的全局命名空间——你可以称它为“局部全局(local global)”。虽然这种方法应该谨慎使用，但它确实很有用，应该掌握。

## 高阶函数

如果一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数(Higher-order function)。

## 闭包

闭包(Closure)是 JavaScript 中必须提到的功能最强大的抽象概念之一。

```js
function makeAdder(a) {
    return function(b) {
        return a + b;
    }
}
var x = makeAdder(5);
var y = makeAdder(20);
x(6); // ?
y(7); // ?
```

`makeAdder` 这个名字本身应该能说明函数是用来做什么的：它创建了一个新的 `adder` 函数，这个函数自身带有一个参数，它被调用的时候这个参数会被加在外层函数传进来的参数上。

这与内嵌函数十分相似：一个函数被定义在了另外一个函数的内部，内部函数可以访问外部函数的变量。唯一的不同是，外部函数已经返回了，那么常识告诉我们局部变量“应该”不再存在。但是它们却仍然存在——否则 `adder` 函数将不能工作。也就是说，这里存在 `makeAdder` 的局部变量的两个不同的“副本”——一个是 `a` 等于5，另一个是 `a` 等于20。那些函数的运行结果就如下所示：

```js
x(6); // 返回 11
y(7); // 返回 27
```

下面来说说到底发生了什么。每当 JavaScript 执行一个函数时，都会创建一个作用域对象(scope object)，用来保存在这个函数中创建的局部变量。它和被传入函数的变量一起被初始化。这与那些保存的所有全局变量和函数的全局对象(global object)类似，但仍有一些很重要的区别，第一，每次函数被执行的时候，就会创建一个新的，特定的作用域对象；第二，与全局对象（在浏览器里面是当做 `window` 对象来访问的）不同的是，你不能从 JavaScript 代码中直接访问作用域对象，也没有可以遍历当前的作用域对象里面属性的方法。

所以当调用 `makeAdder` 时，解释器创建了一个作用域对象，它带有一个属性：`a`，这个属性被当作参数传入 `makeAdder` 函数。然后 `makeAdder` 返回一个新创建的函数。通常 JavaScript 的垃圾回收器会在这时回收 `makeAdder` 创建的作用域对象，但是返回的函数却保留一个指向那个作用域对象的引用。结果是这个作用域对象不会被垃圾回收器回收，直到指向 `makeAdder`返回的那个函数对象的引用计数为零。

作用域对象组成了一个名为作用域链(scope chain)的链。它类似于原型(prototype)链一样，被 JavaScript 的对象系统使用。

一个**闭包**就是一个函数和被创建的函数中的作用域对象的组合。

闭包允许你保存状态——所以它们通常可以代替对象来使用。[这里](http://stackoverflow.com/questions/111102/how-do-javascript-closures-work)有一些关于闭包的详细介绍。

# 面向对象

“经典”的面向对象的语言中离不开类和实例是这两个基本概念：类是对象的类型模板；实例是根据类创建的对象。在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。

JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的`prototype`属性上，而非对象实例本身。

## 创建对象

除了直接用`{ ... }`创建一个对象外，JavaScript 可以用一种称为**构造函数**的特殊函数来定义对象和它们的特征。例如：

```js
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
};
```
这个构建函数是 JavaScript 版本的类，它只定义了对象的属性和方法。

关键字"this"指向了当前代码运行时的对象( the current object the code is being written inside )。这里的`this`关键词，即无论是该对象的哪个实例被这个构建函数创建，它的 `name` 属性就是传递到构建函数形参`name`的值，它的 `greeting()` 方法中也将使用相同的传递到构建函数形参`name`的值。

然后调用构建函数创建新的实例：
```js
var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
var person1 = new Person('Sarah', 'Clayton', 28, 'female', 'hacking');
```

关键字 `new` 跟着一个含参函数，用于告知浏览器我们想要创建一个对象实例，非常类似函数调用，并把结果保存到变量中。

JavaScript有个内嵌的方法`create()`, 它允许基于现有对象创建新的对象实例。

```js
// 使用Object()构造函数来创建一个新对象
var personA = new Object({
  name : 'Chris',
  age : 38,
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});

// create()基于现有对象创建新的对象实例
var personB = Object.create(personA);
```

`personB`是基于`personA`创建的， 它们具有相同的属性和方法。这非常有用， 因为它允许创建新的对象实例而无需定义构造函数。

## 对象原型

在javascript中，函数可以有属性。每个函数都有一个特殊的属性叫作原型(prototype)。查看前面Person构造函数的原型`Person.prototype`：
```js
//console.log( Person.prototype );
{
  constructor: ƒ Person(name)
  __proto__: {
    constructor: ƒ Object()
    //...
  }
}
```

查看实例化对象`person1`的成员：
```js
console.log( person1 );
{
  greeting: ƒ ()
  name: "Bob"
  __proto__: {
    constructor: ƒ Person(name)
    __proto__: {
      constructor: ƒ Object()
      // ...
    }
  }
}
```

就像上面看到的, `person1`的 `__proto__` 属性就是`Person.prototype`。
当访问 `person1` 的一个属性, 浏览器首先查找 `person1` 是否有这个属性. 如果 `person1` 没有这个属性, 然后浏览器就会在 `person1` 的 `__proto__` 中查找这个属性(也就是 `Person.prototype`). 如果 `person1`  的 `__proto__` 有这个属性, 那么 `person1`  的 `__proto__` 上的这个属性就会被使用. 否则, 如果 `person1`  的 `__proto__` 没有这个属性, 浏览器就会去查找 `person1`  的 `__proto__` 的 `__proto__` ，看它是否有这个属性. 默认情况下, 所有函数的原型属性的 `__proto__` 就是 `window.Object.prototype`. 所以 `person1`  的 `__proto__` 的 `__proto__` (也就是 `Person.prototype` 的 `__proto__` (也就是 `Object.prototype`)) 会被查找是否有这个属性. 如果没有在它里面找到这个属性, 然后就会在 `person1`  的 `__proto__` 的 `__proto__` 的 `__proto__` 里面查找. 然而这有一个问题: `person1`  的 `__proto__` 的 `__proto__` 的 `__proto__` 不存在. 最后, 原型链上面的所有的 `__proto__` 都被找完了, 浏览器所有已经声明了的 `__proto__` 上都不存在这个属性，然后就得出结论，这个属性是 `undefined`.

这样，`person1`对象的可用成员包含了定义在 `person1` 的原型对象、即 `Person()` 构造器中的成员—— `name`、`greeting`；同时也有—— `watch`、`valueOf` 等等——这些成员定义在 `Person()` 构造器的原型对象、即 `Object` 之上。下图展示了原型链的运作机制。
![原型链](https://mdn.mozillademos.org/files/13891/MDN-Graphics-person-person-object-2.png)

**注意**：必须重申，原型链中的方法和属性**没有**被复制到其他对象——它们被访问需要通过“原型链”的方式。

根据对象的属性查找原则，可以看出继承的属性和方法是定义在 `prototype` 属性之上的（或称之为子命名空间 (sub namespace) ）。

前面示例中，`person1`和`person2`各自有`greeting`函数——是两个不同的函数，虽然函数名称和代码都是相同的！如果通过`new Person()`创建了很多对象，这些对象的`greeting`函数实际上只需要共享同一个函数就可以了，这样可以节省很多内存。所以，我们把`greeting`函数移动到`person1`、`person2`这些对象共同的原型——`Person.prototype`。

```js
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
};
```

事实上，一种极其常见的对象定义模式是，在构造器（函数体）中定义属性、在 `prototype`属性上定义方法。如此，构造器只包含属性定义，而方法则分装在不同的代码块，代码更具可读性。

## 原型继承

JavaScript中，继承的对象函数并不是通过复制而来，而是通过原型链继承（通常被称为 **原型式继承 ——** **prototypal inheritance）**。

比如我们想要创建一个`Teacher`类，这个类会继承`Person`的所有成员，同时也包括：

1. 一个新的属性，`subject`——这个属性包含了教师教授的学科。
2. 一个被更新的`greeting()`方法，这个方法打招呼听起来比一般的`greeting()`方法更正式一点——对于一个教授一些学生的老师来说。

首先，创建一个`Teacher()`构造函数：

```js
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}
```

注意`call()`函数——允许调用一个在这个文件里别处定义的函数。第一个参数指明了在运行这个函数时想对“`this`”指定的值，也就是说，可以重新指定调用的函数里所有“`this`”指向的对象。其他的变量指明了所有目标函数运行时接受的参数。

在这个例子里，`Teacher()`构造函数里运行了`Person()`构造函数，得到了和在`Teacher()`里定义的一样的属性，但是用的是传送给`Teacher()`，而不是`Person()`的值（使用这里的`this`作为传给`call()`的`this`，意味着`this`指向`Teacher()`函数）。

在构造函数里的最后一行代码简单地定义了一个新的`subject`属性，这将是教师会有的，而一般人没有的属性。

`Teacher()`定义了一个新的构造器，这个构造器默认有一个空的原型属性。我们需要让`Teacher()`从`Person()`的原型对象里继承方法。
```js
Teacher.prototype = Object.create(Person.prototype);
```
这里`create()`函数来创建一个和`Person.prototype`一样的新的原型属性值（这个属性指向一个包括属性和方法的对象），然后将其作为`Teacher.prototype`的属性值。这意味着`Teacher.prototype`现在会继承`Person.prototype`的所有属性和方法。

但是，现在`Teacher()`的`prototype`的`constructor`属性指向的是`Person()`, 这是由我们生成`Teacher()`的方式决定的(这篇 [Stack Overflow post](https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor) 文章会告诉您详细的原理) 。所以加上：

```js
Teacher.prototype.constructor = Teacher;
```

最后，构造函数`Teacher()`上定义一个新的函数`greeting()`：

```js
Teacher.prototype.greeting = function() {
  var prefix;

  if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }

  alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};
```

创建一个 `Teacher()` 对象实例：

```js
var teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');
```

测试老师实例的属性和方法：

```js
teacher1.name.first;
teacher1.interests[0];
teacher1.bio();
teacher1.subject;
teacher1.greeting();
```

前面三个进入到从`Person()`的构造器 继承的属性和方法，后面两个则是只有`Teacher()`的构造器才有的属性和方法。

## class继承

关键字`class`从ES6开始正式被引入到JavaScript中。

JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax *does not* introduce a new object-oriented inheritance model to JavaScript.

用新的`class`关键字来编写`Person`:

```js
class Person {
  constructor(first, last, age, gender, interests){
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
};

var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
```

[constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)方法是一个特殊的方法，这种方法用于创建和初始化一个由`class`创建的对象。

用`class`定义对象的另一个巨大的好处是继承更方便，直接通过`extends`来实现：

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject){
    super(first, last, age, gender, interests);
    this.subject = subject;
  }

  greeting() {
    var prefix;

    if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
      prefix = 'Mr.';
    } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
      prefix = 'Mrs.';
    } else {
      prefix = 'Mx.';
    }

    alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
  };
}

var teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');
teacher1.greeting(); 
```



# 参考资料

1. [JavaScript — 用户端动态脚本 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)
2. [重新介绍 JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
3. [JavaScript 教程 | W3school](http://www.w3school.com.cn/js/index.asp)
4. [JavaScript教程 | 廖雪峰](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)

