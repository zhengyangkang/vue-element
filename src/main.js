// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);

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
