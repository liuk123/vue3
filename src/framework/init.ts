import registModule from './registModule'
import router from './router'
import store from './store'

export default function (v) {
  registModule({ router, store }).then(v)
}

