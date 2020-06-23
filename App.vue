<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import './common/colorUi/index.scss';
/*每个页面公共css */
.container_full {
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */

	/* #ifndef APP-NVUE */
	width: 100vw;
	height: 100vh;
	/* #endif */
}
</style>
