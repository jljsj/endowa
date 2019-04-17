# endowa

egg + mysql + ant design pro + umi + ant design 的一个企业型网站

## 提供
- [x] 基本信息
- [x] 新闻中心
- [x] 产品中心
- [x] 关于我们
- [x] 招聘信息
- [x] 团队成员
- [x] 联系我们
- [x] 后台用户管理
- [ ]  
## 准备工作
安装 [mysql](https://dev.mysql.com/downloads/mysql/); 然后再将 `endowa.sql` 导入到你的 mysql 数据库, 再更改 egg 的 mysql 配置, 配置完成后就可以开发使用。
```
config.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'Jiang4321',
    // 数据库名
    database: 'endowa',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

