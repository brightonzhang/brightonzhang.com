---
title: 美好生活，从SSH Config开始
catalog: true
date: 2019-01-31 18:04:07
subtitle:
updated: 2019-01-31 18:04:07
cover: 
categories:
- 巧技
tags:
- Linux 
- SSH
---

每次ssh登陆主机还要输密码，好麻烦！
多个Git服务器，公司的代码库、自己的GitHub，多个ssh key怎么搞？

其实，这些都可以通过SSH配置来简化。
<!--more--> 

# Key-Based SSH登陆

Key-based authentication is the most secure of several modes of authentication usable with OpenSSH, such as plain password and Kerberos tickets. SSH can use either "RSA" (Rivest-Shamir-Adleman) or "DSA" ("Digital Signature Algorithm") keys. Both of these were considered state-of-the-art algorithms when SSH was invented, but DSA has come to be seen as less secure in recent years.
下面介绍基于rsa密钥的ssh登陆，免去密码输入之痛。

首先在客户端生成密钥对：执行如下命令，并根据提示输入密码等信息。

```shell
ssh-keygen -t rsa -b 4096 -C "brighton@winterfell" -f ~/.ssh/winterfell
```

其中：
`-t`，指定算法；
`-b`，指定密钥长度，bit位数；
`-C`，指定密钥标签，会标注在公钥末尾;
`-f`，指定输出文件名，如果不设置，后续也会有提示输入。

如此，会生成一对RSA密钥，其中winterfell为私钥，winterfell.pub为公钥。

然后将公钥配置到需要登陆的主机上。先使用密码登陆主机，将上一步生成的winterfell.pub内容保存到authorized_keys中。

```shell
cat winterfell.pub >> ~/.ssh/authorized_keys
```

主机SSH服务端的配置在`/etc/ssh/sshd_config`，可以查看相关设置。

至此，我们可以通过ssh登陆主机并使用`-i`参数指定密钥：

```shell
ssh -i ~/.ssh/winterfell brighton@winterfell
```

更多Key-based ssh登陆可以参考[Ubuntu Help SSH/OpenSSH/Keys](https://help.ubuntu.com/community/SSH/OpenSSH/Keys)。

# ssh config文件

当有多台主机时，每次都要指定密钥，用户名等也是非常麻烦，我们使用ssh config文件来配置，简化命令输入。

一般，ssh config文件有两个:
1. 用户配置文件，`~/.ssh/config`
2. 系统配置文件，`/etc/ssh/ssh_config`

配置文件格式:
- Empty lines and lines starting with '#' are comments.
- Each line begins with a keyword, followed by argument(s).
- Configuration options may be separated by whitespace or optional whitespace and exactly one =.
- Arguments may be enclosed in double quotes (") in order to specify arguments that contain spaces.

常用配置参数
`Host`: Restricts the following declarations to be only for those hosts that match one of the patterns given after the keyword. The pattern is matched against the host name given on the command line.
`HostName`: Specifies the real host name to log into. This can be used to specify nicknames or abbreviations for hosts. The default is the name given on the command line. Numeric IP addresses are also permitted (both on the command line and in HostName specifications).
`IdentityFile`: Specifies a file from which the user's identity key is read when using public key authentication. The default for protocol version 1 is ~/.ssh/identity; and ~/.ssh/id_rsa or ~/.ssh/id_dsa for protocol version 2.
`Port`: Specifies the port number to connect on the remote host. The default is 22.
`User`: Specifies the user to log in as. This can be useful when a different user name is used on different machines. This saves the trouble of having to remember to give the user name on the command line.
更多参数请参考[SSH man page](http://man.openbsd.org/OpenBSD-current/man5/ssh_config.5).

如此，我的`~/.ssh/config`示例:

```
Host winterfell
    HostName winterfell
    User brighton
    IdentityFile ~/.ssh/winterfell

Host vultrsv
    HostName 2001:*:9ee2
    User brighton
    IdentityFile ~/.ssh/vultr

Host bwhlacn2
    HostName 95.*.115
    Port 29726
    User brighton
    IdentityFile ~/.ssh/bwhlacn2

# GitLab.com server
Host gitlab.com
    # RSAAuthentication yes
    IdentityFile ~/.ssh/gitlabaaa
```

这样以来，`ssh winterfell`即可登陆winterfell路由器，`ssh vultrsv`即可登陆IP为2001:*:9ee2的主机。

Done!

