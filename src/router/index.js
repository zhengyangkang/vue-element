import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Home from '@/views/home'
import CanvasCourse from '@/views/html5/canvas-course'
import Svg from '@/views/html5/svg'
import RetroSnaker from '@/views/games/retro-snaker'
import Gobang from '@/views/games/gobang'
import chat from '@/views/websocket/chat'
import Error from '@/views/error'
Vue.use(Router)

export default new Router({
    routes: [
		{
			path: '/',
			component: Index,
			children: [
				{ // 首页
					path: '',
					component: Home
				},{ //html5
					path: 'canvas-course',
					component: CanvasCourse
				},{
					path: 'svg',
					component: Svg
				},{ // 小游戏
					path: 'retro-snaker',
					component: RetroSnaker
				},{
					path: 'gobang',
					component: Gobang
				},{ // websocket
					path: 'chat',
					component: chat
				}
			]
		},{ // 404
			path: '/*',
			component: Index,
            children:[
                {
                    path: '',
                    component: Error
                }
            ]
		}
    ]
})

