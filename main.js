import Vue from 'vue'
import App from './App'
import store from './store'

// request
import Request from './common/Request'

// utils
import Utils from './common/Utils'

// api
import Api from './api'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

Vue.use(Request, app)
Vue.use(Utils, app)
Vue.use(Api, app)

app.$mount()
