title: Homebrew安装失败
date: 2015-11-30 00:37:21
updated: 2015-12-13 
categories:
- 巧技
tags: 
---

按照 http://brew.sh/index.html 安装Homebrew 执行如下命令：
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
<!--more--> 

然后失败：
fatal: unable to access 'https://github.com/Homebrew/homebrew/': SSLRead() return error -9806
Failed during: git fetch origin master:refs/remotes/origin/master -n --depth=1

google一圈，这个问题似乎和我的一致
http://stackoverflow.com/questions/26461966/osx-10-10-curl-post-to-https-url-gives-sslread-error
需要安装使用openssl的curl

遂先安装openssl
获取openssl代码，https://wiki.openssl.org/index.php/Use_of_Git
git clone https://github.com/openssl/openssl.git

编译安装，https://wiki.openssl.org/index.php/Compilation_and_Installation#Mac
./Configure darwin64-x86_64-cc enable-ec_nistp_64_gcc_128  no-ssl3 no-comp 
make
sudo make install

获取curl代码,http://curl.haxx.se/download/curl-7.45.0.tar.bz2
安装，http://curl.haxx.se/docs/install.html
./configure --with-ssl=/usr/local/ssl
make
编译报错：
vtls/openssl.c:2349:13: error: incomplete definition of type 'struct x509_st'
    cinf = x->cert_info;
           ~^
/usr/local/ssl/include/openssl/ossl_typ.h:154:16: note: forward declaration of 'struct x509_st'
typedef struct x509_st X509;
               ^
...

再google，发现这是个已知问题，https://github.com/bagder/curl/issues/491
subscribe那个issues。

作此文纪录，先睡觉了。  

12/13/2015 更新
收到issue 491＃的邮件通知说编译问题已经解决了。
https://github.com/bagder/curl/commit/7f683b0ea87ed158eb4bd22cdd1f26eb901a97d0
该commit解决了curl与openssl 9446daac5b7be3210e9c5d80c3d95309d946ee38 版本编译不过的问题。

于是我更新了最新的curl代码
git clone https://github.com/bagder/curl.git
./buildconf
./configure --with-ssl=/usr/local/ssl/
make
make install

当再执行curl时
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
curl: (35) error:1416F086:SSL routines:tls_process_server_certificate:certificate verify failed

这个google也没找到原因了。 我想了下，可能是最新的openssl的问题。于是去openssl下载了一个release版本，https://www.openssl.org/source/openssl-1.0.1q.tar.gz，故意选择了1.1.0之前的版本。解压编译安装。发现该版本如果配置为“no-ssl3 no-comp”也会有编译问题，索性直接“./Configure darwin64-x86_64-cc enable-ec_nistp_64_gcc_128”，然后编译安装一路通畅。

然后重新编译安装了7.45.0版本的curl，安装成功。尝试运行：
curl https://google.com
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: http://curl.haxx.se/docs/sslcerts.html

curl performs SSL certificate verification by default, using a "bundle"
 of Certificate Authority (CA) public keys (CA certs). If the default
 bundle file isn't adequate, you can specify an alternate file
 using the --cacert option.
If this HTTPS server uses a certificate signed by a CA represented in
 the bundle, the certificate verification probably failed due to a
 problem with the certificate (it might be expired, or the name might
 not match the domain name in the URL).
If you'd like to turn off curl's verification of the certificate, use
 the -k (or --insecure) option.

这里说本地CA证书有问题，参考http://curl.haxx.se/docs/sslcerts.html，从http://curl.haxx.se/docs/caextract.html下载了CA证书，然后
export CURL_CA_BUNDLE="/usr/local/etc/pki/cacert.pem"

然后执行
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
终于
...
==> Installation successful!
==> Next steps
Run `brew help` to get started

上面的本地CA证书，可以通过--cacert来配置，如下
curl --cacert /usr/local/etc/pki/cacert.pem  https://cn.bing.com

