# Nest Serve

## [旧版本](https://github.com/dyb881/nest-serve/tree/multirepo)使用 multirepo 模式开发

在 Nestjs 基于 monorepo 模式，以微服务形式开发的一个带权限控制的后台服务

## 使用方法

创建以下数据库，然后在 /config 内修改 .demo.env 文件名为 .env，自己根据情况修改配置

```sh
yarn build:all // 打包所有基础服务
yarn pm2:all // 使用pm2运行所有服务（请自行 npm i -g pm2）
yarn start admin // 运行管理后台网关服务
```

## 默认数据库

- nest_serve_account 账号管理
- nest_serve_files 文件管理
- nest_serve_infos 信息管理

## 基础服务

- account 账号管理模块
  - account 所有账号
  - admin 管理员账号
  - user 用户账号
  - role-admin 管理员角色
- files 文件管理模块
  - files 文件列表
  - config 文件配置
  - upload 文件上传，需要上传功能的应用直接 在 app.module imports 对应模块才可使用，默认带鉴权装饰器，单独使用会报错
    - server 上传到服务器
    - oss 上传到 OSS
    - oss sts 临时授权上传
- infos 信息管理模块
  - category 信息分类模块
  - information 信息列表

## 网关服务

- admin 管理后台服务
  - account 账号管理
  - files 文件管理
  - infos 信息管理
  - auth 鉴权登录
  - jwt.guard 角色权限守卫
- webapp 网络应用服务（未开发）

## 附加功能

- 日志文件生成
- 设置与安全相关的 HTTP 头
- swagger 接口文档
- redis 缓存

## 如果你觉得这个项目帮助到了你，你可以帮作者买表示鼓励

![二维码](http://files.bittyshow.top/qrcode.png)
