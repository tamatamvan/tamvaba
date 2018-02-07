import db from '~/utils/initFirestore'

export const state = () => ({
  all: [],
  isLoading: false,
  err: {
    status: false,
    message: ''
  }
})

export const mutations = {
  LOAD_ALL_CATEGORIES_SUCCESS (state, categories) {
    state.all = categories
    state.isLoading = false
  },
  SET_ERROR (state, errMsg) {
    state.err = true
    state.message = errMsg
    state.isLoading = false
  },
  SET_LOADING (state) {
    state.isLoading = true
  }
}

export const actions = {
  getAll ({ commit }) {
    commit('SET_LOADING')
    db.collection('categories').get()
      .then(docs => {
        const categories = []
        docs.forEach(category => {
          categories.push(category.data())
        })
        commit('LOAD_ALL_CATEGORIES_SUCCESS', categories)
      })
      .catch(err => commit('SET_ERROR', err.message))
  }
}
