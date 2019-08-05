---
title: 前端开发：CSS入门
catalog: true
date: 2016-07-19 11:36:24
subtitle:
updated: 2016-07-19 11:36:24
cover: 5881e0b98e717.png
categories:
- 技术
tags:
- 前端
- Web
- CSS

---

CSS，**C**ascading **S**tyle **S**heets，指层叠样式表，用于为结构化文档（如HTML）添加样式（字体、间距和颜色等）。起初由哈肯·维姆·莱和伯特·波斯合作设计，现由W3C定义和维护。

CSS将文件的内容与它的显示分隔开来：HTML只表达文章的结构，CSS表达所有的显示。当浏览器显示文档时，将文档的内容与其样式信息结合。它分两个阶段处理文档：
1. 浏览器将 HTML 和 CSS 转化成 DOM （文档对象模型）。DOM在计算机内存中表示文档。它把文档内容和其样式结合在一起。
2. 浏览器显示 DOM 的内容。
<!--more--> 

![CSS工作原理](https://mdn.mozillademos.org/files/11781/rendering.svg)


# CSS语法

样式表的主要组成块是CSS规则(rule)，或叫规则集(ruleset)。CSS规则由选择器和声明块两部分构成。
`selector {declaration1; declaration2; ... declarationN }`

选择器(selector)通常是需要改变样式的 HTML 元素。

声明(declaration)由一个属性和一个值组成。属性(property)是希望设置的样式属性(style attribute)，每个属性有一个值(value)。属性和值被冒号分开。
CSS声明会被放置在一个CSS声明块中——用一对大括号包裹，用`{`开始，用`}`结束。声明块里的每一个声明必须用半角分号`;`分隔。
![CSS声明块](https://mdn.mozillademos.org/files/3667/css%20syntax%20-%20declarations%20block.png)

CSS 语句(CSS statements)除了CSS 规则，还有其它类型，如下：
- @-规则(At-rules)在CSS中被用来传递元数据、条件信息或其它描述性信息。它由`@`符号开始，紧跟着一个表明它是哪种规则的描述符，之后是这种规则的语法块，并最终由一个半角分号`;`结束。每种由描述符定义的@-规则 ，都有其特有的内部语法和语义。一些例子如下：

  - [`@charset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset) 和 [`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import) （元数据）
  - [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 或 [`@document`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document) （条件信息，又被称为嵌套语句，见下方。)
  - [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face) （描述性信息）

- 嵌套语句，是@-规则中的一种，它的语法是 CSS 规则的嵌套块，只有在特定条件匹配时才会应用到文档上。特定条件如下：
  - [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 只有在运行浏览器的设备匹配其表达条件时才会应用该@-规则的内容；
  - [`@supports`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports) 只有浏览器确实支持被测功能时才会应用该@-规则的内容；
  - [`@document`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document) 只有当前页面匹配一些条件时才会应用该@-规则的内容。

CSS中的注释以 `/*` 开始并以 `*/` 结束。

浏览器会倾向于忽略CSS 中的许多空格；许多空格在那的意义仅仅是增加了可读性。

# 选择器

CSS里现在共有5种基本选择器(Basic Selectors)和2种伪选择器。不同选择器的优先级别和运作性能往往存在差异。

## 基本选择器
- 标签选择器（Type selector，元素选择器，类型选择器）——`element { style properties }`
通过node节点名称匹配元素，元素选择器会匹配该文档中所有此类型的元素。

- 类选择器(class selector)——`.class_name { style properties }`
根据元素的类属性中的内容匹配元素。类属性被定义为一个以空格分隔的列表项，在这组类名中，必须有一项与类选择器中的类名完全匹配。

- ID选择器(ID selector)——`#id_value { style properties }`
根据该元素的ID属性中的内容匹配元素，元素ID属性名必须与选择器中的ID属性名完全匹配。

- 通配选择器(Universal selector)
一个星号`*`就是一个通配选择器，它可以匹配任意类型的HTML元素。在CSS3中,星号`*`可以和命名空间组合使用：`ns|*`（匹配ns命名空间下的所有元素）、`*|*` （匹配所有命名空间下的所有元素）、`|*` （匹配所有没有命名空间的元素）

- 属性选择器(Attribute selector)
	属性选择器允许用户自定义属性名称，而不仅仅限于id，class属性。属性选择器共有7种。 
  `[attribute]`: 元素有attribute的属性。
	`[attribute="value"]`:	属性attribute里是value
	`[attribute~="value"]`:	属性attribute里使用空白分开的字符串里其中一个是value
	`[attribute|="value"]`:	属性attribute里是value或者以value-开头的字符串
	`[attribute^="value"]`:	属性attribute里最前的是value
	`[attribute$="value"]`:	属性attribute里最后的是value
	`[attribute*="value"]`:	属性attribute里有value出现过至少一次
类选择器等价于`[class~=class_name] { style properties }`
ID选择器等价于`[id=id_value] { style properties }`

## 伪选择器
- 伪类 (Pseudo-classes) `selector:pseudo-class {property: value}`
- 伪元素 (Pseudo-elements)`selector::pseudo-element {property:value;}`

## 组合选择符
CSS里现在共有4种组合选择符(Combinators):
- 相邻兄弟选择器(Adjacent sibling combinator)——`former_element + target_element { style properties }`
使用`+`连接两个选择器，当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中。

- 通用兄弟选择器(General sibling combinator)——`former_element ~ target_element { style properties }`
使用`~`连接两个选择器，当第二个元素跟(不一定是紧跟)在第一个元素之后，且他们都有一个共同的父元素，则第二个元素将被选中。

- 子选择器(Child combinator)——`selector1 > selector2 { style properties }`
使用`>`连接两个选择器，匹配第一个元素的直接后代(子元素)中的第二元素。

- 后代选择器(descendant combinator)——`selector1 selector2 { property declarations }`
使用一个或多个的空白字符连接两个选择器，匹配由第一个元素作为祖先元素的所有第二个元素(后代元素) 。后代选择器与子选择器很相似, 但是后代选择器不需要相匹配元素之间要有严格的父子关系。

## 选择器组
通过相互间用逗号分隔的多个选择器所形成的组，可以一次性将同一规则同时应用到多组选定元素。

# 数值与单位
CSS的属性值可以有很多种类：
- 数值: 长度值，用于指定例如元素宽度、边框（border）宽度或字体大小；以及无单位整数。用于指定例如相对线宽或运行动画的次数。
- 百分比: 可以用于指定尺寸或长度——例如取决于父容器的长度或高度，或默认的字体大小。
- 颜色: 用于指定背景颜色，字体颜色等。
- 坐标位置: 例如，以屏幕的左上角为坐标原点定位元素的位置。
- 函数: 例如，用于指定背景图片或背景图片渐变。

## 长度/尺寸单位

绝对单位（absolute units）：
- `px`: 像素
- `mm`, `cm`, `in`: 毫米（Millimeters），厘米（centimeters），英寸（inches）
- `pt`, `pc`: 点（Points (1/72 of an inch)）， 十二点活字（ picas (12 points)）

相对单位，相对于当前元素的字号（ font-size ）或者视口（viewport ）尺寸：
- `em`: 1em与当前元素的字体大小相同（更具体地说，一个大写字母M的宽度），其计算值默认为16像素。但是注意em单位是会继承父元素的字体大小。em是Web开发中最常用的相对单位。
- `ex`, `ch`: 分别是小写x的高度和数字0的宽度。这些并不像em那样被普遍使用或很好地被支持。
- `rem`: REM（root em）和em以同样的方式工作，但它总是等于默认基础字体大小的尺寸；继承的字体大小将不起作用。
- `vw`, `vh`: 分别是视口宽度的1/100和视口高度的1/100，其次，它不像rem那样被广泛支持。
  
## 颜色
CSS中指定颜色的方法有很多：
- 颜色关键词：最简单、最古老的颜色类型。特定字符串代表特定颜色值。HTML 和 CSS 颜色规范中定义了 147 中颜色名（17 种标准颜色加 130 种其他颜色）——请参考[表格](http://www.w3school.com.cn/cssref/css_colornames.asp)。
- 十六进制值：每个颜色包括一个哈希/磅符号（#）和其后面紧跟的六个十六进制数，每对十六进制数代表一个通道（红色、绿色或者蓝色）允许我们指定256个可用值。 
- RGB：一个RGB值是一个函数——rgb() ——给定的三个参数，分别表示红色，绿色和蓝色通道的颜色值。
- HSL：hsl()函数接受三个表示色调、饱和度以及明度的参数。
- RGBA和HSLA：RGB和HSL添加了透明度（ transparency ）。
- opacity 属性：指定透明度。



# 层叠和继承

一个元素的样式，可以通过多种方式来定义，而多种定义方式之间通过复杂的影响关系决定了元素的最终样式。这种复杂既造就了CSS的强大，也导致CSS显得如此“混乱”而且难以调试。

## 层叠

对于层叠来说，共有三种主要的样式来源：

- 浏览器对HTML定义的默认样式
- 用户定义的样式
- 开发者定义的样式，可以有三种形式：
  - 定义在外部文件（外部样式表）
  - 在页面的头部定义（内部样式表）
  - 定义在特定的元素身上（内联样式）

从上到下，优先级越来越高。

CSS 是 *Cascading Style Sheets* 的缩写，这暗示层叠(cascade)的概念是很重要的。在最基本的层面上，它表明CSS规则的顺序很重要，但它比那更复杂。什么选择器在层叠中胜出取决于三个因素（这些都是按重量级顺序排列的——前面的的一种会否决后一种）：
1. 重要性(Importance)
2. 专用性(Specificity)
3. 源代码次序(Source order)

**重要性**
在CSS中，有一个特别的语法可以让一条规则总是优先于其他规则：`!important`。把它加在属性值的后面可以使这条声明有无比强大的力量。

**专用性**
专用性基本上是衡量选择器的具体程度的一种方法——它能匹配多少元素。元素选择器具有很低的专用性。类选择器具有更高的专用性，所以将战胜元素选择器。ID选择器有甚至更高的专用性, 所以将战胜类选择器。战胜ID选择器的唯一方法是使用 `!important`。

一个选择器具有的专用性的量是用四种不同的值（或组件）来衡量的，它们可以被认为是千位，百位，十位和个位——在四个列中的四个简单数字：
1. 千位：如果声明是在`style` 属性中该列加1分（这样的声明没有选择器，所以它们的专用性总是1000。）否则为0。
2. 百位：在整个选择器中每包含一个ID选择器就在该列中加1分。
3. 十位：在整个选择器中每包含一个类选择器、属性选择器、或者伪类就在该列中加1分。
4. 个位：在整个选择器中每包含一个元素选择器或伪元素就在该列中加1分。

**源代码次序**
如果多个相互竞争的选择器具有相同的重要性和专用性，那么第三个因素将帮助决定哪一个规则获胜——后面的规则将战胜先前的规则。

## 继承

CSS中，应用于某个元素的一些属性值将由该元素的子元素继承，而有些则不会。
如，对 `font-family`和`color`进行继承是有意义的，因为这使得您可以很容易地设置一个站点范围的基本字体。而让`margin`，`padding`，`border` 和 `background-image`不被继承是有意义的。想象一下，如果在容器元素上设置这些属性并让它们由每个子元素继承，那么样式/布局会发生混乱，然后必须在每个单独的元素上取消它们。

哪些属性默认被继承哪些不被继承大部分符合常识。如果你想确定，你可以参考[CSS参考资料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)—— 每个单独的属性页都会从一个汇总表开始，其中包含有关该元素的各种详细信息，包括是否被继承。

CSS为处理继承提供了四种特殊的通用属性值：

- [`inherit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)： 该值将应用到选定元素的属性值设置为与其父元素一样。
- [`initial`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial) ：该值将应用到选定元素的属性值设置为与浏览器默认样式表中该元素设置的值一样。如果浏览器默认样式表中没有设置值，并且该属性是自然继承的，那么该属性值就被设置为 `inherit`。
- [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset) ：该值将属性重置为其自然值，即如果属性是自然继承的，那么它就表现得像 `inherit`，否则就是表现得像 `initial`。
- [`revert`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/revert) ：如果当前的节点没有应用任何样式，则将该属性恢复到它所拥有的值。换句话说，属性值被设置成自定义样式所定义的属性（如果被设置）， 否则属性值被设置成用户代理的默认样式。

# 框模型
CSS框模型（译者注：也被称为“盒模型”）是网页布局的基础 ——每个元素被表示为一个矩形的方框，框的内容、内边距、边界和外边距，一层包着一层构建起来。
## 框属性
文档的每个元素被构造成文档布局内的一个矩形框，框每层的大小都可以使用一些特定的CSS属性调整。相关属性如下:
<img src="https://mdn.mozillademos.org/files/13647/box-model-standard-small.png" alt="框模型" style=" width: 100%;">
- width 和 height
  width 和 height 设置内容框（content box）的宽度和高度。内容框是框内容显示的区域——包括框内的文本内容，以及表示嵌套子元素的其它框。
- padding
  padding 表示一个 CSS 框的内边距 ——这一层位于内容框的外边缘与边界的内边缘之间。该层的大小可以通过简写属性padding 一次设置所有四个边，或用 padding-top、padding-right、padding-bottom 和 padding-left 属性一次设置一个边。
- border
  CSS 框的边界（border）是一个分隔层，位于内边距的外边缘以及外边距的内边缘之间。边界的默认大小为0——从而让它不可见——不过我们可以设置边界的厚度、风格和颜色让它出现。 border 简写属性可以让我们一次设置所有四个边，例如 `border: 1px solid black;` 但这个简写可以被各种普通书写的更详细的属性所覆盖：
  border-top, border-right, border-bottom, border-left: 分别设置某一边的边界厚度／风格／颜色。
  border-width, border-style, border-color: 分别仅设置边界的厚度／风格／颜色，并应用到全部四边边界。
  可以单独设置某一个边的三个不同属性，如 border-top-width, border-top-style, border-top-color，等。 
- margin
  外边距（margin）代表 CSS 框周围的外部区域，称为外边距，它在布局中推开其它 CSS 框。其表现与 padding 很相似；简写属性为 margin，单个属性分别为 margin-top、margin-right、margin-bottom 和 margin-left。

很明显，框的总宽度是width, padding-right, padding-left, border-right以及 border-left 属性之和。box-sizing 属性可以被用来调整这些表现:
- content-box： 默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box：边框和内边距的值是包含在width内的。也就是说，将一个元素的width设为100px，那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。
一些专家甚至建议所有的Web开发者们将所有的元素的box-sizing都设为border-box。



## 框类型
可以通过display属性来设定元素的框类型。display属性有很多的属性值，三个最常见的类型：
- 块框（ block box）：定义为堆放在其他框上的框，而且可以设置它的宽高。

- 行内框（ inline box）：与块框是相反的，它随着文档的文字流动，设置宽高无效，设置padding, margin 和 border都会更新周围文字的位置，但是对于周围的的块框（ block box）不会有影响。

- 行内块状框（inline-block box） ：它不会重新另起一行但会像行内框（ inline box）一样随着周围文字而流动，而且他能够设置宽高，并且像块框一样保持了其块特性的完整性，它不会在段落行中断开。

  注意：默认状态下display属性值，块级元素display: block ，行内元素display: inline

# 参考资料

1. [CSS — 设计 Web | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
2. [CSS教程 | W3school](http://www.w3school.com.cn/css/index.asp)