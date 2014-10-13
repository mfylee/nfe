
#前端模块化(AMD)开发框架

>基于CMD的编译工具请参考：https://github.com/opedfe/nfe.git (npm install nfe@0.0.3)

###v2.0.0
 - 模块化支持：`esl.js`, `require.js`
 - 支持模块化依赖自动合并，如：`require('./view?_inline');`

##安装
```sh
npm install -g nfe
nfe -v
```

##使用

```sh
nfe start server [-p 8080]
```

```sh
nfe release
```

##页面结构

####编译前
```sh
- root
- | - src
- | - | - modA
- | - | - index.html
- | - libs
- | - dep （模块化文件，不需要封装）
```

####编译后
```sh
- root
- | - template
- | - | - index.html
- | - static
- | - | - js
- | - | - css
- | - | - libs
- | - | - dep
```

>更多内容请参考FIS官网：http://fis.baidu.com/
