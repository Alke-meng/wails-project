import defaultSettings from '@/config'
import storage from '@/utils/storage'
const { showSettings, fixedHeader, sidebarLogo, tagsView, navTheme, layout } = defaultSettings
const state = {
  showSettings: storage.get('showSettings', showSettings),
  tagsView: storage.get('tagsView', tagsView),
  fixedHeader: storage.get('fixedHeader', fixedHeader),
  sidebarLogo: storage.get('sidebarLogo', sidebarLogo),
  navTheme: storage.get('navTheme', navTheme),
  layout: storage.get('layout', layout)
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      storage.set(key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

