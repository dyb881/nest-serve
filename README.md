# Nest Serve

## [旧版本](https://github.com/dyb881/nest-serve/tree/multirepo)使用 multirepo 模式开发

在 Nestjs 基于 monorepo 模式，以微服务形式开发的一个带权限控制的后台服务

## 使用方法

创建数据库 nest_serve（可在 /config/apps 内修改配置进行分库），然后在 /config 内修改 .demo.env 文件名为 .env，自己根据情况修改配置

```sh
yarn build:all // 打包所有基础服务
yarn pm2:all // 使用pm2运行所有服务（请自行 npm i -g pm2）
pm2 delete account // 加入要开发账号模块，先从 pm2 删除账号模块
yarn start:dev account // 使用开发模式运行账号模块
```

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

## 自定义库

- bootstrap 公用引导启动程序（接入默认库）
- data-tool 数据处理工具
- decoraror 装饰器二次封装
- dto-tool Dto（公用类和常用工具）
- entity-tool Entity（公用类和常用工具）
- http 自定义请求器模块
- logger 日志二次封装（日志文件生成）
- middleware 默认中间件（数据响应转化和错误响应过滤）
- service-tool 服务常用工具（公用类和常用工具）

## 附加功能

- Swagger 接口文档
- 日志文件生成
- redis 缓存
- oss 文件中转上传和 sts 授权上传

## 配套 UI 效果图（兼容移动端）

在[cra-template-seasoning](https://github.com/dyb881/cra-template-seasoning)中使用 pc-admin 模版

![效果图](https://files.bittyshow.top/github/nest-serve-1.png)
![效果图](https://files.bittyshow.top/github/nest-serve-2.png)
![效果图](https://files.bittyshow.top/github/nest-serve-3.png)
![效果图](https://files.bittyshow.top/github/nest-serve-4.png)
![效果图](https://files.bittyshow.top/github/nest-serve-5.png)
![效果图](https://files.bittyshow.top/github/nest-serve-6.png)
![效果图](https://files.bittyshow.top/github/nest-serve-7.png)
![效果图](https://files.bittyshow.top/github/nest-serve-8.png)
![效果图](https://files.bittyshow.top/github/nest-serve-9.png)
![效果图](https://files.bittyshow.top/github/nest-serve-10.png)
![效果图](https://files.bittyshow.top/github/nest-serve-11.png)
![效果图](https://files.bittyshow.top/github/nest-serve-12.png)
![效果图](https://files.bittyshow.top/github/nest-serve-13.png)

## 如果觉得项目还不错，请打赏一波，您的支持是我最大的动力。

![二维码](https://files.bittyshow.top/pay.png)
