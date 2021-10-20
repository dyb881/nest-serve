# Nest Serve v3

使用 Nestjs 8.x 以微服务方式开发的基础管理后台服务，并搭配 React 开发的管理后台前端（可自行根据 swagger 的接口开发对应的管理后台前端）

## 旧版本

- [v2 使用 monorepo 模式开发](https://github.com/dyb881/nest-serve/tree/monorepo)
- [v1 使用 multirepo 模式开发](https://github.com/dyb881/nest-serve/tree/multirepo)

## 基础服务

- account 账号管理模块
  - admin 管理员账号
  - admin-role 管理员角色
  - user 用户账号
- infos 信息管理模块
  - category 信息分类
  - article 文章列表

## 网关服务

- admin 管理后台网管
  - account 账号管理相关接口
  - infos 信息管理相关接口
  - auth 鉴权接口

## 自定义库

### public-module 公共模块

主要是将，常用的业务功能抽象成模块

- global 用于初始化的全局模块（除了配置文件外，其他只有配置为 true 时，才会开启）
  - 配置文件初始化
  - typeorm 模块初始化
  - multer 文件模块初始化
  - 缓存模块初始化
  - jwt 鉴权模块初始化
  - 阿里云短信服务模块
  - files 文件上传模块
  - 阿里云 oss 对象储存模块
- logger 日志模块

### public-class 公共类

因为 nestjs 主要是写法都是 class，开发基类可以对开发效率和拓展性都有很大的提升，如

```ts
/**
 * 公用实体
 * 一条数据必须存在的属性
 */
export class CommonEntity {
  @ApiProperty('ID')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty('创建时间')
  @CreateDateColumn({ comment: '创建时间', transformer: dateTransformer })
  create_date: Date;

  @ApiProperty('更新时间')
  @UpdateDateColumn({ comment: '更新时间', transformer: dateTransformer })
  update_date: Date;
}

/**
 * 基础账号实体
 * 一个账号必须存在的属性
 */
export class AccountEntity extends CommonEntity {
  @ApiProperty('用户名')
  @Column('用户名', 32, { unique: true })
  username: string;

  // 省略
}
```

- controller 常用的控制器类
- dto 接口参数类型定义，以及对于 swagger 的注解
- entity 公用的数据库实体类
- service 公用的服务类，自带 CRUD，继承即可使用（待优化）

### public-decorator 公共装饰器

主要是把一些装饰器，柯里化成一些语义化的函数，如

```ts
// typeorm api
Column('simple-json', { comment: 'json 数据' }) = ColumnJson('json 数据');
```

- swagger 接口文档标注装饰器
- transformer 基于 class-transformer 的数据转化装饰器
- typeorm 基于 typeorm 注册列的装饰器
- validator 基于 class-validator 的数据验证装饰器

### public-tool 公共工具库

主要封装了全局常用工具

- data 数据处理工具函数
- bootstrap 服务启动引导程序
- service 在服务中常用的函数
- typeorm 针对数据库的数据转化工具
- http.exception.filter 异常拦截器
- transform.interceptor 响应参数转化为统一格式

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
