<template>
	<scroll-view
		class="refresh-container flex-sub"
		scroll-y
		@touchstart="touch"
		@touchmove="touch"
		@touchend="touch"
		@touchcancel="touch"
		@scroll="scroll"
		@scrolltoupper="toupper"
	>
		<div class="container">
			<div class="item w-100 flex flex-wrap justify-center align-center" :style="{ bottom: -(loading ? maxHeight : offset.top) + 'rpx' }">
				<div class="load bg-white shadow round"><span :class="['icon', loading ? 'loading' : '']"></span></div>
			</div>
		</div>
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
			loading: false
		}
	},

	// computed: {
	// 	containerHeight() {
	// 		let height = this.offset.top - this.offset.start
	// 		height = height >= 0 ? height : 0
	// 		height = height > this.maxHeight * 2 ? this.maxHeight * 2 : height
	// 		console.log(height)
	// 		return height //  ? height + 'rpx' : 0
	// 	}
	// },

	methods: {
		scroll({ detail: { scrollTop } }) {
			if (scrollTop) {
				this.isTop = false
			}
		},

		toupper() {
			this.isTop = true
		},

		// tolower() {
		// 	console.log('this is tolower')
		// },

		touch({ type, touches: [e] }) {
			if (this.isTop && this.refresh && !this.loading) {
				const offsetTop = parseInt(e ? e.clientY : 0)

				if (type === 'touchstart') {
					this.offset.start = offsetTop
				} else if (type === 'touchmove') {
					this.offset.top = (offsetTop - this.offset.start) / 2

					if (offsetTop - this.offset.start >= this.maxHeight - 20) {
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
	width: 100%;
	height: 100%;

	.container {
		// overflow: hidden;
		position: absolute;
		top: -10upx;
		left: 0;
		width: 100%;
		height: 0;

		.item {
			// transition: all 0.1s ease;
			position: absolute;
			bottom: 0;
			transform: translateX(-50%);
			left: 50%;

			.load {
				width: 64upx;
				height: 64upx;
				box-shadow: 0upx 0upx 12upx rgba(26, 26, 26, 0.2);

				.icon {
					width: 64upx;
					height: 64upx;
					display: inline-block;
					// vertical-align: middle;
					// -webkit-animation: uni-loading 1s steps(12) infinite;
					// animation: uni-loading 1s steps(12) infinite;
					background-size: 64%;
					background-repeat: no-repeat;
					background-position: center;
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=);

					&.loading {
						animation: uni-loading 1s steps(12) infinite;
					}

					@keyframes uni-loading {
						0% {
							-webkit-transform: rotate(0deg);
							transform: rotate(0deg);
						}
						to {
							-webkit-transform: rotate(1turn);
							transform: rotate(1turn);
						}
					}
				}
			}
		}
	}
}
</style>
