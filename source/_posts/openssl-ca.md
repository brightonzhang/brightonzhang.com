---
title: OpenSSL CA实践
catalog: true
date: 2018-05-12 20:45:42
subtitle: 为华硕路由器HTTPS登陆添加自签名证书
updated: 2018-05-12 20:45:42
cover: p2520923397.jpg
categories:
- 技术
tags:
- OpenSSL 
- 网络安全

---

本文将描述如何用OpenSSL建立CA，签发证书，以及各系统下安装CA证书等。

最近家里华硕路由器固件升级后，发现DDNS访问可以添加SSL证书了，这样就再也不用忍受Chrome上那个不安全的图标了。从设置页面看，系统支持Let's Encrypt自动获取证书和用户导入证书。我先尝试了Let's Encrypt，但一直显示”正在更新“。咨询了华硕技服后了解到Let's Encrypt证书更新依赖80端口，我宽带的80端口估计被电信封掉了，所以一直“正在更新”。既然这样，我干脆自己建个CA给DDNS域名签发证书好了——反正就是几个OpenSSL命令的事。
<!--more--> 

## CA
CA, certificate authority, 即签发数字证书的机构。证书链的信任根由根证书提供，根证书的最大特点就是签发人和使用人都是相同的实体，这个实体就是CA。
被全球广泛认可的CA并不多，这些CA的跟证书一般都被浏览器或系统预置了，所以我们可以直接访问这些CA签发的网站而不会提示安全风险。如果网站使用了私有CA签发的证书，那就需要用户自己安装跟证书了——这就是上12306买票要装他们那个根证书的原因。我今天也要做的就是充当CA的角色，先生成根证书，然后签发路由器域名需要的服务器证书。

## 生成根证书

首先准备好工作目录，如$CADIR，并在该目录下创建相应的文件（夹）：

```shell
mkdir $CADIR
cd $CADIR
mkdir certs crl newcerts private
chmod 700 private
touch index.txt
echo 1000 > serial
```

index.txt和serial文件作为数据库来记录签发的证书。

然后准备OpenSSL配置文件。我



## 生成服务器证书

## 部署服务器证书

## 安装根证书





参考资料：
[OpenSSL Certificate Authority](https://jamielinux.com/docs/openssl-certificate-authority/index.html)

[OS 11 installed certificates not trusted automatically (self signed)](https://stackoverflow.com/questions/44952985/ios-11-installed-certificates-not-trusted-automatically-self-signed)


