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
  selected: null,
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
  LOAD_ARTICLE_SUCCESS (state, article) {
    state.selected = article
  },
  UPDATE_FIELD_VALUE (state, field) {
    console.log('update field value')
    state.selected[field.name] = field.value
  },
  POST_ARTICLE_SUCCESS (state, article) {
    state.all.push(article)
    state.loading = false
  },
  SET_PENDING (state) {
    state.loading = true
  },
  SET_ERROR (state, errMsg) {
    state.err.status = true
    state.err.message = errMsg
    state.loading = false
  },
  RESET_ERROR (state) {
    state.article.err = {}
  }
}

export const actions = {
  getAll ({ commit }) {
    commit('SET_PENDING')
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
        commit('SET_ERROR', err.message)
      })
  },
  postNew ({ commit }, newArticle) {
    commit('SET_PENDING')
    const articleId = slug(newArticle.title).toLowerCase()
    db.collection('articles').doc(articleId)
      .set(newArticle)
      .then(() => {
        commit('POST_ARTICLE_SUCCESS', {
          ...newArticle,
          id: articleId
        })
      })
      .catch(err => {
        commit('SET_ERROR', err.message)
      })
  },
  getOne ({ commit }, id) {
    commit('SET_PENDING')
    db.collection('articles').doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          commit('LOAD_ARTICLE_SUCCESS', doc.data())
        } else {
          // doc.data() will be undefined in this case
          commit('SET_ERROR', 'No such document!')
        }
      })
      .catch(err => commit('SET_ERROR', err.message))
  }
}
