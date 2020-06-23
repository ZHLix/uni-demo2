<template>
	<scroll-view
		class="refresh-container flex-sub flex flex-direction align-center"
		scroll-y
		@touchstart="touch"
		@touchmove="touch"
		@touchend="touch"
		@touchcancel="touch"
		@scroll="scroll"
		@scrolltoupper="toupper"
	>
		<view :class="['container', 'justify-center', 'align-center', height_status ? 'height_status' : '']" :style="{ height: (loading ? maxHeight : offset.top) + 'rpx' }">
			<view class="flex-row justify-center align-center" style="min-width: 200upx; height: 100rpx">
				<image
					v-if="offset.start || height_status || loading"
					src="/static/images/loading.png"
					:class="['loading-image', 'margin-right-xs', loading ? 'loading' : '']"
					style="width: 20px;height: 20px;"
				></image>

				<text class="text-sm text-gray" v-if="offset.loading">松开刷新</text>
				<text class="text-sm text-gray" v-else-if="!loading && height_status">刷新成功</text>
				<text class="text-sm text-gray" v-else-if="!height_status">下拉刷新</text>
				<text class="text-sm text-gray" v-else>刷新中</text>
			</view>
		</view>
		<slot></slot>
	</scroll-view>
</template>

<script>
export default {
	props: {
		refresh: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			maxHeight: 100,
			isTop: true,
			offset: {
				top: 0,
				start: 0,
				loading: false
			},
			loading: false,
			height_status: false
		}
	},

	watch: {
		loading(v) {
			if (v) {
				this.height_status = true
			} else {
				setTimeout(() => {
					this.height_status = false
				}, 300)
			}
		}
	},

	methods: {
		scroll({ detail: { scrollTop } }) {
			if (scrollTop) {
				this.isTop = false
			}
		},

		toupper() {
			this.isTop = true
		},

		touch({ type, touches: [e] }) {
			if (this.isTop && this.refresh && !this.loading) {
				const offsetTop = parseInt(e ? e.pageY : 0)

				if (type === 'touchstart') {
					this.offset.start = offsetTop
				} else if (type === 'touchmove') {
					this.offset.top = (offsetTop - this.offset.start) / 2

					if (offsetTop - this.offset.start >= this.maxHeight) {
						this.offset.loading = true
					} else {
						this.offset.loading = false
					}
				} else if (type === 'touchend') {
					this.touchend()
				}
			}
		},

		touchend() {
			if (this.offset.loading) {
				this.loading = true
				this.$emit('start')
			}
			this.offset.start = this.offset.top = 0
			this.offset.loading = false
		},

		start() {
			this.loading = true
			this.$emit('start')
		},

		end() {
			this.loading = false
		}
	}
}
</script>

<style scoped lang="scss">
.refresh-container {
	height: 100%;
	overflow: hidden;
	position: relative;
}

.container {
	width: 750upx;
	background-color: #f1f1f1;
	flex-direction: row;
	overflow: hidden;
}

.height_status {
	transition: height 0.3s ease;
}

.loading-image {
	transform: rotate(0deg);
	transition: transform 12s linear;
}

.loading {
	transform: rotate(4800deg);
}
</style>
