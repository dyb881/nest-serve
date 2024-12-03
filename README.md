# Nest Serve v4

使用 Nestjs 10.x 开发的基础管理后台服务，极大简约了代码，降低开发成本<br/>
[Nestjs 10.x 中文开发文档](https://docs.nestjs.cn/10/firststeps)

## 旧版本

- [v3 使用 monorepo 模式开发](https://github.com/dyb881/nest-serve/tree/monorepo-v3)
- [v2 使用 monorepo 模式开发](https://github.com/dyb881/nest-serve/tree/monorepo)
- [v1 使用 multirepo 模式开发](https://github.com/dyb881/nest-serve/tree/multirepo)

## 配置

一般情况下可以直接用当前配置，但如果要区分环境的话，就需要在 config 文件夹下添加这两个文件

- development.yaml
- production.yaml

在运行时会根据环境变量 NODE_ENV=配置文件名 进行选择加载，如

```sh
NODE_ENV=production yarn start // 加载 production.yaml 覆盖配置
```

环境变量为空时，默认会尝试加载 development.yaml

## 文件目录

- common 公共模块
  - tools 工具函数、二次封装的装饰器
  - imports 默认模块
    - config 配置模块
    - logger 日志模块
    - upload 文件上传模块
  - providers 数据/异常拦截
  - controller 公共控制器
  - dto 公共数据对象
  - entity 公共数据实体
  - service 公共服务
  - initialize.ts 项目初始化流程
- account 帐号模块
  - role 帐号角色
  - admin 管理员帐号
  - user 用户帐号
  - auth 授权模块
- infos 信息模块
  - category 基础信息分类
  - article 文章管理
