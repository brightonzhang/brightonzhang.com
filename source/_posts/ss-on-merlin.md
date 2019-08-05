---
title: Linux网络小实践：网络加速
catalog: true
date: 2019-01-15 11:39:19
subtitle: SS (ShadowSocks) on Asuswrt-merlin
updated: 2019-01-15 11:39:19
cover: 3180568124.jpg
categories:
- 技术
tags:
- Linux 
- 网络 
- ShadowSocks
- Asuswrt-merlin
---



本文先概述Linux网络相关的部分原理，然后基于此在路由器梅林固件上完成网络加速实践。
<!--more--> 

# 准备

## 网络模型

说网络总是绕不开网络模型，所以先祭出此表。

| OSI七层模型                    | TCP/IP模型 | 相关通信协议与标准              |
| ------------------------------ | ---------- | ------------------------------- |
| 应用层<br />表现层<br />会话层 | 应用层     | HTTP，FTP，SMTP，POP3，NFS，SSH |
| 传送层                         | 传送层     | TCP UDP                         |
| 网络层                         | 网络层     | IP，ICMP                        |
| 数据链路层<br />物理层         | 链路层     |                                 |



## IPv4与IPv6

<p>IPv4地址一共32位，用点分十进制表示，每一个部分是8位。子网掩码有两种表示：<br />
1) ip: 192.168.1.3; mask:255.255.255.0，ip&mask得到子网，表示ip的前24位是网络位，后8位是主机位，也就是前24位相同的ip地址是同一个子网的。<br />
2) CIDR标记法: 192.168.1.3/24，直接用位数来表示子网，意义是ip 192.168.1.3的32位地址中的前24位表示网络位，后8位表示主机位，IP前24位相同，表示是同一个子网的。</p>
IPv6地址一共128位，用十六进制表示，中间用“:”隔开，每一部分是16位。如：21DA:D3:0:2F3B:2AA:FF:FE28:9C5A。IPv6可以将每4个十六进制数字中的前导零位去除做简化表示，但每个分组必须至少保留一位数字。IPv6还可以将冒号十六进制格式中相邻的连续零位进行零压缩，用双冒号“::”表示。 如多点传送地址FF02:0:0:0:0:0:0:2压缩后，可表示为FF02::2。在一个特定的地址中，零压缩只能使用一次，否则我们就无法知道每个“::”所代表的确切零位数了。 

IPv6 前缀：前缀是地址中具有固定值的位数部分或表示网络标识的位数部分。IPv6的子网标识、路由器和地址范围前缀表示法与IPv4采用的CIDR标记法相同，其前缀可书写为：地址/前缀长度。例如21DA:D3::/48是一个路由器前缀，而21DA:D3:0:2F3B::/64是一个子网前缀。 ::1/128，即0:0:0:0:0:0:0:1，等于::1，回环地址，相当于ipv4中的localhost（127.0.0.1），ping locahost可得到此地址。

## 路由与route命令

路由（routing）是通过互联的网络把信息从源地址传输到目的地址的活动。路由发生在OSI网络参考模型中的第三层即网络层。路由引导分组转送，经过一些中间的节点后，到它们最后的目的地。路由通常根据路由表——一个存储到各个目的地的最佳路径的表——来引导分组转送。
Linux上可以通过route命令来查看管理路由表。

```shell
brighton@WINTERFELL:/tmp/home/root# route 
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.1.1     *               255.255.255.255 UH    0      0        0 eth0
192.168.50.0    *               255.255.255.0   U     0      0        0 br0
192.168.1.0     *               255.255.255.0   U     0      0        0 eth0
127.0.0.0       *               255.0.0.0       U     0      0        0 lo
default         192.168.1.1     0.0.0.0         UG    0      0        0 eth0
```

traceroute/traceroute6是路由跟踪实用程序，用于确定 IP 数据报访问目标所采取的路径。Traceroute命令用 IP 生存时间 (TTL) 字段和 ICMP 错误消息来确定从一个主机到网络上其他主机的路由。我们可以通过traceroute命令跟踪信息从出发点（source）到达目的地(destination)的路径。

```shell
brighton@WINTERFELL:/tmp/home/root# traceroute brightonzhang.com
traceroute to brightonzhang.com (104.27.189.22), 30 hops max, 38 byte packets
 1  192.168.1.1 (192.168.1.1)  0.478 ms  0.466 ms  0.368 ms
 2  100.83.0.1 (100.83.0.1)  1.484 ms  7.325 ms  2.164 ms
 3  58.19.53.37 (58.19.53.37)  1.704 ms  1.575 ms  1.257 ms
 4  58.19.109.253 (58.19.109.253)  7.449 ms  58.19.109.245 (58.19.109.245)  6.025 ms  58.19.109.249 (58.19.109.249)  1.489 ms
 5  219.158.8.161 (219.158.8.161)  19.958 ms  21.442 ms  23.646 ms
 6  219.158.8.114 (219.158.8.114)  18.134 ms  21.111 ms  23.728 ms
 7  219.158.24.138 (219.158.24.138)  26.681 ms  20.453 ms  23.665 ms
 8  219.158.98.50 (219.158.98.50)  180.221 ms  179.616 ms  183.347 ms
 9  et-0-0-26-2.cr4-lax2.ip4.gtt.net (173.241.128.45)  162.542 ms  162.748 ms  162.604 ms
10  et-0-0-31.cr4-lax1.ip4.gtt.net (89.149.187.102)  172.230 ms  168.333 ms  168.600 ms
11  ip4.gtt.net (69.174.7.78)  192.441 ms  189.319 ms  219.220 ms
12  104.27.189.22 (104.27.189.22)  229.367 ms  187.608 ms  200.758 ms
```


## 防火墙与iptables

防火墙通过订定一些有顺序的规则，管制进入到网络的数据封包。Linux防火墙主要有封包过滤型的 Netfilter 与依据服务软件程序作为分析的 TCP Wrappers 两种。

- Netfilter (封包过滤机制)，所谓的封包过滤，亦即是分析进入主机的网络封包，将封包的表头数据捉出来进行分析，以决定该联机为放行或抵挡的机制。 由于这种方式可以直接分析封包表头数据，所以包括硬件地址(MAC), 软件地址 (IP), TCP, UDP, ICMP 等封包的信息都可以进行过滤分析的功能，因此用途非常的广泛。(其实主要分析的是 OSI 七层协议的 2, 3, 4 层啦)。在 Linux 上面我们使用核心内建的 Netfilter 这个机制，而 Netfilter 提供了 iptables 这个软件来作为防火墙封包过滤的指令。
- TCP Wrappers (程序控管)，另一种抵挡封包进入的方法，为透过服务器程序的外挂 (tcpd) 来处置的。与封包过滤不同的是， 这种机制主要是分析谁对某程序进行存取，然后透过规则去分析该服务器程序谁能够联机、谁不能联机。 由于主要是透过分析服务器程序来控管，因此与启动的端口无关，只与程序的名称有关。 举例来说，我们知道 FTP 可以启动在非正规的 port 21 进行监听，当你透过 Linux 内建的 TCP wrappers 限制 FTP 时， 那么你只要知道 FTP 的软件名称 (vsftpd) ，然后对他作限制，则不管 FTP 启动在哪个埠口，都会被该规则管理的。

### iptables

iptables实现防火墙功能的原理是：在数据包经过内核的过程中有五处关键地方，分别是PREROUTING、INPUT、OUTPUT、FORWARD、POSTROUTING，iptables可以在这5处地方写规则，对经过的数据包进行处理，规则一般的定义为“如果数据包头符合这样的条件，就这样处理数据包”。 

**规则表** 
* filter表：filter表用来对数据包进行过滤，根据具体的规则要就决定如何处理一个数据包。对应内核模块：iptable_fileter。共包含三个链。
* nat表：nat(Network Address Translation,网络地址转换)表主要用于修改数据包 ip地址，端口号等信息。对应的内核模块为iptable_nat，共包含三个链。
* mangle表：mangle表用来修改数据包的TOS(Type Of Service,服务类型)，TTL（Time To Live，生存周期）值，或者为数据包设置Mark标记，以实现流量整形，策略路由等高级应用。对应的内核模块iptable_mangle，共包含五个链。
* raw表：raw表示自1.2.9以后版本的iptables新增的表，主要来决定是否对数据包进行状态跟踪。对应的内核模块为iptable_raw,共包含两个链。

**规则链** 
- INPUT链：当收到访问防火墙本机地址的数据包(入站)时，应用此链中的规则。
- OUTPUT链：当防火墙本机向外发送数据包(出站)时，应用此链中的规则。
- FORWARD链:当接收到需要通过防火墙中转发送给其他地址的数据包(转发)是，应用测链中的规则。
- PREROUTING链：在对数据包做路由选择之前，应用测链中的规则。
- POSTROUTING链：在对数据包做路由选择之后，应用此链中的规则。

**数据包过滤工作流程** 

```
-> PREROUTING -> Routing Decision -> FORWARD -> POSTROUTING ->
                         |                           ^
                         v                           |
                       INPUT ->------------------->OUTPUT
```

规则表应用优先级：raw→mangle→nat→filter
各条规则的应用顺序：链内部的过滤遵循“匹配即停止”的原则，如果对比完整个链也没有找到和数据包匹配的规则，则会按照链的默认策略进行处理。
-  入站数据流向：数据包到达防火墙后首先被PREROUTING链处理(是否修改数据包地址等)，然后进行路由选择（判断数据包发往何处），如果数据包的目标地址是防火墙本机（如：Internet用户访问网关的Web服务端口），那么内核将其传递给INPUT链进行处理(决定是否允许通过等)。
- 转发数据流向：来自外界的数据包到达防火墙后首先被PREROUTTING链处理，然后再进行路由选择；如果数据包的目标地址是其他的外部地址，则内核将其传递给FORWARD链进行处理(允许转发，拦截，丢弃)，最后交给POSTROUTING链(是否修改数据包的地址等)进行处理。
- 出站数据流向：防火墙本机向外部地址发送的数据包(如在防火墙主机中测试公网DNS服务时)，首先被OUTPUT链处理，然后进行路由选择，再交给POSTROUTING链(是否修改数据包的地址等)进行处理。

基本语法：

```
iptables [-t 表] [操作命令] [链] [规则匹配器] [-j 目标动作]
iptables [-t filter] [-AI INPUT,OUTPUT,FORWARD] [-io interface] [-p tcp,udp.icmp,all] [-s ip/nerwork] [–sport ports] [-d ip/network] [–dport ports] [-j ACCEPT DROP REJECT REDIRECT MASQUERADE LOG DNAT SNAT MIRROR QUEUE RETURN MARK]
常用操作命令： 
-A 在指定链尾部添加规则 
-D 删除匹配的规则 
-R 替换匹配的规则 
-I 在指定位置插入规则
-L/S 列出指定链或所有链的规则 
-F 删除指定链或所有链的规则 
-N 创建用户自定义链
-X 删除指定的用户自定义链 
-P 为指定链设置默认规则策略，对自定义链不起作用
-Z 将指定链或所有链的计数器清零 
-E 更改自定义链

常见规则匹配器说明：
-p tcp|udp|icmp|all 匹配协议，all会匹配所有协议 
-s addr[/mask] 匹配源地址 
-d addr[/mask] 匹配目标地址 
–sport port1[:port2] 匹配源端口(可指定连续的端口） 
–dport port1[:port2] 匹配目的端口(可指定连续的端口） 
-o interface 匹配出口网卡，只适用FORWARD、POSTROUTING、OUTPUT。
-i interface 匹配入口网卡，只使用PREROUTING、INPUT、FORWARD。 

目标动作说明：
ACCEPT 允许数据包通过 
DROP 丢弃数据包 
REJECT 丢弃数据包，并且将拒绝信息发送给发送方
```

### ipset

ipset是iptables的扩展,它允许创建匹配整个地址集合的规则。普通的iptables链只能单IP匹配, 进行规则匹配时，是从规则列表中从头到尾一条一条进行匹配，这像是在链表中搜索指定节点费力。ipset 提供了把这个 O(n) 的操作变成 O(1) 的方法：就是把要处理的 IP 放进一个集合，对这个集合设置一条 iptables 规则。像 iptable 一样，IP sets 是 Linux 内核提供，ipset 这个命令是对它进行操作的一个工具。
另外ipset的一个优势是集合可以动态的修改，即使ipset的iptables规则目前已经启动，新加的入ipset的ip也生效。

ipset命令简介：

```
ipset create blacklist hash:ip
# 创建名为blacklist的集合，以 hash 方式存储，存储内容是 IP 地址。

iptables -I INPUT -m set --match-set blacklist src -j DROP
# 如果源地址(src)属于blacklist这个集合，就进行 DROP 操作。这条命令中，blacklist是作为黑名单的，如果要把某个集合作为白名单，添加一个 ‘!’ 符号就可以。
iptables -I INPUT -m set ! --match-set whitelist src -j DROP

ipset add blacklist 192.168.50.131
# 将192.168.50.131加入blacklist集合
```
## DNS
DNS （Domain Name System ）的作用非常简单，就是根据域名查出IP地址。

域名与IP之间的对应关系，称为”记录”（record）。根据使用场景，”记录”可以分成不同的类型（type）。常见的DNS记录类型如下。
- A：地址记录（Address），返回域名指向的IPv4地址。
- AAAA: IPv6地址记录（IPv6 Address），返回域名指向的IPv6地址。
- NS：域名服务器记录（Name Server），返回保存下一级域名信息的服务器地址。该记录只能设置为域名，不能设置为IP地址。
- MX：邮件记录（Mail eXchange），返回接收电子邮件的服务器地址。
- CNAME：规范名称记录（Canonical Name），返回另一个域名，即当前查询的域名是另一个域名的跳转。
- PTR：逆向查询记录（Pointer Record），只用于从IP地址查询域名。

域名的层级结构为：主机名.次级域名.顶级域名.根域名。
根域名`.root`对于所有域名都是一样的，所以平时是省略的。根域名的下一级，叫做"顶级域名"（top-level domain，缩写为TLD），比如`.com`、`.net`；再下一级叫做"次级域名"（second-level domain，缩写为SLD），比如`www.brightonzhang.com`里面的`.brightonzhang`，这一级域名是用户可以注册的；再下一级是主机名（host），比如`www.brightonzhang.com`里面的`www`，又称为"三级域名"，这是用户在自己的域里面为服务器分配的名称，是用户可以任意分配的。

DNS服务器根据域名的层级，进行分级查询。
需要明确的是，每一级域名都有自己的NS记录，NS记录指向该级域名的域名服务器。这些服务器知道下一级域名的各种记录。
所谓"分级查询"，就是从根域名开始，依次查询每一级域名的NS记录，直到查到最终的IP地址，过程大致如下:
1. 从"根域名服务器"查到"顶级域名服务器"的NS记录和A记录（IP地址）
2. 从"顶级域名服务器"查到"次级域名服务器"的NS记录和A记录（IP地址）
3. 从"次级域名服务器"查出"主机名"的IP地址

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Example_of_an_iterative_DNS_resolver.svg/1920px-Example_of_an_iterative_DNS_resolver.svg.png" />

dig命令可以显示整个DNS查询过程。

```shell
$ dig brightonzhang.com 
# 第一段是查询参数和统计
; <<>> DiG 9.10.6 <<>> brightonzhang.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48238
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 2, ADDITIONAL: 5
# 第二段是查询内容,查询域名brightonzhang.com的A记录
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;brightonzhang.com.		IN	A
# 第三段是DNS服务器的答复,brightonzhang.com有2个A记录，即2个IP地址。300是TTL值（Time to live 的缩写），表示缓存时间，即300秒之内不用重新查询
;; ANSWER SECTION:
brightonzhang.com.	300	IN	A	104.27.189.22
brightonzhang.com.	300	IN	A	104.27.188.22
# 第四段显示brightonzhang.com的NS记录，即哪些服务器负责管理brightonzhang.com的DNS记录
;; AUTHORITY SECTION:
brightonzhang.com.	172405	IN	NS	jobs.ns.cloudflare.com.
brightonzhang.com.	172405	IN	NS	edna.ns.cloudflare.com.
# 第五段是上面2个域名服务器的IP地址，这是随着前一段一起返回的
;; ADDITIONAL SECTION:
edna.ns.cloudflare.com.	58320	IN	A	173.245.58.109
edna.ns.cloudflare.com.	58320	IN	AAAA	2400:cb00:2049:1::adf5:3a6d
jobs.ns.cloudflare.com.	5953	IN	A	173.245.59.183
jobs.ns.cloudflare.com.	5953	IN	AAAA	2400:cb00:2049:1::adf5:3bb7
# 第六段是DNS服务器的一些传输信息
;; Query time: 104 msec
;; SERVER: 2408:824e:d18:2f90:2e4d:54ff:fe4a:8620#53(2408:824e:d18:2f90:2e4d:54ff:fe4a:8620)
;; WHEN: Sun Jan 20 18:36:27 CST 2019
;; MSG SIZE  rcvd: 218
```

### dnsmasq

Dnsmasq是一个小巧方便的用于配置 DNS 和 DHCP 的工具，适用于小型网络，它提供了DNS功能和可选择的DHCP功能。

Dnsmasq 的 DNS 服务工作原理是，当接收到一个 DNS 请求是， Dnsmasq 首先会查找 /etc/hosts 文件，如果没有查找到，会查询本地 DNS 缓存记录，如果还是未找到对应的记录，则会将请求装发到 /etc/resolv.conf 文件中定义的上游 DNS 服务器中，从而实现对域名的解析。
默认情况下，Dnsmasq 会从 /etc/dnsmasq.conf 读取配置项，我们也可以使用 -C 的启动参数来指定配置文件。

dnsmasq.conf 通用配置项
```
# 服务运行的网卡，如果有多个话，可在再次添加一条记录
interface=eth1
interface=wlan0
# 指定服务不在以下网卡上运行
except-interface=eth0
# 指定监听的 IP 地址，多个 IP 地址可用 `,` 分割(默认是监听所有网卡)
listen-address=192.168.8.132
# 开启日志选项，记录在 /var/log/debug 中
log-queries
  
# 指定日志文件的路径，路径必须存在，否则会导致服务启动失败
log-facility=/var/log/dnsmasq.log
 
# 异步log，缓解阻塞。
log-async=20
```
dnsmasq.conf DNS 服务配置参数
```
# 指定 DNS 服务的端口（默认53），设置为 0 表示关闭 DNS 服务，只使用 DHCP 服务
port=53

# 指定一个 hosts 文件，默认是从 /etc/hosts 中获取
addn-hosts=/etc/banner_add_hosts

# 表示不使用 /etc/hosts 配置文件来解析域名
no-hosts

# 指定上游 DNS 服务列表的配置文件，默认是从  /etc/resolv.conf 中获取
resolv-file=/etc/dnsmasq.d/upstream_dns.conf

# 表示严格按照上游 DNS 服务列表一个一个查询，否则将请求发送到所有 DNS 服务器，使用响应最快的服务器的结果
strict-order

# 不使用上游 DNS 服务器的配置文件 /etc/resolv.conf 或者 resolv-file 选项
no-resolv

# 不允许 Dnsmasq 通过轮询 /etc/resolv.conf 或者其他文件来动态更新上游 DNS 服务列表
no-poll

# 表示对所有 server 发起查询请求，选择响应最快的服务器的结果
all-servers

# 指定 dnsmasq 默认查询的上游服务器
server=8.8.8.8
server=114.114.114.114

# 指定 .cn 的域名全部通过 114.114.114.114 这台国内DNS服务器来解析
server=/cn/114.114.114.114

# 给 *.apple.com 使用专用的 DNS
server=/.apple.com/223.6.6.6

# 将 .cn 的域名查询结果放入名为CNDOMAINIPSET的ipset
ipset=/cn/CNDOMAINIPSET

# 增加一个域名，强制解析到所指定的地址上，dns 欺骗
address=/taobao.com/127.0.0.1

# 设置DNS缓存大小(单位：DNS解析条数)
cache-size=500
```
/etc/resolv.conf 文件样例
```
nameserver 114.114.114.114
nameserver 8.8.8.8
```
/etc/hosts 文件样例
```
127.0.0.1         localhost 
2001:4860:4860::8888 google-public-dns-a.google.com
2001:4860:4860::8844 google-public-dns-b.google.com
```

## 代理

代理（Proxy），或网络代理，是一种特殊的网络服务，允许一个网络终端（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。

### 正向/反向代理

正向代理是一个位于客户端和目标服务器之间的代理服务器(中间服务器)。为了从原始服务器取得内容，客户端向代理服务器发送一个请求，并且指定目标服务器，之后代理向目标服务器转交并且将获得的内容返回给客户端。正向代理的情况下客户端需要主动设置代理服务器ip或者域名进行访问，由设置的服务器ip或者域名去获取访问内容并返回。一般情况下，代理技术默认说的是正向代理技术。
正向代理的用途：
1. 访问原来无法访问的资源
2. 缓存，加速访问资源
3. 对客户端访问授权，上网进行认证
4. 代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

反向代理服务器架设在服务器端，与正向代理正好相反。对于客户端来说，反向代理就好像目标服务器。客户端向反向代理发送请求，接着反向代理判断请求走向何处，并将请求转交给客户端，使得这些内容就好似他自己一样，一次客户端并不会感知到反向代理后面的服务，也因此不需要客户端做任何设置，只需要把反向代理服务器当成真正的服务器就好了。
反向代理的常用用途：
1. 保护和隐藏原始资源服务器
2. 加密和SSL加速
3. 负载均衡
4. 缓存静态内容
5. 压缩
6. 减速上传
7. 安全
8. 外网发布

### 透明代理

Transparent proxy，透明代理的意思是客户端根本不需要知道有代理服务器的存在，它在网络层拦截普通通信。透明代理一般架设在网关或路由器中。
Use of Transparent Proxies：
1. Proxy caches create copies of the data stored on a server and serve the cached content to users. This reduces the strain on the web service by having the proxy provide the content instead of the service itself.
2. Filtering proxies prevent access to certain websites or web services. These are commonly implemented by organizations to prevent users from accessing resources that are unrelated or disruptive to the organization.
3. Gateway proxies modify or block network traffic based on certain rules. Locations that offer public Wi-Fi often implement gateways that require users to register or accept an agreement before they can use the service.

# 实践

本章描述基于shadowsocks的网络加速实践。

[shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev)，是一个基于 libev 库开发的 shadowsocks 代理套件，包含 
- ss-server，shadowsocks 服务端程序。
- ss-local，shadowsocks 客户端程序。
- ss-redir，透明代理工具。
- ss-tunnel，本地端口转发工具。

## 服务端配置

服务端在Ubuntu 18.04使用docker部署ss-server。先按Docker官方文档安装[Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)和[Docker Compose](https://docs.docker.com/compose/install/)，然后获取[Shadowsocks-libev Docker Image](https://github.com/shadowsocks/shadowsocks-libev/blob/master/docker/alpine/README.md)并配置启动。

这里有几点说明一下：
1. 将用户加入docker组
The Docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is owned by the user `root` and other users can only access it using `sudo`. The Docker daemon always runs as the `root` user. If you don’t want to preface the `docker` command with `sudo`, create a Unix group called `docker` and add users to it. When the Docker daemon starts, it creates a Unix socket accessible by members of the `docker` group.
```shell
$ sudo usermod -aG docker $USER
```

2. 容器的端口映射
`docker run`通过`-p` 指定要映射的端口，支持的格式为 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`。所以如下命令中
```shell
$ docker run -e PASSWORD=<password> -p<server-port>:8388 -p<server-port>:8388/udp -d shadowsocks/shadowsocks-libev
```
server-port即是下文shadowsocks 客户端程序需要使用的端口号，而后面的8388是容器的端口——这个是在[Dockerfile](https://raw.githubusercontent.com/shadowsocks/shadowsocks-libev/master/docker/alpine/)通过SERVER_PORT指定的。

3. TCP FAST OPEN
可以通过如下命令临时打开服务器TCP Fast Open：`echo 3 > /proc/sys/net/ipv4/tcp_fastopen`
也可以通过编辑 `/etc/sysctl.conf` 在其末尾添加：
```
   net.ipv4.tcp_fastopen = 3
```
然后执行 `sysctl --system` 使之生效。
注意：IPv4 support for TFO was merged into the Linux kernel mainline in kernel versions 3.6 (support for clients) and 3.7 (support for servers), and was turned on by default in kernel version 3.13. TFO support for IPv6 servers was merged in kernel version 3.16. 

4. enable bbr

```shell
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

执行 `sysctl --system` 使之生效，可以使用`sysctl net.ipv4.tcp_congestion_control`确认。

下面通过ss-local来验证服务端是否正常。
ss-local 是运行在本地的socks5代理服务器，根据 OSI 模型，socks5 是会话层协议，支持 TCP 和 UDP 的代理，默认监听 127.0.0.1:1080。如果需要利用该socks5代理上外网，必须在命令中指定对应的代理。

MacOS可以使用Homebrew安装 `brew install shadowsocks-libev`，其中包含了ss-local。ss-local可以直接使用各种参数启动，也可以使用配置文件。配置文件示例如下（与ss-server对应，一目了然）：
```json
{
    "server":"2001:*:9ee2",
    "server_port":8388,
    "local_port":1080,
    "password":"barfoo!",
    "timeout":300,
    "method":"aes-256-gcm"
}
```
启动`ss-local -c /usr/local/etc/shadowsocks-libev.json`
然后可以通过指定socks5代理来使用ss-local <-> ss-server，验证如下：
```shell
SWAN:~ Brighton$ curl ipecho.net/plain; echo
183.*.*.78
SWAN:~ Brighton$ curl -x socks5h://127.0.0.1:1080 ipecho.net/plain; echo
144.*.*.188
```
Chrome浏览器可以使用[SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)配置socks5代理。

至此，确认服务端工作正常。

## 路由器配置

下文所述硬件基于华硕RT-AC68U，通过ss-redir实现分流加速。

### ss-redir功能

首先，路由器刷入[梅林固件（Asuswrt-merlin）](https://asuswrt.lostrealm.ca/download)，安装[Entware](https://github.com/RMerl/asuswrt-merlin/wiki/Entware)，并通过安装vi/python等验证。

然后安装shadowsocks-libev，可以通过`opkg list shadowsocks-libev*`搜索可用包，然后根据需要安装:
```shell
opkg install shadowsocks-libev-ss-redir
opkg install shadowsocks-libev-ss-tunnel
```

接下来验证ss-redir。

ss-redir默认监听1080端口，将该端口的原始数据包按照配置加工，发送给ss-server。返程也是类似的过程。根据上文防火墙章节描述，我们可以通过linux内核的netfilter框架对进入系统的数据包进行筛选然后端口转发，从而把需要传递到ss-server的数据先转发到1080端口。

ss-redir与ss-local配置类似，配置文件示例
```json
{
    "server":"2001:*:9ee2",
    "server_port":8388,
    "local_address": "0.0.0.0",
    "local_port":1080,
    "password":"barfoo!",
    "timeout":300,
    "method":"aes-256-gcm",
    "mode": "tcp_and_udp"
}
```
- `"server"`： 必填，填入服务器 IP 地址或域名。对应命令行 `-s` 参数。
- `server_port`： 必填，填入 shadowsocks 服务器所监听的端口。对应命令行 `-p` 参数。
- `"local_address"`： 选填，默认 `"127.0.0.1"`，由于我们需要在路由器上为网络中的各设备提供透明代理，此处应填入 `"0.0.0.0"`。对应命令行 `-b` 参数。
  - 要想使局域网内机器能够访问到部署在路由器上的 shadowsocks 服务，需要将该地址指定为路由器的IP地址；
  - 要想使路由器自身的流量能够经过 shadowsocks 服务，需要将该地址指定为 `127.0.0.1`；
  - 若想使路由器自身和局域网内的机器都能够使用到 shadowsocks 服务，则需将该地址指定为 `0.0.0.0`。
- `local_port`： 必填，填入 shadowsocks 客户端要监听的端口，该端口号还会在后文的 iptables 规则配置中用到。对应命令行 `-l` 参数。
- `"password"`： 必填，填入 shadowsocks 服务端所设置的密码。对应命令行 `-k` 参数。
- `"method"`： 选填，默认 `"rc4-md5"`。应填入 shadowsocks 服务端所设置的加密方法。对应命令行 `-m` 参数。
- `"mode"`： 选填，默认 `"tcp_only"`。如服务端及客户端环境支持 UDP，可填入 `"tcp_and_udp"` 以同时启用 TCP 和 UDP。对应命令行默认(`"tcp_only"`)以及 `-u` (`"tcp_and_udp"`) 和 `-U` (`"udp_only"`) 参数。

在路由器上启动ss-redir。
```shell
brighton@WINTERFELL:/tmp/home/root# ss-redir -c /opt/etc/shadowsocks.json -v
 2019-01-24 02:45:26 INFO: initializing ciphers... aes-256-gcm
 2019-01-24 02:45:26 INFO: listening at 0.0.0.0:1080
 2019-01-24 02:45:26 INFO: UDP relay enabled
 2019-01-24 02:45:26 INFO: running from root user
```

我有一台无法直接访问的服务器，IP为95.\*.\*.115，直接访问如下：
```shell
SWAN:~ Brighton$ curl -v 95.*.*.115
* Rebuilt URL to: 95.*.*.115/
*   Trying 95.*.*.115...
* TCP_NODELAY set
* Connection failed
* connect to 95.*.*.115 port 80 failed: Connection refused
* Failed to connect to 95.*.*.115 port 80: Connection refused
* Closing connection 0
curl: (7) Failed to connect to 95.*.*.115 port 80: Connection refused
```

在路由器上添加针对IP 95.\*.\*.115的端口转发：
```shell
iptables -t nat -A PREROUTING -d 95.*.*.115 -p tcp -j REDIRECT --to-port 1080
iptables -t nat -A OUTPUT -d 95.*.*.115 -p tcp -j REDIRECT --to-port 1080
```
检查如下：
```shell
brighton@WINTERFELL:/tmp/mnt/sda1/Zygote# iptables -t nat -L
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination                
REDIRECT   tcp  --  anywhere             95.*.*.115.16clouds.com  redir ports 1080
*
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
REDIRECT   tcp  --  anywhere             95.*.*.115.16clouds.com  redir ports 1080
```

然后尝试访问95.\*.\*.115：
```shell
SWAN:~ Brighton$ curl -v 95.*.*.115
* Rebuilt URL to: 95.*.*.115/
*   Trying 95.*.*.115...
* TCP_NODELAY set
* Connected to 95.*.*.115 (95.*.*.115) port 80 (#0)
> GET / HTTP/1.1
> Host: 95.*.*.115
> User-Agent: curl/7.56.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Server: nginx/1.14.0 (Ubuntu)
< Date: Thu, 24 Jan 2019 02:45:43 GMT
< Content-Type: text/html
< Content-Length: 13
< Last-Modified: Thu, 24 Jan 2019 02:41:39 GMT
< Connection: keep-alive
< ETag: "5c4925e3-d"
< Accept-Ranges: bytes
< 
Hello world!
* Connection #0 to host 95.*.*.115 left intact
```
同时路由器上可以看到ss-redir的日志：
```shell
 2019-01-24 02:45:42 INFO: redir to 95.*.*.115:80, len=77, recv=77
```
\*115服务器上也可以看到：
```shell
brighton@lacn2:~$ sudo tail -f /var/log/nginx/access.log
*
144.*.*.188 - - [23/Jan/2019:21:45:43 -0500] "GET / HTTP/1.1" 200 13 "-" "curl/7.56.0"
```

YES! ss-redir功能验证通过。

### GFW分流

如此看来，我似乎只需要把需要使用ss-redir代理的所有IP全部加到iptables的规则里去就可以了。如前所述，ipset可以高效的实现iptables中添加大量ip的规则。还有另外一个问题就是如何获取需要代理的ip呢？目前我是希望所有GFW阻止的域名通过代理。所以基本思路是先获取GFW List，然后通过可信DNS获取IP，并将之加入iptables规则，DONE。

GFW阻止的域名列表可以参考[Github gfwlist项目](https://github.com/gfwlist/gfwlist)。由于国内大部分DNS对于GFW LIST域名都被污染了，所以需要找可信的DNS服务（如8.8.8.8）。这里就用到shadowsocks-libev提供的本地端口转发工具——ss-tunnel。

如果ss-tunnel监听本地端口 5353，转发的远程目的地为8.8.8.8:53，系统DNS为127.0.0.1#5353。DNS解析过程如：
去程：应用请求DNS解析 -> ss-tunnel 接收 ->  ss-server 接收 -> 8.8.8.8:53；
回程：8.8.8.8:53响应DNS请求 -> ss-server 接收 -> ss-tunnel 接收 -> 应用。

ss-tunnel配置与ss-redir基本相同，除了有额外的`-L <addr>:<port>`参数，用于指定本地端口转发的目的服务器地址和端口。
由于ss-tunnel与ss-redir配置相似，为方便配置，建议将两者相同共用的参数放在配置文件，差异参数使用命令行指定。因此移除先移除shadowsocks.json中的`local_port`——ss-tunnel与ss-redir需要不同的端口，然后执行：
```shell
ss-redir -c /opt/etc/shadowsocks.json -l 1080 -v
ss-tunnel -c /opt/etc/shadowsocks.json -l 5353 -L 8.8.8.8:53 -v
```

另外，需要新建一ipset，并添加到iptables规则：
```shell
ipset create GFWLIST hash:ip
iptables -t nat -A PREROUTING -p tcp -m set --match-set GFWLIST dst -j REDIRECT --to-port 1080
iptables -t nat -A OUTPUT -p tcp -m set --match-set GFWLIST dst -j REDIRECT --to-port 1080
```

然后添加dnsmasq配置，将GFW List域名DNS指向127.0.0.1#5353，并将结果IP加入GFWLIST。在路由器`/jffs/configs`目录下新建dnsmasq.conf.add，在其中按如下格式添加：
```
server=/google.com/127.0.0.1#5353
ipset=/google.com/GFWLIST
```

梅林固件dnsmasq及其他配置请参考[官方说明](https://github.com/RMerl/asuswrt-merlin/wiki/Custom-domains-with-dnsmasq)。
dnsmasq.conf.add修改完成后，重启dnsmasq：`service restart_dnsmasq`

接下来就是见证奇迹的时刻，访问 google.com，可以看到ss-tunnel和ss-redir都有相关日志，网页正常打开，通过`ipset list GFWLIST`查看也可以看到GFWLIST中有了内容。

### 部署

#### ss daemon

显然，shadowsocks应作为服务（Service）运行。ss-tunnel和ss-redir可以使用`-f <pid_file>`指定pid文件使之作为daemon进程运行。

使用Entware安装shadowsocks-libev后，会在系统中安装一服务文件`/opt/etc/init.d/S22shadowsocks`,我将其做了一些修改：
1. `cp /opt/etc/init.d/S22shadowsocks /opt/etc/init.d/S23sstunnel`，内容修改为：
   ```shell
   #!/bin/sh
   
   ENABLED=yes
   PROCS=ss-tunnel
   ARGS="-c /opt/etc/shadowsocks.json  -l 5353 -L 8.8.8.8:53 -f /opt/var/run/ss-tunnel.pid"
   PREARGS=""
   DESC=$PROCS
   PATH=/opt/sbin:/opt/bin:/opt/usr/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
   
   [ -z "$(which $PROCS)" ] && exit 0
   
   . /opt/etc/init.d/rc.func
   ```

2. `mv /opt/etc/init.d/S22shadowsocks /opt/etc/init.d/S22ssredir`，内容修改为：

   ```shell
   #!/bin/sh
   
   ENABLED=yes
   PROCS=ss-redir
   ARGS="-c /opt/etc/shadowsocks.json -l 1080 -f /opt/var/run/ss-redir.pid"
   PREARGS=""
   DESC=$PROCS
   PATH=/opt/sbin:/opt/bin:/opt/usr/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
   
   [ -z "$(which $PROCS)" ] && exit 0
   
   . /opt/etc/init.d/rc.func
   ```
> 注：<S>服务文件中`ENABLED` 行表明了是否在开机时自动启动该服务。init.d目录下的shell脚本中，S开头表示的是启动时需要启动的服务内容，K开头的表示关机时需要关闭的服务内容。而脚本的启动或结束顺序是由S或K字母后面的数字决定，数字越小的脚本越先执行。</S> 通过/jffs/scripts/services-start，/opt/etc/init.d/rc.unslung可以看到，路由器启动后，在所有系统服务启动后，会按文件名S字母后的数字大小顺序启动/opt/etc/init.d/下面的服务。

手动启动ss-tunnel和ss-redir服务：
```shell
/opt/etc/init.d/S22ssredir start
/opt/etc/init.d/S23sstunnel start
```

另外，为了路由器重启后iptables自动添加转发规则，可以创建`/jffs/scripts/nat-start`保存如下内容，并注意添加该文件可执行权限：

```shell
#!/bin/sh

logger "firewall" "Applying nat-start rules"
ipset create GFWLIST hash:ip
iptables -t nat -A PREROUTING -p tcp -m set --match-set GFWLIST dst -j REDIRECT --to-port 1080
iptables -t nat -A OUTPUT -p tcp -m set --match-set GFWLIST dst -j REDIRECT --to-port 1080
```



#### gfwlist更新

GitHub GFW List会不定期更新，但路由器上没有必要安装git获取整个仓，我选择周期性地通过GitHub Development API获取GFW List项目的提交记录，从而判断更新本地的GFW List。

自动检测GFW List更新，并将最新的List转换为dnsmasq配置文件的源码可以参考我的python实现[gfwlist2dnsmasqupdater.py](https://github.com/brightonzhang/ApplePy/blob/master/gfwlist2dnsmasqupdater.py)。

由于GFW List可能频繁更新，为了减少对[jfss分区](<https://github.com/RMerl/asuswrt-merlin/wiki/JFFS>)的写录，我将真正的dnsmasq.conf.add保存在硬盘，在jfss中只保存了对其的软连接，`ln -s /tmp/mnt/sda1/Zygote/dnsmasq.conf.add jffs/configs/dnsmasq.conf.add`。但是，这样一来，我发现路由器重启后dnsmasq.conf.add没有生效——难道是因为dnsmasq启动时，硬盘还没有挂载？？？暂时在`/jffs/scripts/services-start`最后添加了`service restart_dnsmasq`以在所有就绪后重启dnsmasq。

最后使用cron创建周期任务自动更新GFW List及相关配置。创建一shell脚本gfwlistupdater.sh用于执行GFW List更新检测任务，如下：

```shell
#!/bin/sh

#cru a gfwlistupdater "30 04 * * * /tmp/mnt/sda1/Zygote/gfwlistupdater.sh"

addWhitelist(){
    while IFS='' read -r line || [[ -n "$line" ]]; do
        [[ ${line:0:1} == \# ]] &&  continue
        echo "ip: $line"
        ipset add GFWLIST $line
    done < "$1"
}

# if there is no dnsmasq.conf.add, create a fake one 
if [ ! -e /tmp/mnt/sda1/Zygote/dnsmasq.conf.add ]
then
    touch /tmp/mnt/sda1/Zygote/dnsmasq.conf.add
fi

python3 /tmp/mnt/sda1/Zygote/gfwlist2dnsmasqupdater.py 

# if dnsmasq.conf.add.bak exists, the dnsmasq.conf.add has been updated, so restart dnsmasq
if [ -e /tmp/mnt/sda1/Zygote/dnsmasq.conf.add.bak ]
then
    service restart_dnsmasq
    ipset flush GFWLIST
    addWhitelist whitelistip.txt
    rm /tmp/mnt/sda1/Zygote/dnsmasq.conf.add.bak
fi
```

然后在`/jffs/scripts/services-start`末尾添加一cron任务：每天凌晨四点半执行gfwlistupdater.sh脚本。

```shell
cru a gfwlistupdater "30 04 * * * /tmp/mnt/sda1/Zygote/gfwlistupdater.sh"
```

### TODO

1. 国内域名访问加速

# 参考资料

[鸟哥的 Linux 私房菜](http://linux.vbird.org) 
[DNS 原理入门](http://www.ruanyifeng.com/blog/2016/06/dns.html)
[那些从墙上学会的知识](https://icymind.com/learn-from-gfw/)
[使用 EdgeMax 路由器自动翻墙](http://allenn.cn/articles/2016-10/2016-10-20-edgemax-ss-tutorial/)
[ss/ssr/v2ray/socks5 透明代理](https://www.zfl9.com/ss-redir.html)
[在路由器上部署 shadowsocks](https://zzz.buzz/zh/gfw/2016/02/16/deploy-shadowsocks-on-routers/)
[Shadowsocks + GfwList 实现 OpenWRT / LEDE 路由器自动翻墙](https://cokebar.info/archives/962)
https://github.com/goodbest/Merlin-SS-config
[记录一下Telegram的IP地址](https://blog.phpgao.com/telegram_ip.html)

