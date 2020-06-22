<template>
	<scroll-view
		class="refresh-container"
		scroll-y="true"
		:refresher-enabled="refresherEnabled"
		:refresher-triggered="refresherTriggered"
		@refresherrefresh="refresherHandle"
	>
		<slot></slot>
	</scroll-view>
</template>

<script>
export default {
	props: {
		refresherEnabled: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			refresherTriggered: false
		}
	},
	
	methods: {
		refresherHandle(e) {
			this.refresherTriggered = true
			this.$emit('start')
		},
		end() {
			this.refresherTriggered = false
		}
	}
}
</script>

<style scoped lang="scss">
	.refresh-container {
		width: 100%;
		height: 100%;
	}
</style>
