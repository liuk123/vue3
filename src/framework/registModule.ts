const dynamicModules = require('vue-dynamic-modules')
function regist ({ router, store }, moudle) {
  if (moudle.router) {
    // moudle.router(router)
    moudle.router.forEach(v=>{
      router.addRoute(v)
    })
  }
  if (moudle.store) {
    store.registerModule([moudle.moduleName], moudle.store)
  }
}
export default ({ router, store }) => {
  return Promise.all(dynamicModules).then((moduleInstances: any) => {
    for (const curModule of moduleInstances) {
      curModule.keys().map(key => {
        const m = curModule(key).default
        if (m.moduleName) { regist({ router, store }, m) }
      })
    }
  })
}
