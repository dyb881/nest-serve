# Nest Serve v4

[Nestjs 10.x 中文开发文档](https://docs.nestjs.cn/10/firststeps)<br/>
使用 Nestjs 10.x 开发的基础管理后台服务，极大简约了代码，降低开发成本，支持打包单js文件，无需安装依赖即可部署，并且可基于sea打包成单个可执行文件，无需安装node即可运行。<br/>


## 使用方式

### 开发与打包

```sh
npm run start:dev # 开发
```

### 打包

```sh
npm run build # 打包生产环境
npm run build:ncc # 打包单文件
```

### 部署

```sh
node ./dist/main.js # 运行服务
node ./dist.ncc/index.js # 运行单文件服务

# 建议使用 pm2 运行
pm2 start ./dist/main.js # 运行服务
pm2 start ./dist.ncc/index.js # 运行单文件服务
```

### 打包单个可执行文件

使用Node版本 >= 20以上的 sea 能力<br/>
打包成功后，可以将 dist.sea 文件夹拷贝到服务器上直接运行<br/>
命令行后的参数代表node的分发平台版本后缀

```sh
# 打包
./build.mac.sh darwin-arm64 # mac M芯片
./build.mac.sh linux-x64 # linux
./build.mac.sh win-x64 # win

# 运行
./dist.sea/run/nest-serve-darwin-arm64
./dist.sea/run/nest-serve-linux-x64
./dist.sea/run/nest-serve-win-x64.exe
```

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
    - 支付模块（待定）
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
- products 商品模块（待定）
  - 商品分类
  - 商品管理
- trade 交易模块（待定）
  - 购物车
  - 订单管理