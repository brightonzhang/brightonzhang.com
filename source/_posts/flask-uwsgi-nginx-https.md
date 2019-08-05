---
title: Flask+uWSGI+Nginx部署HTTPS
catalog: true
date: 2019-07-14 16:03:39
subtitle:
cover: "g56bkbgcucdrk.png"
updated: 2019-07-14 16:03:39
categories:
- 巧技
tags:
- Flask
- uWSGI
- Nginx

---

近日拟做一款简易阅后即焚web app，选用Flask+uWSGI+Nginx来实现，本文记录相关配置。
<!--more--> 

Flask是一个Python编写的Web开发微框架，基于Werkzeug WSGI和Jinja2 模板引擎。 

WSGI (Web Server Gateway Interface), Web服务器网关接口，一种描述web服务器与web应用程序通信的规范、协议，其规范在PEP3333中有具体描述。
uWSGI是一个全功能的web服务器，实现了WSGI协议、uwsgi协议、http协议等。它将HTTP协议转化成语言支持的网络协议。比如把HTTP协议转化成WSGI协议，让Python可以直接使用。
uwsgi是uWSGI服务器的独占通信协议，用于与web服务器通信。

Nginx ("engine x") 是一个开源的，支持高性能、高并发的 Web 服务和代理服务软件。常用来做反向代理，动/静态资源分离和负载均衡。 

# Flask Run

Flask应用已经构建完成，可直接下载使用：

```shell
git clone https://github.com/brightonzhang/mayfly.git
```

为隔离Python环境，使用python3-venv创建虚拟环境并激活（以后可用`deactivate`退出虚拟环境）：

```shell
cd mayfly/
python3 -m venv venv
source venv/bin/activate
```

安装需要的包：

```shell
pip install -r deployment/requirements.txt 
```

这里的requirements.txt文件来自`pip freeze > requirements.txt`。

自此，Flask环境已经配置完成，可以测试：

```shell
flask run
```

# uWSGI Config

uWSGI配置文件`deployment/uwsgi/mayfly.ini`如下：

```ini
[uwsgi]
module = %n:app

master = true
processes = 5

socket = /tmp/uwsgi.%n.sock
chmod-socket = 660
vacuum = true

die-on-term = true
```

Inside, we will start off with the `[uwsgi]` header so that uWSGI knows to apply the settings. 

The option `module` has the same effect as the `wsgi-file` and `callable`. It specify two things: the module itself, by referring to the `mayfly.py` file minus the extension, and the callable within the file, `app`. `%n` is magic word, means the file name of the configure file, without the extension.

And uWSGI will start up in master mode and spawn five worker processes to serve actual requests.

We're going to be using Nginx to handle actual client connections, which will then pass requests to uWSGI. Since these components are operating on the same computer, a Unix socket is preferable because it is faster and more secure. We call the socket `/tmp/uwsgi.%n.sock` and place it in this directory. We also change the permissions on the socket. We'll be giving the Nginx group ownership of the uWSGI process later on, so we need to make sure the group owner of the socket can read information from it and write to it. We will also clean up the socket when the process stops by adding the `vacuum` option.

The `die-on-term` option can help ensure that the init system and uWSGI have the same assumptions about what each process signal means. Setting this aligns the two system components, implementing the expected behavior.

手动启动测试：

```shell
uwsgi deployment/uwsgi/mayfly.ini 
```

# Systemd Unit File

Creating a systemd unit file will allow Ubuntu's init system to automatically start uWSGI and serve the Flask application whenever the server boots.

Create a unit file ending in `.service` within the `/etc/systemd/system` directory to begin:

```
sudo ln -s /home/brighton/mayfly/deployment/systemd/mayfly.service /etc/systemd/system/
```

```ini
[Unit]
Description=uWSGI instance to serve mayfly
After=network.target

[Service]
User=brighton
Group=www-data
WorkingDirectory=/home/brighton/mayfly
Environment="PATH=/home/brighton/mayfly/venv/bin"
ExecStart=/home/brighton/mayfly/venv/bin/uwsgi --ini deployment/uwsgi/mayfly.ini 

[Install]
WantedBy=multi-user.target
```

Inside, we'll start with the `[Unit]` section, which is used to specify metadata and dependencies. Let's put a description of our service here and tell the init system to only start this after the networking target has been reached.

Next, let's open up the `[Service]` section. This will specify the user and group that we want the process to run under. Let's give our regular user account ownership of the process since it owns all of the relevant files. Let's also give group ownership to the `www-data` group so that Nginx can communicate easily with the uWSGI processes. 

Next, let's map out the working directory and set the `PATH` environmental variable so that the init system knows that the executables for the process are located within our virtual environment. Let's also specify the command to start the service. Systemd requires that we give the full path to the uWSGI executable, which is installed within our virtual environment. 

Finally, let's add an `[Install]` section. This will tell systemd what to link this service to if we enable it to start at boot. We want this service to start when the regular multi-user system is up and running.

We can now control the uWSGI service with `systemctl`:

```shell
sudo systemctl start mayfly
sudo systemctl enable mayfly
sudo systemctl status mayfly
```

# Nginx Config

We should configure Nginx to pass web requests to that socket using the `uwsgi` protocol. Begin by creating a new server block configuration file in Nginx's `sites-enabled` directory. 

```shell
ln -s /home/brighton/mayfly/deployment/nginx/mayfly.conf /etc/nginx/sites-enabled/
```

```nginx
server {
    listen 80;
    server_name mayfly.brightonzhang.com;

    location /static {
        alias /home/brighton/mayfly/app/static; # your project's static files - amend as required
    }
    
    location / {
        include uwsgi_params;
        uwsgi_pass unix:/tmp/uwsgi.mayfly.sock;
    }
}
```

We can test for syntax errors and restart the Nginx process:

```shell
sudo nginx -t
sudo systemctl restart nginx
```

If we encounter any errors, trying checking the following:

- `sudo less /var/log/nginx/error.log`: checks the Nginx error logs.
- `sudo less /var/log/nginx/access.log`: checks the Nginx access logs.
- `sudo journalctl -u nginx`: checks the Nginx process logs.
- `sudo journalctl -u myproject`: checks your Flask app's uWSGI logs.

在Linux上，Nginx默认配置文件在`/etc/nginx/`下。在macOS上，若采用brew安装，Nginx默认配置文件在`/usr/local/etc/nginx/`下，目录结构也有差异。可以在`nginx.conf`第一行指定nginx进程运行用户：

```nginx
user Brighton staff;
```

可以使用`brew`控制Nginx：

```shell
sudo brew services start nginx
```

当然也可以使用`nginx`命令：

```shell
sudo nginx
sudo nginx -t
sudo nginx -s stop
sudo nginx -s reload
```

# Certbot

使用Certbot为域名添加[Let's Encrypt](https://letsencrypt.org/)证书以支持HTTPS。安装Certbot's Nginx包并执行：

```shell
sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-nginx
sudo certbot --nginx -d mayfly.brightonzhang.com
```

Certbot会与Let's Encrypt通信，审核域名证书请求。如果成功，会自动更新Nginx配置并重启服务。完成之后，会发现`deployment/nginx/mayfly.conf`多了些`# managed by Certbot`的条目。

# 参考资料

[The Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
[The Flask Mega-Tutorial中文翻译](https://github.com/luhuisicnu/The-Flask-Mega-Tutorial-zh)
[Flask之旅 - explore flask中文翻译](https://spacewander.github.io/explore-flask-zh/)
[How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uswgi-and-nginx-on-ubuntu-18-04)