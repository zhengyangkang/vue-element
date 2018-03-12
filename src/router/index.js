import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
		{
			path: '/',
			component: function(resolve) {
				require(['@/views/index'], resolve);
			},
			children: [
				{ // 首页
					path: '',
					component: function(resolve) {
						require(['@/views/home'], resolve);
					}
				},{ //html5
					path: 'canvas-course',
					component: function(resolve) {
						require(['@/views/html5/canvas-course'], resolve);
					}
				},{
					path: 'svg',
					component: function(resolve) {
						require(['@/views/html5/svg'], resolve);
					}
				},{ // 小游戏
					path: 'retro-snaker',
					component: function(resolve) {
						require(['@/views/games/retro-snaker'], resolve);
					}
				},{
					path: 'gobang',
					component: function(resolve) {
						require(['@/views/games/gobang'], resolve);
					}
				}
			]
		},{ // 404
			path: '/*',
			component: function(resolve) {
				require(['@/views/index'], resolve);
			},
            children:[
                {
                    path: '',
                    component: function(resolve) {
                        require(['@/views/error'], resolve);
                    }
                }
            ]
		}
    ]
})

