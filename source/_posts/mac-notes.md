title: MAC使用笔记
date: 2016-06-10 15:05:07
updated: 2016-06-10 15:05:07
categories:
- 巧技
tags: Mac
---

# 启动root用户

OS X Lion (10.7) 和更高版本
* 从 Apple 菜单中选取“系统偏好设置”。
* 从“显示”菜单中选取“用户与群组”。
* 点按锁图标并使用管理员帐户进行鉴定。
* 点按“登录选项”。
* 点按右下方的“编辑”或“加入”按钮。
* 点按“打开目录实用工具”按钮。
* 点按“目录实用工具”窗口中的锁图标。
* 输入管理员帐户名称和密码，然后点按“好”。
* 从“编辑”菜单中选取“启用 Root 用户”。
* 在“密码”和“验证”栏中输入您想要使用的 root 密码，然后点按“好”。

详请参考：https://support.apple.com/zh-cn/HT204012

# 启动项

该节主要参考至 http://www.tanhao.me/talk/1287.html/
Mac OS X的开机启动项分为3种：Login Items，Launchd Daemon和Startup Items。
###### Login Items
Login Item可能时我们见到的最后的，就是在 “系统偏好设置／用户与群组／登录项”里面设置的。其配置文件时保存在 $HOME/Library/Preferences/com.apple.loginitems.plist下面。
###### Lauchd Daemon
Launched Daemon是由launchd来负责启动的。launchd是内核加载之后启动的第一个进程。launchd用来完成系统初始化。launchd首先加载/System/Library/LaunchDaemons/和/Library/LaunchDaemons/目录下的launch-on-demand system-level daemon（这些是系统启动后立即启动的进程，是守护进程）。然后启动/System/Library/LaunchAgents, /Library/LaunchAgents 和$HOME/Library/LaunchAgents 下面的launch－on－demand user agent（这些是用户登录后启动的进程）。
我安装的tiger VPN的client的启动就是配置在/Library/LaunchAgents／com.tigeratwork.tigervpn.plist。
可以通过直接删除plist文件来移除启动项，也可以通过luanchctl命令来修改启动项。
e.g. sudo launchctl unload -w com.tigeratwork.tigervpn.plist #这样就可以移除tiger vpn client的开机自启动。
关于launchctl可以参考：http://ss64.com/osx/launchctl.html
执行launchctl unload －w之后，相应的plist文件还在，但重启之后的确不再启动了。我还没有找到配置文件保存在哪。
更多Launchd Daemon可以参考：https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html
###### Startup Items
Startup Items是系统启动过程中运行的程序，一般在/System/Library/StartupItems和/Library/StartupItems目录下。



