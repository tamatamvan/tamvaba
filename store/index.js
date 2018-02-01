import firebase from 'firebase'

export const state = () => ({
  isLogin: false,
  loginLoading: false,
  errLogin: {
    status: false,
    message: ''
  },
  userData: {}
})

export const mutations = {
  LOGIN_SUCCESS (state, userData) {
    state.isLogin = true
    state.userData = userData
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
        console.error(err)
      })
  },
  signOut ({ commit }) {
    return firebase.auth()
      .signOut()
      .then(data => console.log('sign out success ', data))
      .catch(err => console.log('failed to sign out ', err))
  }
}
