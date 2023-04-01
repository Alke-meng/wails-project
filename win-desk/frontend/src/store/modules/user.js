import { login, logout, getInfo, getMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  RESET_USER: (state) => {
    state.token = ''
    state.roles = []
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log(55677,userInfo)
      login(userInfo).then(response => {
        const { data } = response
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  login2({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log(7777,userInfo)
      login(userInfo).then(response => {
        const { data } = response
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出登录
  logout({ commit, state, dispatch }) {
    return new Promise(resolve => {
      logout(state.token).then(() => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

