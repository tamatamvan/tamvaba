import firebase from 'firebase'
import 'firebase/firestore'
import config from '~/firebase-conf'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()

export const state = () => ({
  all: [],
  loading: false
})

export const mutations = {
  LOAD_ALL_ARTICLES_SUCCESS (state, articles) {
    state.all = articles
  }
}

export const actions = {
  getAll ({ commit }) {
    db.collection('articles').get()
      .then(docs => {
        const articles = []
        docs.forEach(doc => {
          articles.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('LOAD_ALL_ARTICLES_SUCCESS', articles)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
