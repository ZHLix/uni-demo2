<template>
	<div class="tab-bar-container">
		<div class="cu-bar tabbar foot bg-white shadow">
			<div class="action" v-for="(v, k) in _list" :key="k" @click="handle(v, k)" :style="{ color: theme[k == curr ? 'iconSelected' : 'icon'] }">
				<div class="cuIcon-cu-image">
					<span :class="v.icon" v-if="v.icon">
						<i class="cu-tag badge" v-if="v.badge">{{ v.badge }}</i>
					</span>
					<!-- #ifdef MP -->
					<img :src="v.image" v-else-if="v.image" />
					<!-- #endif -->
					<!-- #ifndef MP -->
					<img :src="v.image" v-else-if="v.image" style="width: 42%" />
					<!-- #endif -->
				</div>

				<div class="text">
					<span class="text-sm">{{ v.title }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
				// #ifdef MP
			} else if (type === 'navigateToMiniProgram') {
				console.log('navigateToMiniProgram', row.appId)
				uni.navigateToMiniProgram({ appId: row.appId })
				// #endif
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
	box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
	height: 100upx;
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
