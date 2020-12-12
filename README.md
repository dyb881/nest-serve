# 使用 Nestjs 搭建的基础服务

[管理后台模版 DEMO](http://nest.bittyshow.top)，对应前端代码[cra-template-seasoning](https://github.com/dyb881/cra-template-seasoning)pc-admin 模版

## 基础功能

- 日志文件生成
- 开启跨域允许
- 设置与安全相关的 HTTP 头
- 统一接口请求前缀
- 统一验证管道
- 相应数据统一格式
- 报错过滤
- swagger 接口文档
- 静态资源服务

## src 目录结构

- based - 基础服务
  - 帐号管理
  - 鉴权角色
  - 文件管理
- admin - 后台管理服务
  - 信息管理
    - 菜单分类
    - 信息列表
- web - 前台服务
