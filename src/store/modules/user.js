import { login, logout, getuserinfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
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
  SET_USERINFO :(state,userinfo)=>{
    state.userInfo = userinfo
  }
}

const actions = {
  // user login
  async logins({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ userAccount: username.trim(), userPassword: password })
    if (res.code == 20000) {
      // 保存用户 信息
      commit('SET_USERINFO',userInfo)
      commit('SET_TOKEN', res.data)
      setToken(res.data)
      return 'ok'
    }
  },



  // get user info
  getInfo({ commit, state }) {
   const {username,password} = state.userInfo
    return new Promise((resolve, reject) => {
      
      getuserinfo({ userAccount: username.trim(), userPassword: password }).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { userName, userAvatar } = data

        commit('SET_NAME', userName)
        commit('SET_AVATAR', userAvatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout();
    if(result.code=='20000'){
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

