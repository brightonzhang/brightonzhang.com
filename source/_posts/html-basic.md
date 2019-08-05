---
title: 前端开发：HTML入门
catalog: true
date: 2016-03-18 12:05:32
subtitle:
cover:  "639852830.jpg"
updated: 2016-03-18 15:43:09
categories:
- 技术
tags:
- 前端
- Web
- HTML
---

HTML ，**H**yper **T**ext **M**arkup **L**anguage，超文本标记语言。
HTML 不是一种编程语言，而是一种*标记语言* (markup language)—— 标记语言是一套*标记标签* (markup tag)。
HTML 使用*标记标签*来描述网页。
<!--more--> 

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

XHTML, E**X**tensible **H**yper**T**ext **M**arkup **L**anguage, 可扩展超文本标记语言，是以XML应用的方式定义的更严格更纯净的HTML版本。


# 标签、元素和属性

HTML标记标签通常被称为HTML**标签**(HTML tag)。浏览器不会显示HTML标签，而是使用标签来解释页面的内容。
HTML标签是由尖括号包围的关键词，比如` <html>`。HTML标签通常是成对出现的，标签对中的第一个标签是开始标签(start tag)，也称开放标签(opening tag)；第二个标签是结束标签(end tag)或言闭合标签(closing tag)。

常用标签：
标题(Headin)：` <h1>` - `<h6>` 。（`<h1>` 定义最大的标题，`<h6>` 定义最小的标题）
段落(Paragraph)：`<p>`
链接：`<a>` 
图像：`<img>` 
表格：`<table>` 。每个表格均有若干行 `<tr>` ，每行被分割为若干单元格`<td>` 
列表：无序列表 `<ul>` ，有序列表始于 `<ol>` 。每个列表项 `<li>`
分割线：`<hr />` 
换行： `<br />` 
注：对于 HTML，您无法通过在HTML代码中添加额外的空格或换行来改变输出的效果。当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格。需要注意的是，HTML代码中的所有连续的空行（换行）也被显示为一个空格。

更多HTML标签请参考：[HTML标签列表](http://www.w3school.com.cn/tags/html_ref_byfunc.asp)

<u>从开始标签到结束标签的所有内容</u>是HTML**元素**(Elements)。没有内容的HTML元素被称为空元素。空元素是在开始标签中关闭的——在开始标签中添加斜杠，比如 `<br />`，是关闭空元素的正确方法。
大多数HTML元素可以嵌套。HTML文档由嵌套的HTML元素构成。

HTML元素可以拥有**属性**(Attributes)。属性赋予元素意义和语境。
属性总是在开始标签中规定，通常以名称/值对(`name="value"`)的形式出现。

如，链接由 `<a>` 标签定义。链接的地址在href属性中指定：`<a href="https://brightonzhang.com/">Brighton</a>`

更多属性请参考：[HTML 全局属性](<http://www.w3school.com.cn/tags/html_ref_standardattributes.asp>)

# head

head元素是头部元素，它包含的内容不会在页面中显示。head元素可以包含标题信息，元信息，样式表和脚本等。
`<meta>`标签提供了页面相关数据信息，如`<meta charset="utf-8">`定义了该文档使用 utf-8 字符编码集。还可以通过`<meta>`标签设置页面的描述、关键词等信息，这些信息有利于SEO（Search Engine Optimization，搜索引擎优化），也就是利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。
`<title>`标签定义了页面的标题，浏览器标签栏上的标题便是由它定义的。
`<link>`标签通常用来链接一些与页面相关的外部资源，比如css文件。我们也能通过它来设置浏览器标签栏上的图标:`<link rel="icon" href="xxx.ico">`
`<style>`标签可直接定义样式信息——`<link>`标签引入外部css文件之外的方法。
`<script>`标签为页面引入脚本文件，我们可直接使用它的 src 属性，引入脚本文件的地址，也可以直接在页面中插入JavaScript代码。
在 HTML5 中，style标签和script标签的type值都不再是必须的，默认值分别为“text/css”和“text/javascript”。


# 样式
## CSS
样式Style是HTML 4引入的，它是一种新的首选的改变HTML元素样式的方式。有3种方式为HTML元素添加样式：

1. 内联样式：使用style属性直接将样式添加到HTML元素。

```html
<h1 style="color:blue;">This is a Blue Heading</h1>
```

2. 内部样式表：在`<head>`部分通过`<style>`标签定义。
```html
<head>
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
```

3. 外部样式表：使用独立的样式表CSS文件并链接。

```html
<head>
<link rel="stylesheet" type="text/css" href="theme.css" />
</head>
```

## 格式化标签
另外，HTML定义了很多格式化输出的标签，用于改变文本的外观和含义，可以分成两类：基于内容的样式（content-based style）和物理样式(physical style)。

基于内容的样式标签会告诉浏览器它所包含的文本具有特定的含义、上下文或者用法。然后浏览器就会把与该含义、上下文或者用法一致的格式应用在文本上。这些标签包括：[`<abbr>`](http://www.w3school.com.cn/tags/tag_abbr.asp), [`<acronym>`](http://www.w3school.com.cn/tags/tag_acronym.asp), [`<cite>`](http://www.w3school.com.cn/tags/tag_cite.asp), [`<code>`](http://www.w3school.com.cn/tags/tag_code.asp), [`<dfn>`](http://www.w3school.com.cn/tags/tag_dfn.asp), [`<em>`](http://www.w3school.com.cn/tags/tag_em.asp), [`<kbd>`](http://www.w3school.com.cn/tags/tag_kbd.asp), [`<samp>`](http://www.w3school.com.cn/tags/tag_samp.asp), [`<strong>`](http://www.w3school.com.cn/tags/tag_strong.asp), [`<var>`](http://www.w3school.com.cn/tags/tag_var.asp)。

物理样式则直接指定文本的显示方式。当前的 HTML/XHTML 标准一共提供了9种物理样式，包括粗体bold[`<b>`](http://www.w3school.com.cn/tags/tag_b.asp), 斜体italic[`<i>`](http://www.w3school.com.cn/tags/tag_i.asp), 等宽monospaced[`<tt>`](http://www.w3school.com.cn/tags/tag_tt.asp), 下划线underlined[`<u>`](http://www.w3school.com.cn/tags/tag_u.asp), 删除线strikethrough[`<s>`](http://www.w3school.com.cn/tags/tag_s.asp)/[`<strike>`](http://www.w3school.com.cn/tags/tag_strike.asp), 放大larger[`<big>`](http://www.w3school.com.cn/tags/tag_big.asp), 缩小smaller[`<small>`](http://www.w3school.com.cn/tags/tag_small.asp), 上标superscripted[`<sup>`](http://www.w3school.com.cn/tags/tag_sup.asp)和下标subscripted[`<sub>`](http://www.w3school.com.cn/tags/tag_sub.asp)。

在使用HTML或XHTML时，除非极少情况下，都应该避免使用物理标签。应当尽可能地向浏览器提供上下文信息，并使用基于内容的样式。

# 块与类

大多数HTML元素被定义为块级元素或内联元素：
- 块级元素, block level element，在浏览器显示时，通常会以新行来开始（和结束），如：`<h1>`, `<p>`, `<ul>`, `<table>`
- 内联元素，inline element，在显示时通常不会以新行开始，如：`<b>`, `<td>`, `<a>`, `<img>`

HTML`<div>`元素是块级元素，它是可用于组合其他HTML元素的容器，没有特定的含义。`<span>`元素是内联元素，可用作文本的容器，也没有特定的含义。
与CSS一同使用，`<div>`元素可用于对大的内容块设置样式属性，`<span>`元素可用于为部分文本设置样式属性。

对HTML进行分类（设置类），使我们能够为元素的类定义CSS样式。为相同的类设置相同的样式，或者为不同的类设置不同的样式。
设置`<div>`元素的类，使我们能够为相同的`<div>`元素设置相同的样式；设置`<span>`元素的类，能够为相同的`<span>`元素设置相同的样式。

```html
<!DOCTYPE html>
<html>
<head>
<style>
.cities {
  background-color: black;
  color: white;
  margin: 20px;
  padding: 20px;
} 
</style>
</head>
<body>

<div class="cities">
  <h2>London</h2>
  <p>London is the capital of England.</p>
</div>

<div class="cities">
  <h2>Paris</h2>
  <p>Paris is the capital of France.</p>
</div>

<div class="cities">
  <h2>Tokyo</h2>
  <p>Tokyo is the capital of Japan.</p>
</div>

</body>
</html>
```

[点击测试上述代码](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_classes_capitals)

`<div>`元素的另一个常见的用途是文档布局——通过CSS对其进行定位。


# 框架

通过使用框架，可以在同一个浏览器窗口中显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架。

框架结构标签`<frameset>`，或称框架集，定义了如何将窗口分割为框架，每个frameset定义了一系列行或列，rows/columns的值规定了每行或每列占据屏幕的面积。

框架标签`<frame>`定义了放置在每个框架中的HTML文档。

```html
<html>

<frameset rows="50%,50%">

<frame src="/example/html/frame_a.html">

<frameset cols="25%,75%">
<frame src="/example/html/frame_b.html">
<frame src="/example/html/frame_c.html">
</frameset>

</frameset>

</html>
```
[点击测试上述代码](http://www.w3school.com.cn/tiy/t.asp?f=html_frame_mix)


内联框架`<iframe>` 用于在网页内显示网页。

```html
<!DOCTYPE html>
<html>
<body>

<h2>Iframe - Target for a Link</h2>

<iframe height="300px" width="100%" src="demo_iframe.htm" name="iframe_a"></iframe>

<p><a href="https://www.w3schools.com" target="iframe_a">W3Schools.com</a></p>

<p>When the target of a link matches the name of an iframe, the link will open in the iframe.</p>

</body>
</html>
```
[点击测试上述代码](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe_target)


# 表单

`<form>` 元素定义HTML表单——用于搜集不同类型的用户输入。
HTML 表单包含表单元素，如不同类型的`<input>`元素、`<select>` 下拉列表、`<textarea>`文本域、`<button>`可点击的按钮等等。

`<input>` 元素是最重要的表单元素。它根据不同的type属性，有很多形态，如text——定义常规文本输入，radio——定义单选按钮输入，submit——定义提交按钮（提交表单）。

`<form>` 元素的action 属性定义在提交表单时执行的动作，method 属性规定在提交表单时所用的HTTP方法：GET（默认值）或POST。
如果要正确地被提交，每个输入字段必须设置一个name属性。


```html
<!DOCTYPE html>
<html>
<body>

<h2>The name Attribute</h2>

<form action="/action_page.php">
  First name:<br>
  <input type="text" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 

<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

<p>Notice that the value of the "First name" field will not be submitted, because the input element does not have a name attribute.</p>

</body>
</html>
```
[点击测试上述代码](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit_id)

`<fieldset>`元素可将表单内的相关元素分组组合。当一组表单元素放到`<fieldset>`标签内时，浏览器会以特殊方式来显示它们，它们可能有特殊的边界、3D 效果，或者甚至可创建一个子表单来处理这些元素。

`<legend>`元素为`<fieldset>`元素定义标题。

# 脚本

`<script>`标签用于定义客户端脚本，比如 JavaScript。
script元素既可包含脚本语句，也可通过src属性指向外部脚本文件；另外type属性规定脚本的MIME类型。
```html
<!DOCTYPE html>
<html>
<body>

<h2>Use JavaScript to Change Text</h2>
<p>This example writes "Hello JavaScript!" into an HTML element with id="demo":</p>

<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script> 

</body>
</html>
```
[点击测试上述代码](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_script)

`<noscript>`标签提供无法使用脚本时的替代内容。noscript元素可包含普通HTML页面的body元素中能够找到的所有元素。只有在浏览器不支持脚本或者禁用脚本时，才会显示noscript元素中的内容。

# DOM

DOM，Document Object Model（文档对象模型），定义了访问HTML和XML文档的标准：“W3C DOM是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。”

HTML DOM是关于如何获取、修改、添加或删除HTML元素的标准。

根据W3C的HTML DOM标准，HTML文档中的所有内容都是节点：

- 整个文档是一个文档节点
- 每个HTML元素是元素节点
- HTML元素内的文本是文本节点
- 每个HTML属性是属性节点
- 注释是注释节点

HTML DOM将HTML文档视作树结构——节点树。

![HTML DOM节点树示例](https://upload.wikimedia.org/wikipedia/commons/5/5a/DOM-model.svg)

可通过JavaScript（以及其他编程语言）对HTML DOM进行访问。所有HTML元素被定义为对象，而编程接口则是对象方法和对象属性：

- 方法是能够执行的动作（比如添加或修改元素）。
- 属性是能够获取或设置的值（比如节点的名称或内容）。

一些常用的HTML DOM方法：

- getElementById(id) - 获取带有指定id的节点（元素）
- appendChild(node) - 插入新的子节点（元素）
- removeChild(node) - 删除子节点（元素）

一些常用的HTML DOM属性：

- innerHTML - 节点（元素）的文本值
- parentNode - 节点（元素）的父节点
- childNodes - 节点（元素）的子节点
- attributes - 节点（元素）的属性节点

# 参考资料
1. [HTML简介 | 前端九部-入门者手册2019](https://www.yuque.com/fe9/basic/hw5ara)
2. [HTML教程 | W3school](http://www.w3school.com.cn/html/index.asp)