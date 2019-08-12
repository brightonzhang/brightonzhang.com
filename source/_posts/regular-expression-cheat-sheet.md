title: 正则表达式速查手册
catalog: true
date: 2019-08-06 17:51:26
updated: 2019-08-06 17:51:26
subtitle:
cover: XlxL1lJxA2LmUxQ.jpg
categories: 巧计
tags:

- 正则表达式

---
本文包括正则表达式流派介绍，常用元字符、元转义序列、特殊构造等语法元素整理，以及匹配模式、方括号表达式以及字符组运算等，可以作为正则表达式日常使用查阅手册。
<!--more--> 
# 流派
目前正则表达式主要有两大流派：POSIX 流派与 PCRE 流派。
* POSIX(Portable Operating System Interface for uniX) 流派：POSIX 规范定义了正则表达式的 BRE（Basic Regular Expression）和 ERE（Extended Regular Express）两种标准，两者主要的差异是在元字符的转义上。vi/vim、grep 和 sed 遵循 BRE 标准，egrep、awk 则遵循 ERE 标准。
* PCRE(Perl Compatible Regular Expression) 流派：源于 Perl，是目前大部分编程语言中的正则表达式语法——各个语言实现也有些许差异。\d、\w、\s 之类的字符组简记法，是这个流派的显著特征。

更多流派差异，请参考[Regexp Syntax Summary](http://www.greenend.org.uk/rjk/tech/regexp.html)。

# 常用元字符metacharacter
## 通用元字符
{% bootstraptable 'table-bordered table-striped'  %}
| 代码  | 说明                       |
| ---- | -------------------------- |
| `.` | 匹配除换行符以外的任意字符 |
| `^` | 匹配字符串的开始           |
| `$` | 匹配字符串的结束           |
{% endbootstraptable %}

## PCRE特有元字符
{% bootstraptable 'table-bordered table-striped'  %}
| 代码 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| `\b` | 匹配一个单词边界，也就是指单词和空格间的位置。               |
| `\B` | 匹配非单词边界。                                             |
| `\d` | 匹配一个数字字符。等价于`[0-9]`。                              |
| `\D` | 匹配一个非数字字符。等价于`[^0-9]`。                           |
| `\f` | 匹配一个换页符。                                             |
| `\n` | 匹配一个换行符。                                             |
| `\r` | 匹配一个回车符。                                             |
| `\t` | 匹配一个制表符。                                             |
| `\v` | 匹配一个垂直制表符。                                         |
| `\s` | 匹配任何空白字符，包括空格、制表符、换页符等等。等价于`[ \f\n\r\t\v]`。 |
| `\S` | 匹配任何非空白字符。等价于[^ \f\n\r\t\v]。                   |
| `\w` | 匹配包括下划线的任何单词字符。等价于`[A-Za-z0-9_]`。注意Unicode正则表达式会匹配中文字符。 |
| `\W` | 匹配任何非单词字符。等价于`[^A-Za-z0-9_]`。                |
{% endbootstraptable %}


## POSIX字符组
{% bootstraptable 'table-bordered table-striped'  %}
| 代码 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| `[:alnum:]` | 字母字符和数字字符 |
| `[:alpha:]` | 字母 |
| `[:ascii:]` | ASCII字符 |
| `[:blank:]` | 空格字符和制表符 |
| `[:cntrl:]` | 控制字符 |
| `[:digit:]` | 数字字符 |
| `[:graph:]` | 空白字符之外的字符 |
| `[:lower:]` | 小写字母字符 |
| `[:print:]` | 类似`[:graph:]`，但包括空白字符 |
| `[:punct:]` | 标点符号 |
| `[:space:]` | 空白字符 |
| `[:upper:]` | 大写字母字符 |
| `[:word:]` | 字母字符 |
| `[:xdigit:]` | 十六进制字符 |
{% endbootstraptable %}

# 重复
{% bootstraptable 'table-bordered table-striped'  %}
| PCRE/POSIX ERE代码 | POSIX BRE代码 | 说明                                                         |
| ----------------- | ------------ | ------------------------------------------------------------ |
|  `*`  |  `*`  | 匹配前面的子表达式零次或多次。 |
|  `+`  |  `\+`  | 匹配前面的子表达式一次或多次。 |
|  `?`  |  `\?`  | 匹配前面的子表达式零次或一次。 |
|  `{n}`  |  `\{n\}`  | n是一个非负整数。匹配确定的n次。 |
|  `{n,}`  |  `\{n,\}`  | n是一个非负整数。至少匹配n次。 |
|  `{n,m}`  |  `\{n,m\}`  | m和n均为非负整数，其中n<=m。最少匹配n次且最多匹配m次。 |
{% endbootstraptable %}

## 贪婪与懒惰
{% bootstraptable 'table-bordered table-striped'  %}
| PCRE代码 | 说明                                                         |
|  :--:  | ------------------------------------------------------------ |
|  `?`  | 非贪心量化（Non-greedy quantifiers）：<br/>当该字符紧跟在任何一个其他重复修饰符（*,+,?，{n}，{n,}，{n,m}）后面时，<br/>匹配模式是非贪婪的，或说懒惰的。<br/>非贪婪模式尽可能少的匹配所搜索的字符串，<br/>而默认的贪婪模式则尽可能多的匹配所搜索的字符串。<br/>例如，对于字符串“oooo”，“o+?”将匹配单个“o”，而“o+”将匹配所有“o”。 |
{% endbootstraptable %}

# 字符集合`[ ]`
{% bootstraptable 'table-bordered table-striped'  %}
| 代码 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| `[xyz]` | 字符集合（character class）。匹配所包含的任意一个字符。<br/>例如，“`[abc]`”可以匹配“plain”中的“a”。<br/>特殊字符仅有反斜线\保持特殊含义，用于转义字符。<br/>其它特殊字符如星号、加号、各种括号等均作为普通字符。<br/>脱字符^如果出现在首位则表示负值字符集合；如果出现在字符串中间就仅作为普通字符。<br/>连字符 - 如果出现在字符串中间表示字符范围描述；如果如果出现在首位（或末尾）则仅作为普通字符。<br/>右方括号应转义出现，也可以作为首位字符出现。 |
| `[^xyz]` | 排除型字符集合（negated character classes）。匹配未列出的任意字符。<br/>例如，“`[^abc]`”可以匹配“plain”中的“plin”。 |
| `[a-z]` | 字符范围。匹配指定范围内的任意字符。<br/>例如，“`[a-z]`”可以匹配“a”到“z”范围内的任意小写字母字符。 |
| `[^a-z]` | 排除型的字符范围。匹配任何不在指定范围内的任意字符。<br/>例如，“`[^a-z]`”可以匹配任何不在“a”到“z”范围内的任意字符。 |
{% endbootstraptable %}

# 分组`( )`与后向引用

{% bootstraptable 'table-bordered table-striped'  %}
| PCRE代码 | 说明                                                         |
|  --  | ------------------------------------------------------------ |
|`(pattern)`  | 匹配pattern并获取这一匹配的子字符串。该子字符串用于向后引用。 |
|`(?<name>pattern)`  | 匹配pattern并获取这一匹配的子字符串名称为name的组里，也可以写成`(?'name'pattern)`。 |
|`(?:pattern)`  | 匹配pattern但不获取匹配的子字符串（shy groups），即非获取匹配，不存储匹配的子字符串用于向后引用。 |
|`(?=pattern)`  | 正向肯定预查（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串，非获取匹配。<br/>如`\b\w+(?=ing\b)`，匹配以ing结尾的单词的前面部分(除了ing以外的部分)，如查找*I'm singing while you're dancing.*时，它会匹配sing和danc。 |
|`(?!pattern)`  | 正向否定预查（negative assert），在任何不匹配pattern的字符串开始处匹配查找字符串，非获取匹配。<br/>如`\d{3}(?!\d)`匹配三位数字，而且这三位数字的后面不能是数字。 |
|`(?<=pattern)`  | 反向（look behind）肯定预查，与正向肯定预查类似，只是方向相反。<br/>如`(?<=\bre)\w+\b`会匹配以re开头的单词的后半部分(除了re以外的部分)，例如在查找*reading a book*时，它匹配ading。 |
|`(?<!pattern)`  | 反向否定预查，与正向否定预查类似，只是方向相反。<br/>如`(?<![a-z])\d{7}`匹配前面不是小写字母的七位数字。 |
|`(?#comment)`  | 注释，不对正则表达式的处理产生任何影响。 |
{% endbootstraptable %}

使用小括号指定一个子表达式后，匹配这个子表达式的文本(也就是此分组捕获的内容)可以在表达式或其它程序中作进一步的处理。默认情况下，每个分组会自动拥有一个组号，规则是：从左向右，以分组的左括号为标志，第一个出现的分组的组号为1，第二个为2，以此类推——分组0对应整个正则表达式。

后向引用用于重复搜索前面某个分组匹配的文本。例如，\1代表分组1匹配的文本。示例如`\b(\w+)\b\s+\1\b`可以用来匹配重复的单词，像*go go*, 或者*kitty kitty*。这个表达式首先是一个单词，也就是单词开始处和结束处之间的多于一个的字母或数字`(\b(\w+)\b)`，这个单词会被捕获到编号为1的分组中，然后是1个或几个空白符`(\s+)`，最后是分组1中捕获的内容（也就是前面匹配的那个单词）(`\1`)。

还也可以自己指定子表达式的组名。要指定一个子表达式的组名，请使用这样的语法：`(?<Word>\w+)`(或`(?'Word'\w+)`),这样就把`\w+`的组名指定为Word了。要反向引用这个分组捕获的内容，你可以使用`\k<Word>`,所以上一个例子也可以写成这样：`\b(?<Word>\w+)\b\s+\k<Word>\b`。

实际上组号分配过程是要从左向右扫描两遍的：第一遍只给未命名组分配，第二遍只给命名组分配－－因此所有命名组的组号都大于未命名的组号。


# 分支条件
<div class="table-responsive"><table class="table table-bordered table-striped"><thead><tr><th>PCRE代码</th><th>说明</th></tr></thead><tbody><tr><td><code>x|y</code></td><td>如果满足x或y任意一种规则则匹配。<br/>没有包围在()里，其范围是整个正则表达式。如<code>z|food</code>能匹配“z”或“food”。而<code>(?:z|f)ood</code>则匹配“zood”或“food”。<br>使用分支条件时，要注意各个条件的顺序。因为匹配分支条件时，将会从左到右地测试每个条件，如果满足了某个分的话，就不会去再管其它的条件了。</td></tr></tbody></table></div>
# 更多功能
平衡组/递归匹配...

# 参考资料
[正则表达式30分钟入门教程](https://deerchao.net/tutorials/regex/regex.htm)

[刨根究底正则表达式之一：正则表达式概述](https://www.infoq.cn/article/regular-expressions-introduction-part01)

https://en.wikipedia.org/wiki/Regular_expression

[一个由正则表达式引发的血案](https://zhuanlan.zhihu.com/p/46294360)