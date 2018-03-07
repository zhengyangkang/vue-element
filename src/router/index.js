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
				{
					path: '',
					component: function(resolve) {
						require(['@/views/home'], resolve);
					}
				},{
					path: 'canvas-course',
					component: function(resolve) {
						require(['@/views/html5/canvas-course'], resolve);
					}
				},{
					path: 'canvas-well',
					component: function(resolve) {
						require(['@/views/html5/well'], resolve);
					}
				},{
					path: 'svg',
					component: function(resolve) {
						require(['@/views/html5/svg'], resolve);
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

