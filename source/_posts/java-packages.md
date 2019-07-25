---
title: Java Packages 包
catalog: true
date: 2017-01-12 14:16:28
updated: 2017-01-12 18:16:57
subtitle:
cover: /posts/java-interfaces-inheritance/8ja97vad34ev17ces.jpg
categories:
- 技术
tags: Java
---

A *package* is a grouping of related types providing access protection and name space management. Note that *types* refers to classes, interfaces, enumerations, and annotation types. Enumerations and annotation types are special kinds of classes and interfaces, respectively, so *types* are often referred to simply as *classes and interfaces*.
<!--more--> 

You should bundle these classes and the interface in a package for several reasons, including the following:

- You and other programmers can easily determine that these types are related.
- You and other programmers know where to find types that can provide graphics-related functions.
- The names of your types won't conflict with the type names in other packages because the package creates a new namespace.
- You can allow types within the package to have unrestricted access to one another yet still restrict access for types outside the package.

# Creating a Package

To create a package, you choose a name for the package and put a `package` statement with that name at the top of *every source file* that contains the types (classes, interfaces, enumerations, and annotation types) that you want to include in the package.

The package statement (for example, `package graphics;`) must be the first line in the source file. There can be only one package statement in each source file, and it applies to all types in the file.

If you put multiple types in a single source file, only one can be `public`, and it must have the same name as the source file. You can include non-public types in the same file as a public type (this is strongly discouraged, unless the non-public types are small and closely related to the public type), but only the public type will be accessible from outside of the package. All the top-level, non-public types will be *package private*.

If you do not use a `package` statement, your type ends up in an unnamed package. Generally speaking, an unnamed package is only for small or temporary applications or when you are just beginning the development process. Otherwise, classes and interfaces belong in named packages.

# Naming a Package

Package names are written in all lower case to avoid conflict with the names of classes or interfaces.

Companies use their reversed Internet domain name to begin their package names—for example, `com.example.mypackage` for a package named `mypackage` created by a programmer at `example.com`.

Name collisions that occur within a single company need to be handled by convention within that company, perhaps by including the region or the project name after the company name (for example, `com.example.region.mypackage`).

Packages in the Java language itself begin with `java.` or `javax.`

In some cases, the internet domain name may not be a valid package name. This can occur if the domain name contains a hyphen or other special character, if the package name begins with a digit or other character that is illegal to use as the beginning of a Java name, or if the package name contains a reserved Java keyword, such as "int". In this event, the suggested convention is to add an underscore. For example:

| Domain Name                   | Package Name Prefix           |
| ----------------------------- | ----------------------------- |
| `hyphenated-name.example.org` | `org.example.hyphenated_name` |
| `example.int`                 | `int_.example`                |
| `123name.example.com`         | `com.example._123name`        |

# Using Package Members

The types that comprise a package are known as the *package members*.

To use a `public` package member from outside its package, you must do one of the following:

- Refer to the member by its fully qualified name
- Import the package member
- Import the member's entire package

## Referring to a Package Member by Its Qualified Name

You can use a package member's simple name if the code you are writing is in the same package as that member or if that member has been imported.

However, if you are trying to use a member from a different package and that package has not been imported, you must use the member's fully qualified name, which includes the package name. For example:

```java
graphics.Rectangle myRect = new graphics.Rectangle();
```

Qualified names are all right for infrequent use. When a name is used repetitively, however, typing the name repeatedly becomes tedious and the code becomes difficult to read. As an alternative, you can *import* the member or its package and then use its simple name.

## Importing a Package Member

To import a specific member into the current file, put an `import` statement at the beginning of the file before any type definitions but after the `package` statement, if there is one. Here's how you would import the `Rectangle` class from the `graphics` package and refer to the `Rectangle` class by its simple name.
```java
import graphics.Rectangle;

Rectangle myRectangle = new Rectangle();
```
This approach works well if you use just a few members from the `graphics` package. But if you use many types from a package, you should import the entire package.

## Importing an Entire Package

To import all the types contained in a particular package, use the `import` statement with the asterisk `(*)` wildcard character.

```
import graphics.*;
```

Now you can refer to any class or interface in the `graphics` package by its simple name.

```
Circle myCircle = new Circle();
Rectangle myRectangle = new Rectangle();
```

The asterisk in the `import` statement can be used only to specify all the classes within a package, as shown here. It cannot be used to match a subset of the classes in a package. For example, the following does not match all the classes in the `graphics` package that begin with `A`.

```java
// does not work
import graphics.A*;
```

Instead, it generates a compiler error. With the `import` statement, you generally import only a single package member or an entire package.

Another, less common form of `import` allows you to import the public nested classes of an enclosing class. For example, if the `graphics.Rectangle` class contained useful nested classes, such as `Rectangle.DoubleWide` and `Rectangle.Square`, you could import `Rectangle` and its nested classes by using the following *two* statements.

```java
import graphics.Rectangle;
import graphics.Rectangle.*;
```

Be aware that the second import statement will *not* import `Rectangle`.

For convenience, the Java compiler automatically imports two entire packages for each source file: 
(1) the `java.lang` package and 
(2) the current package (the package for the current file).

## Apparent Hierarchies of Packages

At first, packages appear to be hierarchical, but they are not. For example, the Java API includes a `java.awt` package, a `java.awt.color` package, a `java.awt.font` package, and many others that begin with `java.awt`. However, the `java.awt.color` package, the `java.awt.font`package, and other `java.awt.xxxx` packages are *not included* in the `java.awt` package. The prefix `java.awt` (the Java Abstract Window Toolkit) is used for a number of related packages to make the relationship evident, but not to show inclusion.

Importing `java.awt.*` imports all of the types in the `java.awt` package, but it *does not import* `java.awt.color`, `java.awt.font`, or any other `java.awt.xxxx` packages. If you plan to use the classes and other types in `java.awt.color` as well as those in `java.awt`, you must import both packages with all their files:

```java
import java.awt.*;
import java.awt.color.*;
```

## Name Ambiguities

If a member in one package shares its name with a member in another package and both packages are imported, you must refer to each member by its qualified name. For example, the `graphics` package defined a class named `Rectangle`. The `java.awt` package also contains a `Rectangle` class. If both `graphics` and `java.awt` have been imported, the following is ambiguous.

```java
Rectangle rect;
```

In such a situation, you have to use the member's fully qualified name to indicate exactly which `Rectangle` class you want. For example,

```java
graphics.Rectangle rect;
```

## The Static Import Statement

There are situations where you need frequent access to static final fields (constants) and static methods from one or two classes. Prefixing the name of these classes over and over can result in cluttered code. The *static import* statement gives you a way to import the constants and static methods that you want to use so that you do not need to prefix the name of their class.

The `java.lang.Math` class defines the `PI` constant and many static methods, including methods for calculating sines, cosines, tangents, square roots, maxima, minima, exponents, and many more. For example,

```java
public static final double PI 
    = 3.141592653589793;
public static double cos(double a)
{
    ...
}
```

Ordinarily, to use these objects from another class, you prefix the class name, as follows.

```java
double r = Math.cos(Math.PI * theta);
```

You can use the static import statement to import the static members of java.lang.Math so that you don't need to prefix the class name, `Math`. The static members of `Math` can be imported either individually:

```java
import static java.lang.Math.PI;
```

or as a group:

```java
import static java.lang.Math.*;
```

Once they have been imported, the static members can be used without qualification. For example, the previous code snippet would become:

```java
double r = cos(PI * theta);
```

Obviously, you can write your own classes that contain constants and static methods that you use frequently, and then use the static import statement. For example,

```java
import static mypackage.MyConstants.*;
```

Use static import very sparingly. Overusing static import can result in code that is difficult to read and maintain, because readers of the code won't know which class defines a particular static object. Used properly, static import makes code more readable by removing class name repetition.

# Managing Source and Class Files

Many implementations of the Java platform rely on hierarchical file systems to manage source and class files, although *The Java Language Specification* does not require this. The strategy is as follows.

Put the source code for a class, interface, enumeration, or annotation type in a text file whose name is the simple name of the type and whose extension is `.java`. For example:

```java
//in the Rectangle.java file 
package graphics;
public class Rectangle {
   ... 
}
```

Then, put the source file in a directory whose name reflects the name of the package to which the type belongs: `.....\graphics\Rectangle.java`

The qualified name of the package member and the path name to the file are parallel, assuming the Microsoft Windows file name separator backslash (for UNIX, use the forward slash).

- **class name** – `graphics.Rectangle`
- **pathname to file** – `graphics\Rectangle.java`

As you should recall, by convention a company uses its reversed Internet domain name for its package names. The Example company, whose Internet domain name is `example.com`, would precede all its package names with `com.example`. Each component of the package name corresponds to a subdirectory. So, if the Example company had a `com.example.graphics` package that contained a `Rectangle.java` source file, it would be contained in a series of subdirectories like this: `....\com\example\graphics\Rectangle.java`

When you compile a source file, the compiler creates a different output file for each type defined in it. The base name of the output file is the name of the type, and its extension is `.class`. For example, if the source file is like this

```java
//in the Rectangle.java file
package com.example.graphics;
public class Rectangle {
      . . . 
}

class Helper{
      . . . 
}
```

then the compiled files will be located at:
`<path_to_the_parent_directory_of_the_output_files>\com\example\graphics\Rectangle.class`
`<path_to_the_parent_directory_of_the_output_files>\com\example\graphics\Helper.class`

Like the `.java` source files, the compiled `.class` files should be in a series of directories that reflect the package name. However, the path to the `.class` files does not have to be the same as the path to the `.java` source files. You can arrange your source and class directories separately, as:
`<path_one>\sources\com\example\graphics\Rectangle.java`
`<path_two>\classes\com\example\graphics\Rectangle.class`

By doing this, you can give the `classes` directory to other programmers without revealing your sources. You also need to manage source and class files in this manner so that the compiler and the Java Virtual Machine (JVM) can find all the types your program uses.

The full path to the `classes` directory, `<path_two>\classes`, is called the *class path*, and is set with the `CLASSPATH` system variable. Both the compiler and the JVM construct the path to your `.class` files by adding the package name to the class path. For example, if `<path_two>\classes` is your class path, and the package name is `com.example.graphics`, then the compiler and JVM look for `.class files` in `<path_two>\classes\com\example\graphics`.

A class path may include several paths, separated by a semicolon (Windows) or colon (UNIX). By default, the compiler and the JVM search the current directory and the JAR file containing the Java platform classes so that these directories are automatically in your class path.

## Setting the CLASSPATH System Variable

To display the current `CLASSPATH` variable, use these commands in Windows and UNIX (Bourne shell):

```
In Windows:   C:\> set CLASSPATH
In UNIX:      % echo $CLASSPATH
```

To delete the current contents of the `CLASSPATH` variable, use these commands:

```
In Windows:   C:\> set CLASSPATH=
In UNIX:      % unset CLASSPATH; export CLASSPATH
```

To set the `CLASSPATH` variable, use these commands (for example):

```
In Windows:   C:\> set CLASSPATH=C:\users\brighton\java\classes
In UNIX:      % CLASSPATH=/home/brighton/java/classes; export CLASSPATH
```

