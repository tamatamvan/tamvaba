import firebase from 'firebase'
import config from '~/firebase-conf'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('LOGIN_SUCCESS', {
        email: user.email,
        diplayName: user.displayName
      })
    }
  })
}
