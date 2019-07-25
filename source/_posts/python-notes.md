---
title: Python笔记：入门篇(Python 2)
catalog: true
date: 2018-07-10 10:56:44
subtitle:
cover: "2AIEQMwjaAihNME0.jpg"
updated: 2018-07-10 10:56:44
categories:
- 技术
tags: Python
---

本文主要根据Google Python课程整理，主要为帮助自己记录重点，也可作为其他语言（如C/C++）程序员学习Python的参考资料。

注意：本文以Python 2为主。关于Python 2与Python 3的差异可以参考[Python3与Python2主要不兼容差异](https://brightonzhang.com/zh/2019/python3-python2/)。
<!--more--> 

# 入门

* Python语句无需分号结束。
* 注释以 '#' 开始，直到该行结束。

python代码示例：

```python
#!/usr/bin/env python

# import modules used here -- sys is a very standard one
import sys

# Gather our code in a main() function
# The def keyword defines the function with its parameters 
# within parentheses and its code indented. 
def main():
    print 'Hello there', sys.argv[1]
    # Command line args are in sys.argv[1], sys.argv[2] ...
    # sys.argv[0] is the script name itself and can be ignored

# Standard boilerplate to call the main() function to begin
# the program.
# When a Python file is run directly, the special variable 
# "__name__" is set to "__main__". 
if __name__ == '__main__':
    main()
```

注意：

* def用来定义函数。
* 如果直接运行Python文件，特殊变量`__name__`会被设置为 `__main__`。所以像上面一样，可以用`if __name__ ==…`来控制main()在直接运行时或被包含时是否执行。

The outermost statements in a Python file, or "module", do its one-time setup — those statements run from top to bottom the first time the module is imported somewhere, setting up its variables and functions. 

## 缩进

Python的一个不寻常的特性是代码的空白缩进影响代码含义。一个代码逻辑块，如一个函数代码，应该有相同的缩进，与它的父函数或if语句或其他的缩进区分开来。由于不同平台或不同IDE上TABs可能有不同含义，所以建议避免在Python中使用TABs——在编辑器中设置空格替换TABs。至于说应该缩进多少个空格，Python官方建议是4个空格[the official Python style guide (PEP 8)](http://python.org/dev/peps/pep-0008/#indentation)。而Google的内部规范却是2个空格。

## 模块与命名空间

模块是最高级别的程序组成单元，它将程序代码和数据封装起来以便重用。模块往往对应Python程序文件。每一个文件都是一个模块，并且模块导入其他模块后可以使用导入模块定义的变量名。

每个模块都有他们自己的命名空间。

假如有个模块“pinky.py”包含“def foo()”，foo函数的完整名称是“binky.foo”。

## help(), dir()

Inside the Python interpreter, the help() function pulls up documentation strings for various modules, functions, and methods.  

The dir() function tells you what the attributes of an object are. 

```shell
SWAN:Brighton ~$ python
Python 2.7.14 (default, Oct 22 2017, 15:36:48) 
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.38)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> help(sys)
#help on built-in module sys:
#
#NAME
#    sys
#
#FILE
#    (built-in)
#
#MODULE DOCS
#    https://docs.python.org/library/sys
#
#DESCRIPTION
#    This module provides access to some objects used or maintained by the
#    interpreter and to functions that interact strongly with the interpreter.
#    ...
>>> dir(sys)
['__displayhook__', '__doc__', '__excepthook__', '__name__', '__package__', '__stderr__', '__stdin__', '__stdout__', '_clear_type_cache', '_current_frames', '_getframe', '_git', 'api_version', 'argv', 'builtin_module_names', 'byteorder', 'call_tracing', 'callstats', 'copyright', 'displayhook', 'dont_write_bytecode', 'exc_clear', 'exc_info', 'exc_type', 'excepthook', 'exec_prefix', 'executable', 'exit', 'flags', 'float_info', 'float_repr_style', 'getcheckinterval', 'getdefaultencoding', 'getdlopenflags', 'getfilesystemencoding', 'getprofile', 'getrecursionlimit', 'getrefcount', 'getsizeof', 'gettrace', 'hexversion', 'long_info', 'maxint', 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path', 'path_hooks', 'path_importer_cache', 'platform', 'prefix', 'ps1', 'ps2', 'py3kwarning', 'setcheckinterval', 'setdlopenflags', 'setprofile', 'setrecursionlimit', 'settrace', 'stderr', 'stdin', 'stdout', 'subversion', 'version', 'version_info', 'warnoptions']
>>> quit()
SWAN:Brighton ~$ 
```



# Strings

Python中有个名为“str”的内建字符串类型。字符串常量可以使用单引号或双引号包括——单引号使用更多一些。反斜杠在单引号和双引号都可以转义。双引号中可以直接包含单引号（如 "I didn't do it"），就像单引号也可以直接包含双引号一样。一个字符串常量可以分为多行，但每行行尾需要有反斜杠。三重引号，"""或'''，可以方便的实现多行文本。

Python字符串是不可变的，即创建之后不可更改。因为字符串不可改变，当我们计算值是构建了一个新的字符串。

字符串中的字符可以用[]访问，序列从0开始。序列越界，Python会报错。

'+'不会自动将数字或其他类型转换为字符串。

```python
  pi = 3.14
  ##text = 'The value of pi is ' + pi      ## NO, does not work
  text = 'The value of pi is '  + str(pi)  ## yes
```

对于数字，标准运算符，+，/，*正常工作。没有++，但+=，-=有效。对于整数除法，最好使用两个斜线，如6//5是1。

The "print" operator prints out one or more python items followed by a newline (leave a trailing comma at the end of the items to inhibit the newline).

“raw”字符串常量是以‘r’开头的，后续字符中的反斜杠不再特殊处理。所以`r'x\nx'`值就是4个字符的 'x\nx'. ’u‘前缀则表示unicode字符串常量。

```python
  raw = r'this\t\n and that'
  print raw     ## this\t\n and that
    
  multi = """It was the best of times.
  It was the worst of times."""
```


##  字符串方法

如下是最常用的字符串方法：

- s.lower(), s.upper() -- returns the lowercase or uppercase version of the string
- s.strip() -- returns a string with whitespace removed <u>from the start and end</u>
- s.isalpha()/s.isdigit()/s.isspace()... -- tests if all the string chars are in the various character classes
- s.startswith('other'), s.endswith('other') -- tests if the string starts or ends with the given other string
- s.find('other') -- searches for the given other string (not a regular expression) within s, and returns the first index where it begins or -1 if not found
- s.replace('old', 'new') -- returns a string where all occurrences of 'old' have been replaced by 'new'
- s.split('delim') -- returns a list of substrings separated by the given delimiter. The delimiter is not a regular expression, it's just text. 'aaa,bbb,ccc'.split(',') -> ['aaa', 'bbb', 'ccc']. As a convenient special case s.split() (with no arguments) splits on all whitespace chars.
- s.join(list) -- opposite of split(), joins the elements in the given list together using the string as the delimiter. e.g. '---'.join(['aaa', 'bbb', 'ccc']) -> aaa---bbb---ccc

Python没有单独的character类型。如s[8]返回一个string length为1的字符串包含一个元素，且运算符==, <=, …都可以正常工作。

```python
>>> a = 'hello world'
>>> a
'hello world'
>>> a[3]
'l'
>>> len(a)
11
>>> len(a[3])
1
>>> a[3] == a[2]
True
```

## 字符串分片

分片（slice）可以方便地获取到序列（如字符串strings和列表lists）的一部分。分片`s[start:end]`包含从索引start开始，直到但不包括索引end的所有元素。

标准的基于0的索引序列可以轻松获取字符串开头附近的字符。Python使用负数来获取结尾处的字符。s[-1]是最后一个字符，s[-2]是倒数第二个字符。

对于任何索引，甚至是负数或越界，都会有`s[:n] + s[n:] == s`。

## 字符串%与format

Python有类似printf()合并字符串功能。

```python
  # % operator
  text = "%d little pigs come out or I'll %s and %s and %s" % (3, 'huff', 'puff', 'blow down')
```

运算符%左边引号里面的%*是占位符，与C类似： %d int, %s string, %f/%g floating point。而右边元组tupe里面是匹配的值。

不同与其他语言，我们不能在%后换行——因为Python默认将每一行作为独立的指令。我们可以将完整的语句包含在括号中来解决这一问题——(), [], {}都可以。

```python
  # add parens to make the long-line work:
  text = ("%d little pigs come out or I'll %s and %s and %s" %
    (3, 'huff', 'puff', 'blow down'))
```

在Python 2.6中新加入了[`str.format(*args, **kwargs)`](https://docs.python.org/2/library/stdtypes.html#str.format)方法，提供类似%的功能。

```python
>>> '{0}, {1}, {2}'.format('a', 'b', 'c')
'a, b, c'
>>> '{}, {}, {}'.format('a', 'b', 'c')  # 2.7+ only
'a, b, c'
>>> '{2}, {1}, {0}'.format('a', 'b', 'c')
'c, b, a'
>>> 'Coordinates: {latitude}, {longitude}'.format(latitude='37.24N', longitude='-115.81W')
'Coordinates: 37.24N, -115.81W'
```

## i18n Strings (Unicode)

普通的Python字符串不是unicode的，只是普通的字节。用‘u’前缀创建unicode字符串以支持国际化字符（internationalization, i18n）。

```python
> ustring = u'A unicode \u018e string \xf1'
> ustring
u'A unicode \u018e string \xf1'
```

unicode string是不同与普通str的类型，但是兼容的。

使用`ustring.encode('utf-8')`将unicode字符串转为utf-8编码。而unicode(s, encoding) 函数将 plain bytes 转化为 unicode string:

```python
## (ustring from above contains a unicode string)
> s = ustring.encode('utf-8')
> s
'A unicode \xc6\x8e string \xc3\xb1'  ## bytes of utf-8 encoding
> t = unicode(s, 'utf-8')             ## Convert bytes back to a unicode string
> t == ustring                      ## It's the same as the original, yay!
True
```

## if语句

Python不使用{}来封闭if、循环和函数，而是使用分号和缩进空格来组织语句。if的条件判断不必放在括号里，还有elif和else语句。

任何值都可以作为if判断。所有的零值都作为false：None，0，空字符串，空列表，空字典。当然也有Boolean类型。也支持比较运算符： ==, !=, <, <=, >, >=。逻辑运算符直接使用单词`and`, `or`, `not`，而不是 C-style && || !。

```python
  if speed >= 80:
    print 'License and registration please'
    if mood == 'terrible' or speed >= 100:
      print 'You have the right to remain silent.'
    elif mood == 'bad' or speed >= 90:
      print "I'm going to have to write you a ticket."
      write_ticket()
    else:
      print "Let's try to keep it under 80 ok?"
```

如果代码很短，代码可以直接放在分号后而不换号。

# List列表

Python有一个内建的列表类型名为list。List产量用方括号[]初始化。与字符串类似，list也支持len()函数，用中括号获取数据。

```python
  colors = ['red', 'blue', 'green']
  print colors[0]    ## red
  print colors[2]    ## green
  print len(colors)  ## 3
```

用等号=赋值list并不会拷贝list，而是让两个变量指向内存里的同一个list。若想拷贝list，需要拷贝所有使用`dst = src[:]`。

```shell
SWAN:Brighton ~$ python
Python 2.7.14 (default, Oct 22 2017, 15:36:48) 
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.38)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> a = [1, 2, 3, 'b']
>>> a
[1, 2, 3, 'b']
>>> b = a
>>> b
[1, 2, 3, 'b']
>>> a[0] = 10
>>> a
[10, 2, 3, 'b']
>>> b
[10, 2, 3, 'b']
>>> 
>>> c = a[:]
>>> c
[10, 2, 3, 'b']
>>> a[0] = 100
>>> a
[100, 2, 3, 'b']
>>> b
[100, 2, 3, 'b']
>>> c
[10, 2, 3, 'b']
>>> 
```



空list是一对空的中括号[]。‘+’可以组合两个list，[1, 2] + [3, 4]生成[1, 2, 3, 4]。

## FOR与IN

python中for结构`for var in list`是一种简单的遍历list（或其他组合）元素的方法。在遍历期间不要增减list。

```python
  squares = [1, 4, 9, 16]
  sum = 0
  for num in squares:
    sum += num
  print sum  ## 30
```

in结构`value in collection`可以测试value是否在collection中，返回True或False。

```python
  list = ['larry', 'curly', 'moe']
  if 'curly' in list:
    print 'yay'
```

for/in亦可用于字符串——字符串似一个字符列表——`for ch in s: print ch`输出字符串中所有字符。

**Range**

range(n)函数产生数字0, 1, ... n-1，而range(a, b)返回a, a+1, ...b-1。for循环和range()结合即可构建循环中的数字：

```python
  ## print the numbers from 0 through 99
  for i in range(100):
    print i
```

**while循环**

python也有标准的while循环，break和continue语句。

```python
  ## Access every 3rd element in a list
  i = 0
  while i < len(a):
    print a[i]
    i = i + 3
```

**循环else**

在循环体后面添加else分句，如果循环主体中没有执行break语句，则执行else后面的语句。

```python
for <target> in <object>
    <statements>
    if <test>: break    #Exit loop now, skip else
    if <test>: continue   #Go to the top of loop now
else:
    <statements>    #if we didn't hit a break
```

**List方法**

List常用方法：

- list.append(elem) -- adds a single element to the end of the list. <u>Common error: does not return the new list, just modifies the original.</u>
- list.insert(index, elem) -- inserts the element at the given index, shifting elements to the right.
- list.extend(list2) adds the elements in list2 to the end of the list. Using + or += on a list is similar to using extend().
- list.index(elem) -- searches for the given element from the start of the list and returns its index. Throws a ValueError if the element does not appear (use "in" to check without a ValueError).
- list.remove(elem) -- searches for the first instance of the given element and removes it (throws ValueError if not present)
- list.sort() -- sorts the list in place (does not return it). (The sorted() function shown later is preferred.)
- list.reverse() -- reverses the list in place (does not return it)
- list.pop(index) -- removes and returns the element at the given index. Returns the rightmost element if index is omitted (roughly the opposite of append()).

```python
  list = ['larry', 'curly', 'moe']
  list.append('shemp')         ## append elem at end
  list.insert(0, 'xxx')        ## insert elem at index 0
  list.extend(['yyy', 'zzz'])  ## add list of elems at end
  print list  ## ['xxx', 'larry', 'curly', 'moe', 'shemp', 'yyy', 'zzz']
  print list.index('curly')    ## 2

  list.remove('curly')         ## search and remove that element
  list.pop(1)                  ## removes and returns 'larry'
  print list  ## ['xxx', 'moe', 'shemp', 'yyy', 'zzz']
```

**List构建**

通常先创建一个空list，然后用append() 或 extend() 添加元素。

```python
  list = []          ## Start as the empty list
  list.append('a')   ## Use append() to add elements
  list.append('b')
```

**List分片**

与String一样，list也支持分片。

```python
  list = ['a', 'b', 'c', 'd']
  print list[1:-1]   ## ['b', 'c']
  list[0:2] = 'z'    ## replace ['a', 'b'] with ['z']
  print list         ## ['z', 'c', 'd']
```

# 排序

最简单的排序方式是sorted(list)函数。该函数接受list作为入参，返回一个新的排序后的list——原始list不会改变。

```python
  a = [5, 1, 4, 3]
  print sorted(a)  ## [1, 3, 4, 5]
  print a  ## [5, 1, 4, 3]
```

实际上sorted()函数可以接受任何可迭代的类型。

sorted()函数可以通过可选参数自定义排序，如参数reverse=True，`sorted(list, reverse=True)`，返回逆序。

```python
  strs = ['aa', 'BB', 'zz', 'CC']
  print sorted(strs)  ## ['BB', 'CC', 'aa', 'zz'] (case sensitive)
  print sorted(strs, reverse=True)   ## ['zz', 'aa', 'CC', 'BB']
```

## key=自定义排序

sorted()函数通过可选参数“key=”可定义一函数将每个元素在比较前做一转换。key函数接受一值为参并返回一值，返回的值用于比较排序。

例如，一个字符串list，指定key=len（内建的len()函数）按字符串长短排序。

```python
  strs = ['ccc', 'aaaa', 'd', 'bb']
  print sorted(strs, key=len)  ## ['d', 'bb', 'ccc', 'aaaa']
```

也可以自定义key函数，如：

```python
  ## Say we have a list of strings we want to sort by the last letter of the string.
  strs = ['xc', 'zb', 'yd' ,'wa']

  ## Write a little function that takes a string, and returns its last letter.
  ## This will be the key function (takes in 1 value, returns 1 value).
  def MyFn(s):
    return s[-1]

  ## Now pass key=MyFn to sorted() to sort by the last letter:
  print sorted(strs, key=MyFn)  ## ['wa', 'zb', 'xc', 'yd']
```

sorted()函数还有一个可选参数"cmp=cmpFn"来指定比较函数——该函数从list中取两元素比较，并返回正负或零来指示序列。

## sort()方法

与sorted()相似，list的sort()方法可将list排序。<u>sort()方法直接修改list而返回None</u>：

```python
  alist.sort()            ## correct
  alist = blist.sort()    ## NO incorrect, sort() returns None
```

## Tuples元组

元组是一组固定大小的元素，如(x, y)坐标系。元组与列表一样，除了不能修改大小且不可修改。元组并不是严格不可更改——元组中可能包含可以修改的元素，如list。元组在Python中充当了结构体的角色。

若要创建元组，只需将元素列在括号内，并用逗号分开。空括号即会创建一个空元组。与list一样，元组支持len(), [], for, in...

```python
  tuple = (1, 2, 'hi')
  print len(tuple)  ## 3
  print tuple[2]    ## hi
  tuple[2] = 'bye'  ## NO, tuples cannot be changed
  tuple = (1, 2, 'bye')  ## this works
```

若要创建size为1的元组，单独元素必须后跟一个逗号。该逗号将元组与括号其他语法分开。

```python
  tuple = ('hi',)   ## size-1 tuple
```

在某些场景下，括号可以忽略，Python可以从逗号推出类型为元组。

若将一元组赋值给相同大小的变量元组，会将值赋给相应变量。若长度不等，则会报错。list也支持该特性。

```python
  (x, y, z) = (42, 13, "hike")
  print z  ## hike
  (err_string, err_code) = Foo()  ## Foo() returns a length-2 tuple
```

## List Comprehensions

```python
  nums = [1, 2, 3, 4]
  squares = [ n * n for n in nums ]   ## [1, 4, 9, 16]

  strs = ['hello', 'and', 'goodbye']
  shouting = [ s.upper() + '!!!' for s in strs ]
  ## ['HELLO!!!', 'AND!!!', 'GOODBYE!!!']
    
  ## Select values <= 2
  nums = [2, 8, 1, 6]
  small = [ n for n in nums if n <= 2 ]  ## [2, 1]

  ## Select fruits containing 'a', change to upper case
  fruits = ['apple', 'cherry', 'banana', 'lemon']
  afruits = [ s.upper() for s in fruits if 'a' in s ]
  ## ['APPLE', 'BANANA']
```

# 字典与文件

Python中高效的key/value哈希表结构叫字典Dict。字典内容可以写成大括号中一连串的key:value对。空字典即是一对空的大括号。 

字符串、数字和元组皆可做key，任何类型都可做value。可以用key作索引用中括号获取value。若不存在，则抛出KeyError。可以用in判断key是否存在。dict.get(key) 可返回对应value，若key不存在，则返回None。而get(key, not-found)还支持指定不存在时的返回值。

```python
  ## Can build up a dict by starting with the the empty dict {}
  ## and storing key/value pairs into the dict like this:
  ## dict[key] = value-for-that-key
  dict = {}
  dict['a'] = 'alpha'
  dict['g'] = 'gamma'
  dict['o'] = 'omega'

  print dict  ## {'a': 'alpha', 'o': 'omega', 'g': 'gamma'}

  print dict['a']     ## Simple lookup, returns 'alpha'
  dict['a'] = 6       ## Put new key/value into dict
  'a' in dict         ## True
  ## print dict['z']                  ## Throws KeyError
  if 'z' in dict: print dict['z']     ## Avoid KeyError
  print dict.get('z')  ## None (instead of KeyError)
```

字典的递归循环默认以Key为任意序。dict.keys() 和 dict.values() 返回 lists of the keys 或 values. 还有 items() 返回 a list of (key, value) tuples。

```python
  ## By default, iterating over a dict iterates over its keys.
  ## Note that the keys are in a random order.
  for key in dict: print key
  ## prints a g o
  
  ## Exactly the same as above
  for key in dict.keys(): print key

  ## Get the .keys() list:
  print dict.keys()  ## ['a', 'o', 'g']

  ## Likewise, there's a .values() list of values
  print dict.values()  ## ['alpha', 'omega', 'gamma']

  ## Common case -- loop over the keys in sorted order,
  ## accessing each key/value
  for key in sorted(dict.keys()):
    print key, dict[key]
  
  ## .items() is the dict expressed as (key, value) tuples
  print dict.items()  ##  [('a', 'alpha'), ('o', 'omega'), ('g', 'gamma')]

  ## This loop syntax accesses the whole dict by looping
  ## over the .items() tuple list, accessing one (key, value)
  ## pair on each iteration.
  for k, v in dict.items(): print k, '>', v
  ## a > alpha    o > omega     g > gamma
```

## 字典格式化

运算符%可以方便地通过字典名称将其值转换为字符串。

```python
  hash = {}
  hash['word'] = 'garfield'
  hash['count'] = 42
  s = 'I want %(count)d copies of %(word)s' % hash  # %d for int, %s for string
  # 'I want 42 copies of garfield'
```

## Del

运算符“del”可以用来移除变量定义，也可以用来删除list元素或分片，以及字典实体。

```python
  var = 6
  del var  # var no more!
  
  list = ['a', 'b', 'c', 'd']
  del list[0]     ## Delete first element
  del list[-2:]   ## Delete last two elements
  print list      ## ['b']

  dict = {'a':1, 'b':2, 'c':3}
  del dict['b']   ## Delete 'b' entry
  print dict      ## {'a':1, 'c':3}
```

## 文件

open()函数打开文件并返回句柄。如`f = open('name', 'r')`打开文件，句柄保存到变量f，备读操作，操作完成之后调用f.close()关闭文件。参数‘r’为读，‘w’为写，‘a’为追加。还有模式‘rU’，‘U’即‘Universal’，适用于文本文件，该模式可智能处理各种换行符，而作为简单的‘\n’。The special mode 'rU' is the "Universal" option for text files where it's smart about converting different line-endings so they always come through as a simple '\n'. 

```python
  # Echo the contents of a file
  f = open('foo.txt', 'rU')
  for line in f:   ## iterates over the lines of the file
    print line,    ## trailing , so print does not add an end-of-line char
                   ## since 'line' already includes the end-of line.
  f.close()
```

f.readline()读取整个文件，返回一list包含文件行内容。

f.read()读取整个文件到一字符串。

 f.write(string) 可写。写文件也可用print函数，不过语法奇怪："print >> f, string"。在Python 3中，语法变正常点了："print(string, file=f)"。

## Unicode文件

codecs模块可支持读取unicode文件。

```python
import codecs

f = codecs.open('foo.txt', 'rU', 'utf-8')
for line in f:
  # here line is a *unicode* string
```

对于写，只能使用 f.write()。因为print不能完全支持unicode。

# Python正则表达式

Python中“re”模块提供正则表达式支持。Python中正则搜索一般写作：

```python
str = 'an example word:cat!!'
match = re.search(r'word:\w\w\w', str)
# If-statement after search() tests if it succeeded
if match:
  print 'found', match.group() ## 'found word:cat'
else:
  print 'did not find'
```

## 基本模式

常用的匹配单个字符的常用基本模式：

- a, X, 9, < -- ordinary characters just match themselves exactly. The meta-characters which do not match themselves because they have special meanings are: . ^ $ * + ? { [ ] \ | ( ) (details below)
- . (a period) -- matches any single character except newline '\n'
- \w -- (lowercase w) matches a "word" character: a letter or digit or underbar [a-zA-Z0-9_]. Note that although "word" is the mnemonic for this, it only matches a single word char, not a whole word. \W (upper case W) matches any non-word character.
- \b -- boundary between word and non-word
- \s -- (lowercase s) matches a single whitespace character -- space, newline, return, tab, form [ \n\r\t\f]. \S (upper case S) matches any non-whitespace character.
- \t, \n, \r -- tab, newline, return
- \d -- decimal digit [0-9] (some older regex utilities do not support but \d, but they all support \w and \s)
- ^ = start, $ = end -- match the start or end of the string
- \ -- inhibit the "specialness" of a character. So, for example, use \. to match a period or \\ to match a slash. If you are unsure if a character has special meaning, such as '@', you can put a slash in front of it, \@, to make sure it is treated just as a character.

字符串正则搜索基本规则如下：

* 搜索过程从头到尾，遇到第一个匹配的即停。
* All of the pattern must be matched, but not all of the string
* 若`match = re.search(pat, str)`成功，`match` 不为 None， 且`match.group()为匹配内容。

```python
  ## Search for pattern 'iii' in string 'piiig'.
  ## All of the pattern must match, but it may appear anywhere.
  ## On success, match.group() is matched text.
  match = re.search(r'iii', 'piiig') =>  found, match.group() == "iii"
  match = re.search(r'igs', 'piiig') =>  not found, match == None

  ## . = any char but \n
  match = re.search(r'..g', 'piiig') =>  found, match.group() == "iig"

  ## \d = digit char, \w = word char
  match = re.search(r'\d\d\d', 'p123g') =>  found, match.group() == "123"
  match = re.search(r'\w\w\w', '@@abcd!!') =>  found, match.group() == "abc"
```

## 重复

某个字符后的数量限定符用来限定前面这个字符允许出现的个数。最常见的数量限定符包括`+`、`?`和`*`（不加数量限定则代表出现一次且仅出现一次）：

- `+`代表前面的字符必须至少出现一次。（1次或多次）。例如，`goo+gle`可以匹配google、gooogle、goooogle等;
- `?`代表前面的字符最多只可以出现一次。（0次或1次）。例如，`colou?r`可以匹配color或者colour;
- `*`代表前面的字符可以不出现，也可以出现一次或者多次。（0次、1次或多次）。例如，`0*42`可以匹配42、042、0042、00042等。

```python
  ## i+ = one or more i's, as many as possible.
  match = re.search(r'pi+', 'piiig') =>  found, match.group() == "piii"

  ## Finds the first/leftmost solution, and within it drives the +
  ## as far as possible (aka 'leftmost and largest').
  ## In this example, note that it does not get to the second set of i's.
  match = re.search(r'i+', 'piigiiii') =>  found, match.group() == "ii"

  ## \s* = zero or more whitespace chars
  ## Here look for 3 digits, possibly separated by whitespace.
  match = re.search(r'\d\s*\d\s*\d', 'xx1 2   3xx') =>  found, match.group() == "1 2   3"
  match = re.search(r'\d\s*\d\s*\d', 'xx12  3xx') =>  found, match.group() == "12  3"
  match = re.search(r'\d\s*\d\s*\d', 'xx123xx') =>  found, match.group() == "123"

  ## ^ = matches the start of string, so this fails:
  match = re.search(r'^b\w+', 'foobar') =>  not found, match == None
  ## but without the ^ it succeeds:
  match = re.search(r'b\w+', 'foobar') =>  found, match.group() == "bar"
```

## 方括号

方括号可表示一字符集，如[abc]可匹配a或b或c。\w、\s等也可以在方括号中使用，但有一点，对，一点(.)在方括号中就是一点。

```python
  match = re.search(r'[\w.-]+@[\w.-]+', str)
  if match:
    print match.group()  ## 'alice-b@google.com'
```

可以在方括号中使用短横线表示范围，[a-z]可匹配所有小写字母。若要短横线不要表示范围，可以将其放到最后，如[abc-]。^在方括号的开头则表示取反，`[^ab]`意味着除a或b的其他字符。

## Group Extraction

正则表达式的组特性可以用来获取匹配内容的各个部分。如上例，如果想分开获取邮箱的用户名和主机名，我们可以在用户名和主机名上添加圆括号：`r'([\w.-]+)@([\w.-]+)'`。如此一来，并未改变匹配的字符串，并且添加了“组”逻辑。若匹配成功，match.group(1)即是第一个括号内匹配的对应内容，match.group(2)对应第二个括号匹配的内容。而match.group()依旧是完整的匹配内容。

```python
  str = 'purple alice-b@google.com monkey dishwasher'
  match = re.search(r'([\w.-]+)@([\w.-]+)', str)
  if match:
    print match.group()   ## 'alice-b@google.com' (the whole match)
    print match.group(1)  ## 'alice-b' (the username, group 1)
    print match.group(2)  ## 'google.com' (the host, group 2)
```

## findall

findall()也许是re模块中最强大的函数。上面我们使用的re.search()搜索第一个匹配的内容，而findall()搜索所有匹配并返回一个字符串列表——每一个字符串都是一个匹配的内容。

```python
  ## Suppose we have a text with many email addresses
  str = 'purple alice@google.com, blah monkey bob@abc.com blah dishwasher'

  ## Here re.findall() returns a list of all the found email strings
  emails = re.findall(r'[\w\.-]+@[\w\.-]+', str) ## ['alice@google.com', 'bob@abc.com']
  for email in emails:
    # do something with each found email string
    print email
```

**文件搜索**

虽然可以使用循环递归获取文件每一行并对其使用findall()，但有更好的方法——使用findall()。将整个文件输入给findall()，findall返回所有匹配的内容列表。

```python
  # Open file
  f = open('test.txt', 'r')
  # Feed the file text into findall(); it returns a list of all the found strings
  strings = re.findall(r'some pattern', f.read())
```

**findall与组**

圆括号组机制也可以与findall()结合使用。如果模式包含<u>两个或多个组</u>，findall不再返回字符串列表，而是返回元组列表。每个元组为一匹配内容，元组内为group(1), group(2)等内容。

```python
  str = 'purple alice@google.com, blah monkey bob@abc.com blah dishwasher'
  tuples = re.findall(r'([\w\.-]+)@([\w\.-]+)', str)
  print tuples  ## [('alice', 'google.com'), ('bob', 'abc.com')]
  for tuple in tuples:
    print tuple[0]  ## username
    print tuple[1]  ## host
```

如果模式中包含一组圆括号，findall()返回匹配括号组的内容列表——忽略括号外匹配的内容。

```python
  str = 'purple alice@google.com, blah monkey bob@abc.com blah dishwasher'
  list = re.findall(r'([\w\.-]+)@[\w\.-]+', str)
  print list  ## ['alice', 'bob']
```

如果模式中包含括号组，但你又不想提取匹配的内容，可以在模式开头加上`?:`.

## 选项

re函数可以通过选项参数修改模式匹配。选项标志作为一个额外参数添加给search()或findall()函数，如re.search(pat, str, re.IGNORECASE).

- IGNORECASE -- ignore upper/lowercase differences for matching, so 'a' matches both 'a' and 'A'.
- DOTALL -- allow dot (.) to match newline -- normally it matches anything but newline. This can trip you up -- you think .* matches everything, but by default it does not go past the end of a line. Note that \s (whitespace) includes newlines, so if you want to match a run of whitespace that may include a newline, you can just use \s*
- MULTILINE -- Within a string made of many lines, allow `^` and `$` to match the start and end of each line. Normally ^/$ would just match the start and end of the whole string.。

## 贪婪模式与非贪婪

当问号`?`紧跟在任何一个其他重复修饰符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是**非**贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“`oooo`”，“`o+?`”将匹配单个“`o`”，而“`o+`”将匹配所有“`o`”。

## 替换

The re.sub(pat, replacement, str) function searches for all the instances of pattern in the given string, and replaces them. The replacement string can include '\1', '\2' which refer to the text from group(1), group(2), and so on from the original matching text.

Here's an example which searches for all the email addresses, and changes them to keep the user (\1) but have yo-yo-dyne.com as the host.

```python
  str = 'purple alice@google.com, blah monkey bob@abc.com blah dishwasher'
  ## re.sub(pat, replacement, str) -- returns new string with all replacements,
  ## \1 is group(1), \2 group(2) in the replacement
  print re.sub(r'([\w\.-]+)@([\w\.-]+)', r'\1@yo-yo-dyne.com', str)
  ## purple alice@yo-yo-dyne.com, blah monkey bob@yo-yo-dyne.com blah dishwasher
```

 # Python Utilities

## 文件系统

The *os* and *os.path* modules include many functions to interact with the file system. The *shutil* module can copy files.

- [os module docs](https://docs.python.org/library/os)
- filenames = os.listdir(dir) -- list of filenames in that directory path (not including . and ..). The filenames are just the names in the directory, not their absolute paths.
- os.path.join(dir, filename) -- given a filename from the above list, use this to put the dir and filename together to make a path
- os.path.abspath(path) -- given a path, return an absolute form, e.g. /home/nick/foo/bar.html
- os.path.dirname(path), os.path.basename(path) -- given dir/foo/bar.html, return the dirname "dir/foo" and basename "bar.html"
- os.path.exists(path) -- true if it exists
- os.mkdir(dir_path) -- makes one dir, os.makedirs(dir_path) makes all the needed dirs in this path
- shutil.copy(source-path, dest-path) -- copy a file (dest path directories should exist)

```python
## Example pulls filenames from a dir, prints their relative and absolute paths
def printdir(dir):
  filenames = os.listdir(dir)
  for filename in filenames:
    print filename  ## foo.txt
    print os.path.join(dir, filename) ## dir/foo.txt (relative to current dir)
    print os.path.abspath(os.path.join(dir, filename)) ## /home/nick/dir/foo.txt
```

## 命令行

The *commands* module is a simple way to run an external command and capture its output.

- [commands module docs](https://docs.python.org/2/library/commands)
- (status, output) = commands.getstatusoutput(cmd) -- runs the command, waits for it to exit, and returns its status int and output text as a tuple. The command is run with its standard output and standard error combined into the one output text. The status will be non-zero if the command failed. Since the standard-err of the command is captured, if it fails, we need to print some indication of what happened.
- output = commands.getoutput(cmd) -- as above, but without the status int.
- There is a commands.getstatus() but it does something else, so don't use it -- dumbest bit of method naming ever!
- If you want more control over the running of the sub-process, see the ["popen2" module](https://docs.python.org/2/library/popen2.html)
- There is also a simple os.system(cmd) which runs the command and dumps its output onto your output and returns its error code. This works if you want to run the command but do not need to capture its output into your python data structures.

Note: The commands module and the popen2 module are deprecated as of Python 2.6 and removed in 3.x. The [subprocess module](https://developers.google.com/edu/python/docs.python.org/library/subprocess) replaces these modules. In particular, the subprocess module discusses replacements for these modules in the [subprocess-replacements section](https://developers.google.com/edu/python/docs.python.org/library/subprocess.html#subprocess-replacements).

```python
## Given a dir path, run an external 'ls -l' on it --
## shows how to call an external program
def listdir(dir):
  cmd = 'ls -l ' + dir
  print "Command to run:", cmd   ## good to debug cmd before actually running it
  (status, output) = commands.getstatusoutput(cmd)
  if status:    ## Error case, print the command's output to stderr and exit
    sys.stderr.write(output)
    sys.exit(status)
  print output  ## Otherwise do something with the command's output
```

## Exceptions

An exception represents a run-time error that halts the normal execution at a particular line and transfers control to error handling code. This section just introduces the most basic uses of exceptions. For example a run-time error might be that a variable used in the program does not have a value (ValueError .. you've probably seen that one a few times), or a file open operation error because a file does not exist (IOError). Learn more in [the exceptions tutorial](https://docs.python.org/tutorial/errors) and see [the entire exception list](https://docs.python.org/library/exceptions).

Without any error handling code (as we have done thus far), a run-time exception just halts the program with an error message. That's a good default behavior, and you've seen it many times. You can add a "try/except" structure to your code to handle exceptions, like this:

```python
  try:
    ## Either of these two lines could throw an IOError, say
    ## if the file does not exist or the read() encounters a low level error.
    f = open(filename, 'rU')
    text = f.read()
    f.close()
  except IOError:
    ## Control jumps directly to here if any of the above lines throws IOError.
    sys.stderr.write('problem reading:' + filename)
  ## In any case, the code then continues with the line after the try/except
```

The try: section includes the code which might throw an exception. The except: section holds the code to run if there is an exception. If there is no exception, the except: section is skipped (that is, that code is for error handling only, not the "normal" case for the code). You can get a pointer to the exception object itself with syntax "except IOError as e: .." (e points to the exception object).

## HTTP -- urllib and urlparse

The module *urllib* provides url fetching -- making a url look like a file you can read from. The *urlparse* module can take apart and put together urls.

- [urllib module docs](https://developers.google.com/edu/python/docs.python.org/library/urllib)
- ufile = urllib.urlopen(url) -- returns a file like object for that url
- text = ufile.read() -- can read from it, like a file (readlines() etc. also work)
- info = ufile.info() -- the meta info for that request. info.gettype() is the mime type, e.g. 'text/html'
- baseurl = ufile.geturl() -- gets the "base" url for the request, which may be different from the original because of redirects
- urllib.urlretrieve(url, filename) -- downloads the url data to the given file path
- urlparse.urljoin(baseurl, url) -- given a url that may or may not be full, and the baseurl of the page it comes from, return a full url. Use geturl() above to provide the base url.

In Python 3, urllib and urllib2 are merged into urllib.request, and urlparse becomes urllib.parse. All of their exceptions are in urllib.error.

```python
## Given a url, try to retrieve it. If it's text/html,
## print its base url and its text.
def wget(url):
  ufile = urllib.urlopen(url)  ## get file-like object for url
  info = ufile.info()   ## meta-info about the url content
  if info.gettype() == 'text/html':
    print 'base url:' + ufile.geturl()
    text = ufile.read()  ## read all its text
    print text
```

The above code works fine, but does not include error handling if a url does not work for some reason. Here's a version of the function which adds try/except logic to print an error message if the url operation fails.

```python
## Version that uses try/except to print an error message if the
## urlopen() fails.
def wget2(url):
  try:
    ufile = urllib.urlopen(url)
    if ufile.info().gettype() == 'text/html':
      print ufile.read()
  except IOError:
    print 'problem reading url:', url
```



# 参考资料

[Google's Python online tutorial](https://developers.google.com/edu/python/introduction)
[Python 的版本管理和环境隔离](https://blog.laisky.com/p/pyenv/)

