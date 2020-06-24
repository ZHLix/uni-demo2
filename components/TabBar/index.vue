<template>
	<view class="tab-bar-container">
		<view class="container bg-white flex-row">
			<view class="action flex-sub justify-center align-center" v-for="(v, k) in _list" :key="k" @click="handle(v, k)">
				<view class="image">
					<c-icon :icon="v[k == curr ? 'iconSelected' : 'icon']" size="40" :color="theme[k == curr ? 'iconSelected' : 'icon']" v-if="v.icon"></c-icon>
					<image :src="v.image" :style="{ width: '44rpx', height: '44rpx' }" v-else></image>
				</view>
				<view class="text align-center padding-left-xs" :style="{width: '120rpx'}">
					<text class="text-sm" :style="{ color: theme[k == curr ? 'iconSelected' : 'icon'] }">{{ v.title }} </text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import CIcon from '../Icon/index.vue'
export default {
	components: { CIcon },
	props: {
		value: Array
	},

	data() {
		return {
			curr: null
		}
	},

	computed: {
		_list() {
			let list = (this.value ?? []).concat()
			if (!list.length) list = this.$store.state.tabbar
			return list
		},
		theme() {
			return this.$store.state.theme
		}
	},

	methods: {
		handle(row) {
			const type = row.type ?? 'route'

			if (type === 'route' && row.name) {
				uni.switchTab({ url: row.name })
			} else if (type === 'navigateToMiniProgram') {
				console.log('navigateToMiniProgram', row.appId)
				uni.navigateToMiniProgram({ appId: row.appId })
			} else {
				this.$emit('click', row, Boolean(row.name))
			}
		}
	},

	mounted() {
		const route = `/${getCurrentPages()[0].route}`
		const index = this._list.findIndex(v => v.name === route)
		if (index !== -1) this.curr = index
	},

	beforeCreate() {
		uni.hideTabBar()
	}
}
</script>

<style scoped>
.tab-bar-container {
	height: 100upx;
}

.container {
	width: 750upx;
	height: 100upx;
	box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
