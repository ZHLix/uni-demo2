<template>
	<view class="menu-bar" :style="{ height: height + 'px' }">
		<view :class="['menubar', shadow ? 'shadow' : '']" :style="{ backgroundColor: background, height: height + 'px' }">
			<view class="padding-lr-sm flex-row align-center" :style="{ height: menubar_height + 'px', marginTop: statusbar_height + 'px', paddingRight: left }">
				<view class="back margin-right-xs padding-lr-xs" v-if="back" @click="backHandle"><c-icon :icon="'\ue65c'"></c-icon></view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import CIcon from '../Icon'
export default {
	components: { CIcon },
	props: {
		/**
		 * 背景
		 */
		background: {
			type: String,
			default: '#ffffff'
		},
		/**
		 * 阴影
		 */
		shadow: Boolean,

		back: Boolean
	},

	computed: {
		menubar() {
			return this.$store.state.menubar
		},
		statusbar_height() {
			return this.menubar.statusbar_height
		},
		menubar_height() {
			return this.menubar.nav_margin * 2 + this.menubar.menubtn_height
		},
		height() {
			if (!this.menubar) return 0
			return this.statusbar_height + this.menubar_height
		},
		left() {
			// #ifndef MP
			return 0
			// #endif

			return `calc(750rpx - ${this.menubar.menubtn_left}px)`
		}
	},

	methods: {
		backHandle() {
			uni.navigateBack({
				delta: 1
			})
		}
	},

	async created() {
		if (!this.menubar.platform) {
			const [, { platform, statusBarHeight, system }] = await uni.getSystemInfo()

			// #ifdef MP
			const { height, top } = uni.getMenuButtonBoundingClientRect()
			const nav_margin = top - statusBarHeight
			// #endif

			this.$store.dispatch('menubar', {
				platform,
				statusbar_height: statusBarHeight,
				// #ifdef MP
				nav_margin,
				menubtn_height: height
				// #endif
			})
		}
	}
}
</script>

<style scoped>
	.menu-bar {
		z-index: 1024;
	}
.shadow {
	box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
}
</style>
