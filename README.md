# vue-element

> vue+element搭建后台单页框架

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 新建vue单文件组件
    前提：已经安装了vue-cli脚手架；安装代码：cnpm install -g vue-cli
    新建一个叫my-demo的项目：vue init webpack my-demo
    之后会出现询问 “项目名称..项目描述“等等问题，建议除第一个使用路由yes之后全部no
    cd my-demo
    进入到项目根目录执行cnpm install安装依赖
    执行npm run dev启动服务

# 引入ElementUI
``` bash
cnpm install element-ui --save
```
> 在main.js中插入一下代码
``` bash
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

# 引入Less
``` bash
cnpm install less --save
cnpm install less-loader --save
```
> 将/static/app.less放入/src/App.vue文件中，引用代码如下：
``` bash
<style lang="less">
    @import "../static/app.less";
</style>
```

# 引入vuex
``` bash
cnpm install vuex --save
```
> 在main.js中插入一下代码(还有一些自定义的事件等，这里不做描写，具体看main.js的注释)
``` bash
import Vuex from 'vuex'
Vue.use(Vuex);
```

# 引入vue-resource(这里没有使用到，所以未配置)
> 在main.js中插入一下代码
``` bash
import VueResource from 'vue-resource'
Vue.use(VueResource);
```

# 引入echarts
``` bash
cnpm install 引入echarts --save
```
> 在main.js中插入一下代码
``` bash
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
```

# 打包时默认根目录修改
> config/index.js文件中找到build对象下面的assetsPublicPath属性，地址改为'./'相对地址
> build/utils.js文件中找到return ExtractTextPlugin.extract对象，加上publicPath: '../../'属性

# 局域网访问本地开发环境(使本地ip和localhsot都可以访问)
> 修改package.json中scripts下的dev结尾加上参数 " --host 0.0.0.0"