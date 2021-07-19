const state = {
  heNanCitys: [
    { id: '411300', name: '南阳市' },
    { id: '411500', name: '信阳市' },
    { id: '410300', name: '洛阳市' },
    { id: '411700', name: '驻马店市' },
    { id: '411600', name: '周口市' },
    { id: '411400', name: '商丘市' },
    { id: '411200', name: '三门峡市' },
    { id: '410700', name: '新乡市' },
    { id: '410400', name: '平顶山市' },
    { id: '410100', name: '郑州市' },
    { id: '410500', name: '安阳市' },
    { id: '410200', name: '开封市' },
    { id: '410800', name: '焦作市' },
    { id: '411000', name: '许昌市' },
    { id: '410900', name: '濮阳市' },
    { id: '411100', name: '漯河市' },
    { id: '410600', name: '鹤壁市' }
  ],
  selectree: [],
  lineTypes: [
    { id: 1, name: 'IPRAN' },
    { id: 2, name: '波长租用' },
    { id: 3, name: 'MSTP' },
    { id: 4, name: 'OTN' },
    { id: 5, name: '其他' }
  ]
}

const getters = {
  heNanCitys: state => state.heNanCitys,
  selectree: state => state.selectree,
  lineTypes: state => state.lineTypes
}

const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
