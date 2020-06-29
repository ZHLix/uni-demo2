import Base from '../base.js'

export default class IndexIndex extends Base {
	async init() {
		let {
			data,
			code,
			msg
		} = await this.$request.post('miniapp/index')
		console.log(data, code, msg)
	}
}
