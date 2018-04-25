// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from './axios.js';
import tool from './tool.js';
import echarts from 'echarts';
import Vuex from 'vuex';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;// 封装的请求接口
Vue.prototype.$echarts = echarts;
Vue.prototype.tool = tool;// 全局公用方法
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueSocketio, socketio('http://127.0.0.1:8083/'), store);

// 跳转路由后主键为el-main的节点自动滚动到页面顶部
router.afterEach((to, from, next) => {
	var $elMain = document.getElementById('el-main');
	if($elMain)
		$elMain.scrollTo(0, 0);
});

// const modelMenu={
// 	state:{
// 		menuId:"000",
// 		pageRouter:"/"
// 	},
// 	mutations:{
// 		openPage:function(state,item){
// 			state.menuId=item.menuId;
// 			state.pageRouter=item.pageRouter;
// 		},
// 	},
// };
const store=new Vuex.Store({
	modules:{
		// static: modelMenu,
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
