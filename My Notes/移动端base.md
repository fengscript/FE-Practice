首先要添加 meta

`    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`



不然移动端浏览器上不会被正确识别

`viewport-fit=cover”` 不加的话，会自动放大







```
lsb_release -a
```

whereis



# Yum

## 添加配置

/etc/yum.repos.d/nginx.repo

yum install xxx

yum remove xxx





# Nginx



```bash
先来一手
yum -y install gcc pcre-devel zlib-devel openssl openssl-devel

然后wget xxx
## https://nginx.org/download/
## 解压
tar -zxvf nginx-1.9.9.tar.gz

##进入nginx目录
cd nginx-1.9.9
## 配置
./configure --prefix=/usr/local/nginx

# make
make
make install

//启动nginx
cd /usr/local/nginx/sbin
./nginx 

//配置nginx开机自启动

vim /etc/rc.d/rc.local
```

/conf/nginx.conf

/sbin

./nginx -s reload



./nginx -t



也可以重启

ps -ef|grep nginx

kill -HUP XXX

