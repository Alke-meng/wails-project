const state = {
  collapse:false, //是否折叠侧边栏
  device: 'desktop',
  isMobile: false
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.collapse = !state.collapse
  },
  CLOSE_SIDEBAR: (state) => {
    state.collapse = true
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
    state.isMobile = device == 'mobile'
  },
  OPEN_SIDEBAR(state) {
    state.collapse = false
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit },) {
    commit('CLOSE_SIDEBAR')
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  openSideBar({ commit }) {
    commit('OPEN_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
