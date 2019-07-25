---
title: Python3与Python2的主要不兼容差异
catalog: true
date: 2019-02-03 10:57:03
subtitle:
cover: "/posts/python-notes/2AIEQMwjaAihNME0.jpg"
updated: 2019-02-03 10:57:03
categories:
- 技术
tags: Python
---

Python 3故意与Python 2不兼容，以解决Python 2中的一些糟糕问题。本文将整理Python 3与Python 2主要不兼容的差异。

According to Guido, he initiated the Python 3 project to clean up a variety of issues with Python 2 where he didn’t feel comfortable with fixing them through the normal deprecation process. This included the removal of classic classes, changing integer division to automatically promote to a floating point result (retaining the separate floor division operation) and changing the core string type to be based on Unicode by default. 

BTW，Python 2.7 将在 2020 年 1 月 1 日寿终正寝，之后官方不会有任何更新，包括源码的安全补丁，请参考[Python 之父 Guido van Rossum的邮件](https://mail.python.org/pipermail/python-dev/2018-March/152348.html)。
<!--more--> 

# print

Python 3中用[print()函数](https://docs.python.org/3/library/functions.html#print)取代了Python 2 的[print 声明](https://docs.python.org/2/reference/simple_stmts.html#print)。

```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print "The answer is", 2*2
The answer is 4
>>> x = 5
>>> print x,           # Trailing comma suppresses newline
5
>>> print              # Prints a newline

>>> import sys
>>> print >>sys.stderr, "fatal error"
fatal error
>>> 
```

```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print "The answer is", 2*2
  File "<stdin>", line 1
    print "The answer is", 2*2
                        ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print("The answer is", 2*2)?
>>> print("The answer is", 2*2)
The answer is 4
>>> x = 5
>>> print(x, end=" ")  # Appends a space instead of a newline
5 >>> print()            # Call the function to print a newline

>>> import sys
>>> print("fatal error", file=sys.stderr)
fatal error
>>> 
```

# string & bytes

The Python 2 有两种文本模式text model：
- str: “...”, 8-bit类型，可能包含的是二进制数据binary data，或者编码的文本数据encoded text data in an unknown (hopefully ASCII compatible) encoding, 
- unicode: u"..."，以u为前缀，16-bit或32-bit type (depending on build options)，包含的是Unicode编码的文本。Unicode strings使用Unicode Consortium和 ISO 10646定义的字符集。

Python 3对此做了很大改变，不再以位宽来区分，而是以更合适应用编程的方式来区别。Python 3中的文本模式包括：
- [str](https://docs.python.org/3/library/stdtypes.html#str): Unicode编码字符串序列。
- [bytes](https://docs.python.org/3/library/stdtypes.html#bytes): b"..."，以b为前缀，整数（值为0-255）序列，二进制数据。

在python 3中，所有文本（字符串，text）都是Unicode。经Unicode编码后使用二进制数据表示。用来保存文本的类型为str，用来保存二进制数据的类型是bytes。

str和bytes是不同的类型，不能混用，需要显式转换：
- str —> bytes: str.encode(), bytes(s, encoding=...) 
- bytes —> str: bytes.decode(), str(b, encoding=...)

>*class* **str**(*object=''*)
>*class* **str(***object=b''*, *encoding='utf-8'*, *errors='strict'***)**
>Return a string version of *object*. If *object* is not provided, returns the empty string. Otherwise, the behavior of str() depends on whether *encoding* or *errors* is given, as follows.
>If neither *encoding* nor *errors* is given, str(object) returns [object.__str__()](https://docs.python.org/3/reference/datamodel.html#object.__str__), which is the “informal” or nicely printable string representation of *object*. For string objects, this is the string itself. If *object* does not have a [__str__()](https://docs.python.org/3/reference/datamodel.html#object.__str__) method, then str() falls back to returning [repr(object)](https://docs.python.org/3/library/functions.html#repr).
>If at least one of *encoding* or *errors* is given, *object* should be a [bytes-like object](https://docs.python.org/3/glossary.html#term-bytes-like-object) (e.g. bytes or bytearray). In this case, if *object* is a bytes (or bytearray) object, then str(bytes, encoding, errors) is equivalent to bytes.decode(encoding, errors). Otherwise, the bytes object underlying the buffer object is obtained before calling bytes.decode(). See Binary Sequence Types — bytes, bytearray, memoryview and [Buffer Protocol](https://docs.python.org/3/c-api/buffer.html#bufferobjects) for information on buffer objects.
>Passing a bytes object to str() without the *encoding* or *errors* arguments falls under the first case of returning the informal string representation (see also the [-b](https://docs.python.org/3/using/cmdline.html#cmdoption-b) command-line option to Python). 


>str.**encode(***encoding="utf-8"*, *errors="strict"***)**
>Return an encoded version of the string as a bytes object. Default encoding is 'utf-8'. *errors* may be given to set a different error handling scheme. The default for *errors* is 'strict', meaning that encoding errors raise a [UnicodeError](https://docs.python.org/3.7/library/exceptions.html#UnicodeError). Other possible values are 'ignore', 'replace', 'xmlcharrefreplace', 'backslashreplace' and any other name registered via [codecs.register_error()](https://docs.python.org/3.7/library/codecs.html#codecs.register_error), see section [Error Handlers](https://docs.python.org/3.7/library/codecs.html#error-handlers). For a list of possible encodings, see section [Standard Encodings](https://docs.python.org/3.7/library/codecs.html#standard-encodings).


>*class* **bytearray**([*source*[, *encoding*[, *errors*]]])
>Return a new array of bytes. The [bytearray](https://docs.python.org/3/library/stdtypes.html#bytearray) class is a mutable sequence of integers in the range 0 <= x < 256. 
>*class* **bytes**([*source*[, *encoding*[, *errors*]]])
>Return a new “bytes” object, which is an immutable sequence of integers in the range 0 <= x < 256. [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) is an immutable version of [bytearray](https://docs.python.org/3/library/stdtypes.html#bytearray)
>The optional *source* parameter can be used to initialize the array in a few different ways:
>- If it is a *string*, you must also give the *encoding* (and optionally, *errors*) parameters; [bytearray()](https://docs.python.org/3/library/stdtypes.html#bytearray) then converts the string to bytes using [str.encode()](https://docs.python.org/3/library/stdtypes.html#str.encode).
>- If it is an *integer*, the array will have that size and will be initialized with null bytes.
>- If it is an object conforming to the *buffer* interface, a read-only buffer of the object will be used to initialize the bytes array.
>- If it is an *iterable*, it must be an iterable of integers in the range 0 <= x < 256, which are used as the initial contents of the array.
>Without an argument, an array of size 0 is created.

>bytes.**decode(***encoding="utf-8"*, *errors="strict"***)**
>bytearray.**decode(***encoding="utf-8"*, *errors="strict"***)**
>Return a string decoded from the given bytes. Default encoding is 'utf-8'. *errors* may be given to set a different error handling scheme. The default for *errors* is 'strict', meaning that encoding errors raise a [UnicodeError](https://docs.python.org/3.7/library/exceptions.html#UnicodeError). Other possible values are 'ignore', 'replace' and any other name registered via [codecs.register_error()](https://docs.python.org/3.7/library/codecs.html#codecs.register_error), see section [Error Handlers](https://docs.python.org/3.7/library/codecs.html#error-handlers). For a list of possible encodings, see section [Standard Encodings](https://docs.python.org/3.7/library/codecs.html#standard-encodings).
>**Note** Passing the *encoding* argument to str allows decoding any [bytes-like object](https://docs.python.org/3.7/glossary.html#term-bytes-like-object) directly, without needing to make a temporary bytes or bytearray object.

```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> type('hi')
<type 'str'>
>>> type(u'hi')
<type 'unicode'>
>>> 
```

```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> type('hi')
<class 'str'>
>>> type(b'hi')
<class 'bytes'>
>>> type('hi'.encode())
<class 'bytes'>
>>> type(bytes('hi'))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: string argument without an encoding
>>> type(bytes('hi','utf-8'))
<class 'bytes'>
>>> type(b'hi'.decode())
<class 'str'>
>>> type(str(b'hi'))
<class 'str'>
>>> type(str(b'hi','utf-8'))
<class 'str'>
>>> str(b'hi')
"b'hi'"
>>> str(b'hi','utf-8')
'hi'
>>> 
```

# 整型Integers

python 2中有两种整型类型，int（plain integers）和long（long integers）。int型用C语言中的`long`类型实现—至少32位。sys.maxint表示希望当前平台最大的int型数值，而最小值是 （-sys.maxint - 1）。而long型没有精度限制（unlimited precision）。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> type(1)
<type 'int'>
>>> type(1l)
<type 'long'>
>>> type(1L)
<type 'long'>
>>> import sys
>>> sys.maxint
9223372036854775807
>>> l = 92233720368547758070
>>> type(l)
<type 'long'>
>>> l
92233720368547758070L
>>> 
```
python 3中long重命名为int，即只有一种整型，int，但其表现与之前的long一样。int型没有了数值限制，也不再有sys.maxint常量。然而，[sys.maxsize](https://docs.python.org/3/library/sys.html#sys.maxsize)是Py_ssize_t类型可以接受de最大数值，一般是2^31 - 1（32位平台）或 2^63 - 1 （64位平台），可以作为比任何实际list或string index都大的整数。
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> type(1)
<class 'int'>
>>> type(1L)
  File "<stdin>", line 1
    type(1L)
          ^
SyntaxError: invalid syntax
>>> import sys
>>> sys.maxint
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'sys' has no attribute 'maxint'
>>> sys.maxsize
9223372036854775807
>>> 
```

python 2中，如果除法`/`操作数都是整型，其结果也是整型。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 5/2
2
>>> 5.0/2
2.5
>>> 5//2
2
>>> 5.0//2
2.0
>>> 
```

而python 3中，即使操作数都是整型，除法`/`结果也返回浮点型，而`//`会返回截断的整型结果。
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information
>>> 5/2
2.5
>>> 5.0/2
2.5
>>> 5//2
2
>>> 5.0//2
2.0
>>> 4/2
2.0
>>> 
```

python 2中八进制以0开头。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 010
8
>>> 
```

python 3中改为0o开头。
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 010
  File "<stdin>", line 1
    010
      ^
SyntaxError: invalid token
>>> 0o10
8
>>> 
```

# range

在Python 2中，[range()](https://docs.python.org/2.7/library/functions.html#range)返回一个list。而[xrange()](https://docs.python.org/2.7/library/functions.html#xrange)返回一个xrange object——可迭代对象。Thanks to its “lazy-evaluation”, the advantage of the regular `range()` is that `xrange()` is generally faster if you have to iterate over it only once (e.g., in a for-loop). However, in contrast to 1-time iterations, it is not recommended if you repeat the iteration multiple times, since the generation happens every time from scratch!
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> range(3)
[0, 1, 2]
>>> xrange(3)
xrange(3)
>>> type(range(3))
<type 'list'>
>>> type(xrange(3))
<type 'xrange'>
>>> for x in range(3): print x,
... 
0 1 2
>>> for x in xrange(3): print x,
... 
0 1 2
>>> 
```

Python 3中， [range()](https://docs.python.org/3.7/library/functions.html#func-range)采用了类似python 2中`xrange()` 的实现，并废弃了 `xrange()`。And `range()`method `__contains__` speeds up lookups.
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> range(3)
range(0, 3)
>>> xrange(3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'xrange' is not defined
>>> type(range(3))
<class 'range'>
>>> for x in range(3): print(x, end=" ")
... 
0 1 2 >>> 
```


# comparing unorderable types

Python 2中，unorderable类型也可以比较。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> [1, 2] > 'foo'
False
>>> (1, 2) > 'foo'
True
>>> [1, 2] > (1, 2)
False
>>>  
```

Python 3中，当尝试比较unorderable类型时会抛出 `TypeError`异常。 
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> [1, 2] > 'foo'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '>' not supported between instances of 'list' and 'str'
>>> 
```

# exceptions

## raising exceptions

python 2支持两种抛异常的方式：
- `raise IOError("file error")` 
- `raise IOError, "file error"`

python 3只支持`raise IOError("file error")`。

## handling exceptions
python 2中如下捕获异常：
- `except NameError, err:` 
- `except (TypeError, NameError), err:` 

python 3中捕获异常必须使用`as`关键字: 
- `except NameError as err` 
- `except (TypeError, NameError) as err` 

# for-loop variables

python 2, Loop variables in a comprehension leak to global namespace.
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> i = 1
>>> print 'before: i =', i
before: i = 1
>>> print 'comprehension: ', [i for i in range(5)]
comprehension:  [0, 1, 2, 3, 4]
>>> print 'after: i =', i
after: i = 4
>>> 
```

python 3, Loop variables are limited in scope to the comprehension.
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> i = 1
>>> print('before: i =', i)
before: i = 1
>>> print('comprehension:', [i for i in range(5)])
comprehension: [0, 1, 2, 3, 4]
>>> print('after: i =', i)
after: i = 1
>>> 
```

# round()

在python 2中, 对于函数`round(number[, ndigits])`，如果ndigits被省略，则其默认为0，结果为浮点型。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> round(16.5) 
17.0
>>> 
```

在python 3中, 如果函数`round(number[, ndigits])`的参数ndigits被省略或者是 None，函数返回入参input最近的整数。
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> round(16.5) 
16
>>> 
```


# views/iterators & lists

python 2中，函数`map()`, `filter()`, `zip()`, `dict.items()`, `dict.keys()`, `dict.values()` 返回lists。而python 3中，这些函数返回对象（for lazy evaluation）：
- [dict](https://docs.python.org/3/library/stdtypes.html#dict) methods [dict.keys()](https://docs.python.org/3/library/stdtypes.html#dict.keys), [dict.items()](https://docs.python.org/3/library/stdtypes.html#dict.items) and [dict.values()](https://docs.python.org/3/library/stdtypes.html#dict.values) return “views” instead of lists.
- Also, the dict.iterkeys(), dict.iteritems() and dict.itervalues() methods are no longer supported.
- [map()](https://docs.python.org/3/library/functions.html#map) and [filter()](https://docs.python.org/3/library/functions.html#filter) return iterators.
- [zip()](https://docs.python.org/3/library/functions.html#zip) returns an iterator.

# input

python 2中，`raw_input([prompt])`从输入读取一行，将其转换为字符串并返回。而`input([prompt])`等同于`eval(raw_input(prompt))`，将输入作为python表达式计算。
```shell
SWAN:~ Brighton$ python2
Python 2.7.15 (default, Dec  5 2018, 10:48:09) 
[GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> s = raw_input('--> ')
--> hello
>>> s
'hello'
>>> 
>>> t = input('==> ')
==> s + 'world'
>>> t
'helloworld'
>>>
```
python 3中，`input([prompt])`类似python 2的`raw_input()`。
```shell
SWAN:~ Brighton$ python3
Python 3.7.0 (default, Sep  6 2018, 10:07:52) 
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> s = raw_input('--> ')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'raw_input' is not defined
>>> s = input('--> ')
--> hello + world
>>> s
'hello + world'
>>> 
```

# 参考资料

The [What's New in Python 3.0](http://docs.python.org/py3k/whatsnew/3.0.html) document provides a good overview of the major language changes and likely sources of incompatibility with existing Python 2.x code. 

Nick Coghlan (one of the CPython core developers) has also created a [relatively extensive FAQ](http://python-notes.curiousefficiency.org/en/latest/python3/questions_and_answers.html) regarding the transition.

