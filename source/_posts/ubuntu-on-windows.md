title: Ubuntu on Windows 初体验
date: 2016-08-14 14:18:26
updated: 2016-08-14 14:18:26
cover: 
catalog: false
categories: 杂言
tags: 
- Linux

---

在build 2016开发者大会上，微软发布了Bash on Ubuntu on Windows。在windows上运行原生bash，听起来还是很有吸引力了。终于可以抛弃那个鸡肋的cmd，还有那个很多人都不知道PowerShell了。
连续三个周末都要跑医院之后，今天终于有空了，找了一台windows的笔电，升级了周年更新，可以来体验下Bash on Ubuntu on Windows了。
<!--more--> 

安装完windows 10周年更新之后，我并没有找到任何的bash入口。google了下，原来这个功能还是隐藏在开发者模式中。如果想用bash，需要先到 设置／更新和安全／针对开发者 中选择开发者模式，然后在  控制面板／程序／启用和关闭windows功能 中启用 “适用于Linux的Windows子系统(Beta)”，然后运行cmd，输入bash，再y进行安装。安装下载速度并不稳定，我下载了3次才下载成功。下载安装完成之后，会提示设置UNIX用户名和密码，然后就基本安装设置完成，可以使用bash了。
``` shell
brighton@DESKTOP-BQ3SOKG:~$ uname -a
Linux DESKTOP-BQ3SOKG 3.4.0+ #1 PREEMPT Thu Aug 1 17:06:05 CST 2013 x86_64 x86_64 x86_64 GNU/Linux
brighton@DESKTOP-BQ3SOKG:~$ cat /etc/issue
Ubuntu 14.04.4 LTS \n \l

```
这里看到运行的是Ubuntu 14.04。

``` shell
brighton@DESKTOP-BQ3SOKG:~$ cd /mnt/c/
Config.Msi/                ProgramData/               ProgramPortable/           $SysReset/                 Users/                     Windows.old/
Intel/                     Program Files/             Recovery/                  System Volume Information/ Windows/
PerfLogs/                  Program Files (x86)/       $RECYCLE.BIN/              Tencent/                   $WINDOWS.~BT/
brighton@DESKTOP-BQ3SOKG:~$ cd /mnt/c/Users/lvyujuan/Documents/
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents$ mkdir test
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents$ cd test/
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$
```
Windows目录是挂载在/mnt/目录下，可以直接操作windows目录。

尝试用vi创建一个Hello world C语言程序，并用gcc编译。
```shell
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ vi hello.c
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ gcc hello.c -o hello
The program 'gcc' is currently not installed. You can install it by typing:
sudo apt-get install gcc
```
Oh, 没有集成gcc，那装个呗。
```shell
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ sudo apt-get install gcc
sudo: unable to resolve host DESKTOP-BQ3SOKG
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libfreetype6 os-prober
Use 'apt-get autoremove' to remove them.
The following extra packages will be installed:
  binutils cpp cpp-4.8 gcc-4.8 gcc-4.8-base libasan0 libatomic1 libc-dev-bin
  libc6 libc6-dev libcloog-isl4 libgcc-4.8-dev libgmp10 libgomp1 libisl10
  libitm1 libmpc3 libmpfr4 libquadmath0 libstdc++6 libtsan0 linux-libc-dev
  manpages-dev
Suggested packages:
  binutils-doc cpp-doc gcc-4.8-locales gcc-multilib make autoconf automake1.9
  libtool flex bison gdb gcc-doc gcc-4.8-multilib gcc-4.8-doc libgcc1-dbg
  libgomp1-dbg libitm1-dbg libatomic1-dbg libasan0-dbg libtsan0-dbg
  libquadmath0-dbg glibc-doc
The following NEW packages will be installed:
  binutils cpp cpp-4.8 gcc gcc-4.8 libasan0 libatomic1 libc-dev-bin libc6-dev
  libcloog-isl4 libgcc-4.8-dev libgmp10 libgomp1 libisl10 libitm1 libmpc3
  libmpfr4 libquadmath0 libtsan0 linux-libc-dev manpages-dev
The following packages will be upgraded:
  gcc-4.8-base libc6 libstdc++6
3 upgraded, 21 newly installed, 0 to remove and 45 not upgraded.
Need to get 24.3 MB of archives.
After this operation, 70.6 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://archive.ubuntu.com/ubuntu/ trusty-updates/main gcc-4.8-base amd64 4.8.4-2ubuntu1~14.04.3 [16.2 kB]
Get:2 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libstdc++6 amd64 4.8.4-2ubuntu1~14.04.3 [259 kB]
Get:3 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libc6 amd64 2.19-0ubuntu6.9 [4,717 kB]
Get:4 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libasan0 amd64 4.8.4-2ubuntu1~14.04.3 [63.1 kB]
Get:5 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libatomic1 amd64 4.8.4-2ubuntu1~14.04.3 [8,636 B]
Get:6 http://archive.ubuntu.com/ubuntu/ trusty/main libgmp10 amd64 2:5.1.3+dfsg-1ubuntu1 [218 kB]
Get:7 http://archive.ubuntu.com/ubuntu/ trusty/main libisl10 amd64 0.12.2-1 [419 kB]
Get:8 http://archive.ubuntu.com/ubuntu/ trusty/main libcloog-isl4 amd64 0.18.2-1 [57.5 kB]
Get:9 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libgomp1 amd64 4.8.4-2ubuntu1~14.04.3 [23.1 kB]
Get:10 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libitm1 amd64 4.8.4-2ubuntu1~14.04.3 [28.5 kB]
Get:11 http://archive.ubuntu.com/ubuntu/ trusty/main libmpfr4 amd64 3.1.2-1 [203 kB]
Get:12 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libquadmath0 amd64 4.8.4-2ubuntu1~14.04.3 [126 kB]
Get:13 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libtsan0 amd64 4.8.4-2ubuntu1~14.04.3 [94.9 kB]
Get:14 http://archive.ubuntu.com/ubuntu/ trusty/main libmpc3 amd64 1.0.1-1ubuntu1 [38.4 kB]
Get:15 http://archive.ubuntu.com/ubuntu/ trusty-updates/main binutils amd64 2.24-5ubuntu14.1 [2,081 kB]
Get:16 http://archive.ubuntu.com/ubuntu/ trusty-updates/main cpp-4.8 amd64 4.8.4-2ubuntu1~14.04.3 [4,595 kB]
Get:17 http://archive.ubuntu.com/ubuntu/ trusty/main cpp amd64 4:4.8.2-1ubuntu6 [27.5 kB]
Get:18 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libgcc-4.8-dev amd64 4.8.4-2ubuntu1~14.04.3 [1,688 kB]
Get:19 http://archive.ubuntu.com/ubuntu/ trusty-updates/main gcc-4.8 amd64 4.8.4-2ubuntu1~14.04.3 [5,047 kB]
Get:20 http://archive.ubuntu.com/ubuntu/ trusty/main gcc amd64 4:4.8.2-1ubuntu6 [5,098 B]
Get:21 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libc-dev-bin amd64 2.19-0ubuntu6.9 [69.0 kB]
Get:22 http://archive.ubuntu.com/ubuntu/ trusty-updates/main linux-libc-dev amd64 3.13.0-93.140 [771 kB]
Get:23 http://archive.ubuntu.com/ubuntu/ trusty-updates/main libc6-dev amd64 2.19-0ubuntu6.9 [1,910 kB]
Get:24 http://archive.ubuntu.com/ubuntu/ trusty/main manpages-dev all 3.54-1ubuntu1 [1,820 kB]
Fetched 24.3 MB in 2min 21s (172 kB/s)
Preconfiguring packages ...
(Reading database ... 25004 files and directories currently installed.)
Preparing to unpack .../gcc-4.8-base_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking gcc-4.8-base:amd64 (4.8.4-2ubuntu1~14.04.3) over (4.8.4-2ubuntu1~14.04.1) ...
Setting up gcc-4.8-base:amd64 (4.8.4-2ubuntu1~14.04.3) ...
(Reading database ... 25004 files and directories currently installed.)
Preparing to unpack .../libstdc++6_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libstdc++6:amd64 (4.8.4-2ubuntu1~14.04.3) over (4.8.4-2ubuntu1~14.04.1) ...
Setting up libstdc++6:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Processing triggers for libc-bin (2.19-0ubuntu6.7) ...
(Reading database ... 25004 files and directories currently installed.)
Preparing to unpack .../libc6_2.19-0ubuntu6.9_amd64.deb ...
Unpacking libc6:amd64 (2.19-0ubuntu6.9) over (2.19-0ubuntu6.7) ...
Setting up libc6:amd64 (2.19-0ubuntu6.9) ...
Processing triggers for libc-bin (2.19-0ubuntu6.7) ...
Selecting previously unselected package libasan0:amd64.
(Reading database ... 25004 files and directories currently installed.)
Preparing to unpack .../libasan0_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libasan0:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libatomic1:amd64.
Preparing to unpack .../libatomic1_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libatomic1:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libgmp10:amd64.
Preparing to unpack .../libgmp10_2%3a5.1.3+dfsg-1ubuntu1_amd64.deb ...
Unpacking libgmp10:amd64 (2:5.1.3+dfsg-1ubuntu1) ...
Selecting previously unselected package libisl10:amd64.
Preparing to unpack .../libisl10_0.12.2-1_amd64.deb ...
Unpacking libisl10:amd64 (0.12.2-1) ...
Selecting previously unselected package libcloog-isl4:amd64.
Preparing to unpack .../libcloog-isl4_0.18.2-1_amd64.deb ...
Unpacking libcloog-isl4:amd64 (0.18.2-1) ...
Selecting previously unselected package libgomp1:amd64.
Preparing to unpack .../libgomp1_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libgomp1:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libitm1:amd64.
Preparing to unpack .../libitm1_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libitm1:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libmpfr4:amd64.
Preparing to unpack .../libmpfr4_3.1.2-1_amd64.deb ...
Unpacking libmpfr4:amd64 (3.1.2-1) ...
Selecting previously unselected package libquadmath0:amd64.
Preparing to unpack .../libquadmath0_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libquadmath0:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libtsan0:amd64.
Preparing to unpack .../libtsan0_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libtsan0:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package libmpc3:amd64.
Preparing to unpack .../libmpc3_1.0.1-1ubuntu1_amd64.deb ...
Unpacking libmpc3:amd64 (1.0.1-1ubuntu1) ...
Selecting previously unselected package binutils.
Preparing to unpack .../binutils_2.24-5ubuntu14.1_amd64.deb ...
Unpacking binutils (2.24-5ubuntu14.1) ...
Selecting previously unselected package cpp-4.8.
Preparing to unpack .../cpp-4.8_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking cpp-4.8 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package cpp.
Preparing to unpack .../cpp_4%3a4.8.2-1ubuntu6_amd64.deb ...
Unpacking cpp (4:4.8.2-1ubuntu6) ...
Selecting previously unselected package libgcc-4.8-dev:amd64.
Preparing to unpack .../libgcc-4.8-dev_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking libgcc-4.8-dev:amd64 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package gcc-4.8.
Preparing to unpack .../gcc-4.8_4.8.4-2ubuntu1~14.04.3_amd64.deb ...
Unpacking gcc-4.8 (4.8.4-2ubuntu1~14.04.3) ...
Selecting previously unselected package gcc.
Preparing to unpack .../gcc_4%3a4.8.2-1ubuntu6_amd64.deb ...
```
Done.
```shell
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ gcc hello.c -o hello
```
编译成功，看一下生成的文件。
```shell
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ file hello
hello: ELF 64-bit LSB  executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.24, BuildID[sha1]=11ac1a45fd5649b002ee581fe3b3f9565639d729, not stripped
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ readelf -h hello
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x400440
  Start of program headers:          64 (bytes into file)
  Start of section headers:          4472 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         9
  Size of section headers:           64 (bytes)
  Number of section headers:         30
  Section header string table index: 27
```
可以看到，生成的可执行程序hello是ELF 64位，UNIX运行平台的文件。执行一下：
```shell
brighton@DESKTOP-BQ3SOKG:/mnt/c/Users/lvyujuan/Documents/test$ ./hello
Hello, world.
```
运行成功。

通过上面的测试，我们可以运行基本的shell命令，可以通过apt-get安装程序，可以直接运行linux可执行程序。

按照微软的介绍，这不是虚拟机，不是容器，不是像cygwin那样，这是在Windows上直接运行Ubuntu的ELF的二进制程序，直接将Linux的系统跳用转变为windws的系统调用，微软称之为“Windows Subsystem for Linux”——就是前面控制面板中的“适用于Linux的Windows子系统”————和Ubuntu合作开发。

之前，Ubuntu一直把微软作为头号对手。2004年创始人马克﹒舍特尔沃斯发布了Ubuntu 的 Bug #1————Microsoft has a majority market share。马克 认为，微软占据了大多数新兴的桌面PC市场，这是一个Bug，Ubuntu要设法修正它。我自己一直很欣赏这份幽默。  
在2013年马克宣布关闭该Bug，他表示Windows已经被iOS和Android打败了。

现在Ubuntu和微软合作为我们带来“Windows Subsystem for Linux”。正如马克所言：与其把眼睛放在别人身上，不如多花点精力创造属于我们自己的辉煌。

PS：
最新发现visual code里面的终端窗口比cmd那个不知道好看多少倍，对复制粘贴也支持地更好，推荐体验。

参考资料：  
[Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about)  
[Microsoft has a majority market share](https://bugs.launchpad.net/ubuntu/+bug/1)

<!--
最后贴一张图  
![](/image/ubuntu-on-windows.jpg)
-->
