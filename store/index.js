import firebase from 'firebase'

export const state = () => ({
  isLogin: false,
  authLoading: false,
  errLogin: {
    status: false,
    message: ''
  },
  userData: {}
})

export const mutations = {
  LOGIN_SUCCESS (state, userData) {
    state.userData = userData
    state.isLogin = true
    state.authLoading = false
  },
  LOGIN_PENDING (state) {
    state.authLoading = true
  },
  LOGIN_FAIL (state, errMsg) {
    state.errLogin.status = true
    state.authLoading = false
    state.errLogin.message = errMsg
  },
  RESET_ERROR_LOGIN (state) {
    state.errLogin = {
      status: false,
      message: ''
    }
  }
}

export const actions = {
  signInWithEmail ({ commit }, account) {
    commit('LOGIN_PENDING')
    return firebase.auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then(user => {
        commit('LOGIN_SUCCESS', {
          email: user.email,
          displayName: user.displayName
        })
      })
      .catch(err => {
        commit('LOGIN_FAIL', err.message)
      })
  },
  signOut ({ commit }) {
    return firebase.auth()
      .signOut()
      .then(data => console.log('sign out success ', data))
      .catch(err => console.log('failed to sign out ', err))
  }
}
