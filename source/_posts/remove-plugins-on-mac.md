---
title: MacOS彻底卸载软件和插件
catalog: false
date: 2019-06-14 15:46:24
subtitle:
cover: "dd6rjybqkw8ye.jpg"
updated: 2019-06-14 15:46:24
categories:
- 巧技
tags:
---

MacOS卸载程序很简单，对于非app store安装的应用，只要移除  /Applications  下对应的文件即可。但是这种卸载方式可能会留下一些缓存、配置信息和插件——这些可能较大，也可能很小几乎不占空间——但我总是希望删得干干净净彻彻底底。
<!--more--> 

一款优秀的软件会在说明文档里写清楚安装卸载方法，如Wireshark：

> **Quick Setup**
>
> Simply double-click the Wireshark package. For details about the installation read below.
>
> <br>
>
> **What changes does the installer make?**
>
> The installer writes to the following locations:
>
> - */Applications/Wireshark.app*. The main Wireshark application.
> - */Library/LaunchDaemons/org.wireshark.ChmodBPF.plist*. A launch daemon that adjusts permissions on the system's packet capture devices (*/dev/bpf**) when the system starts up.
> - */Library/Application Support/Wireshark/ChmodBPF* A copy of the launch daemon property list, and the script that the launch daemon runs.
> - */usr/local/bin*. A wrapper script and symbolic links which will let you run Wireshark and its associated utilities from the command line. You can access them directly or by adding /usr/local/bin to your PATH if it's not already in your PATH.
>
> - */etc/paths.d/Wireshark*. The folder name in this file is automatically added to PATH
> - */etc/manpaths.d/Wireshark*. The folder name in this file is used by the man command.
>
> Additionally a group named *access_bpf* is created. The user who opened the package is added to the group.
>
> <br>
>
> **How do I uninstall?**
>
> 1. Remove */Applications/Wireshark.app*
> 2. Remove */Library/Application Support/Wireshark*
> 3. Remove the wrapper scripts from */usr/local/bin*
> 4. Unload the *org.wireshark.ChmodBPF.plist* launchd job
> 5. Remove */Library/LaunchDaemons/org.wireshark.ChmodBPF.plist*
> 6. Remove the *access_bpf* group.
> 7. Remove */etc/paths.d/Wireshark*
> 8. Remove */etc/manpaths.d/Wireshark*

然而有些奇葩就不会有任何说明，比如我今天遇到的海康威视萤石视频播放插件。

今天本来想在电脑上看看家里摄像头的情况，在萤石官网下载了浏览器视频播放mac插件，安装完成之后，还折腾了一圈账号密码，最后告诉现在不支持网页查看了，只能使用Windows安装萤石云工作室。WTF! 

然后我就来卸载刚刚装的这个垃圾插件，但是我在  /Applications 没有看到任何萤石插件的影子。我想到下载的安装文件加PCPlayer.pkg，打开提示是install MACPlayer，所以尝试搜索了PCPlayer 和 MACPlayer，无果。

Google得知，原来浏览器插件是在 Library/Internet Plug-Ins 目录下，终于在 /Library/Internet Plug-Ins 目录下发现了SP7WebVideoPlugin.plugin这个孽畜，果断rm掉，顿觉神清气爽。

整理总结下今天搜索的结果：

MacOS有三个Library（资源库）：

1. /System/Library 系统资源库
2. /Library 管理员资源库
3.  ~/Library 当前用户资源库

一些常见插件路径：

- 网络插件：Library/Internet Plug-Ins  
- 系统偏好设置插件：Library/PreferencePanes 
- Spotlight搜索插件： Library/Spotlight
- Finder插件：Library/Contextual Menu Items 
- QuickLook插件：Library/QuickLook

一般在 /Applications里删除某软件后，可以检查如下路径是否有残留：

* ~/Library 目录下软件开发者名称或者软件名称
* ~/Library/Application Support 
* /Library/Application Support
* ~/Library/Preferences
* /Library/Preferences
* ~/Library/Caches 
* ~/Library/Containers
* ~/Library/LaunchAgents
* /Library/LaunchAgents

MacOS内置有[pkgutil]( https://en.wikiversity.org/wiki/MacOS/pkgutil)命令行工具管理packages(.pkg_files)。

BTW，我就是不想用Dr. Cleaner、AppCleaner、CleanMyMac、腾讯电脑管家。。。

