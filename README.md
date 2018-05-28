This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Meme-generator

本项目为表情包生成器，部分模板来自 [sorry](https://github.com/xtyxtyx/sorry)，CSS 框架采用了 [bulma](https://github.com/jgthms/bulma)。

你可以自己构建，也可以直接使用[我提供的服务](https://meme.itswincer.com)，以下是构建步骤。

## 使用

请先确认 [Node.js](https://github.com/nodejs/node.git) 和 [Yarn](https://github.com/yarnpkg/yarn) 已安装。

### 下载

clone 本仓库：

```bash
git clone git@github.com:WincerChan/Meme-generator.git
```

### 安装依赖

进入 Meme-generator 目录：

```bash
yarn install
```

### 运行

可选择开发环境或生产环境：

```bash
# 开发环境
yarn start

# 生产环境
yarn build
```

其中开发环境用于本地调试、测试，生产环境会将源码打包生成在 build 目录。

## 模板

目前动图有 4 个模板，分别是：王境泽、为所欲为、星际还是魔兽、打工是不可能打工的。

关于添加模板见 Wiki 的[模板部分](https://github.com/WincerChan/Meme-generator/wiki/模板)

## 部署

选择生产环境构建完毕后，就只是静态文件了，可借助 Nginx、Apache、Caddy 服务器等托管。

### 远程同步

可使用 rsync 命令与远程服务器同步：

```bash
# 需要先执行 yarn build 
rsync -az -vv --delete -e 'ssh -p 22' build/* DomainName:/Path
```

### 配置文件

注意需要修改一下 Nginx 配置文件，否则是无法访问直接访问二级路由页面的：

```nginx
server {
    ...
    location / {
        try_files $uri /index.html;
    }
}
```