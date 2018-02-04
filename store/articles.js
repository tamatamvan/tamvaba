import firebase from 'firebase'
import 'firebase/firestore'
import config from '~/firebase-conf'
import slug from 'slug'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()

export const state = () => ({
  all: [],
  err: {
    status: false,
    message: ''
  },
  loading: false
})

export const mutations = {
  LOAD_ALL_ARTICLES_SUCCESS (state, articles) {
    state.all = articles
  },
  LOAD_ALL_ARTICLES_PENDING (state) {
    state.loading = true
  },
  LOAD_ALL_ARTICLE_FAIL (state, errMsg) {
    state.loading = false
    state.err.status = true
    state.err.loading = true
  },
  POST_ARTICLE_SUCCESS (state, article) {
    state.all.push(article)
    state.loading = false
  },
  POST_ARTICLE_PENDING (state) {
    state.loading = true
  },
  POST_ARTICLE_FAIL (state, errMsg) {
    state.err.status = true
    state.err.message = errMsg
    state.loading = false
  },
  RESET_ARTICLE_ERROR (state) {
    state.article.err = {}
  }
}

export const actions = {
  getAll ({ commit }) {
    commit('LOAD_ALL_ARTICLES_PENDING')
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
        commit('LOAD_ALL_ARTICLE_FAIL', err.message)
      })
  },
  postNew ({ commit }, newArticle) {
    commit('POST_ARTICLE_PENDING')
    db.collection('articles').doc(slug(newArticle.title).toLowerCase())
      .set(newArticle)
      .then(postedArticle => console.log(postedArticle))
      .catch(err => console.error(err))
  }
}
