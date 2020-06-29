import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		baseUrl: 'https://peixun.mulgore.cn',
		/**
		 * 主题色
		 */
		theme: {
			text: '#2979FF',
			icon: '#aaaaaa',
			iconSelected: '#2979FF',
			background: '#f0f0f0',
		},

		/**
		 * 底部导航列表
		 */
		tabbar: [
			{
				name: '/pages/index/index',
				title: '首页',

				icon: '\ue62d',
				iconSelected: '\ue60a'
			},
			{
				name: '/pages/classify/classify',
				title: '分类',

				icon: '\ue654',
				iconSelected: '\ue608'
			},
			{
				name: '/pages/news/news',
				title: '新闻',
				icon: '\ue657',
				iconSelected: '\ue658'
			},
			{
				title: '油菜招聘',
				image: '/static/images/job3.png',
				type: 'navigateToMiniProgram',
				appId: 'wxc5e14770d465dcac'
			},
			{
				name: '/pages/mine/mine',
				title: '我的',
				icon: '\ue63b',
				iconSelected: '\ue63a'
			}
		],
		
		menubar: {
			platform: null,
			statusbar_height: 20,
			nav_margin: 6,
			menubtn_height: 32,
			menubtn_left: null
		}
	},
	mutations: {
		/**
		 * 数据更新 默认方法（大部分）
		 * @param state
		 * @param k
		 * @param v
		 */
		update: (state, {
			key: k,
			value: v
		}) => {
			if (state[k] !== v) state[k] = v
		},
	},
	actions: {
		tabbar(context, data) {
			context.commit('update', {
				key: 'tabbar',
				value: data
			})
		},
		
		menubar(context, {platform, statusbar_height, system, nav_margin = 6, menubtn_height = 32, menubtn_left}) {
			if (platform === 'ios') nav_margin = 4
			context.commit('update', {
				key: 'menubar',
				value: {
					platform,
					statusbar_height,
					nav_margin,
					menubtn_height,
					menubtn_left
				}
			})
		}
	},
	modules: {}
})
