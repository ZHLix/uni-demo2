export default class Base {
	constructor(root) {
		for(let i in root) {
			this[i] = root[i]
		}
	}

	bind(app) {
		this.$app = app
	}

	/**
	 * 模拟数据返回
	 */
	result(data, code = 200, msg = '') {
		return new Promise(resolve => resolve({
			code: code ?? 200,
			data: data ?? null,
			msg: msg ?? '',
			success: Boolean(code === 200)
		}))
	}


	/**
	 * list 请求参数调整
	 * @param {*} param0
	 */
	params({
		page = 1,
		limit = null,
		search = {},
		...other
	}) {
		let req = {}

		/**
		 * 分页
		 */
		if (limit && page) {
			req.offset = (page - 1) * limit
			req.limit = limit
		}

		/**
		 * 搜索
		 */
		Object.keys(search).forEach(k => {
			let tmp = search[k]
			if (tmp === null || tmp === undefined || tmp === '') return false
			req[k] = tmp
		})

		return Object.assign({}, req, other)
	}
}
