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
				}
				// },{
				// 	path: '/Echarts',
				// 	component: function(resolve) {
				// 		require(['@/views/Echarts/Index'], resolve);
				// 	}
				// },{
				// 	path: '/TreeView',
				// 	component: function(resolve) {
				// 		require(['@/views/Tree/Index'], resolve);
				// 	}
				// },{
				// 	path: '/Canvas',
				// 	component: function(resolve) {
				// 		require(['@/views/HTML5/CanvasIndex'], resolve);
				// 	},
				// 	children: [
				// 		{
				// 			path: '/Canvas/Course',
				// 			component: function(resolve) {
				// 				require(['@/views/HTML5/CanvasCourse'], resolve);
				// 			}
				// 		},{
				// 			path: '/Canvas/Well',
				// 			component: function(resolve) {
				// 				require(['@/views/HTML5/Well'], resolve);
				// 			}
				// 		}
				// 	]
				// },{
				// 	path: '/SVG',
				// 	component: function(resolve) {
				// 		require(['@/views/HTML5/SVG'], resolve);
				// 	}
				// }
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

