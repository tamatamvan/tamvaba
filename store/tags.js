import db from '~/utils/initFirestore'
import slug from 'slug'

export const state = () => ({
  all: [],
  isLoading: false,
  err: {
    status: false,
    message: ''
  }
})

export const mutations = {
  LOAD_ALL_TAGS_SUCCESS (state, tags) {
    state.all = tags
    state.isLoading = false
  },
  ADD_TAG_SUCCESS (state, tag) {
    state.all.push(tag)
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
    db.collection('tags').get()
      .then(docs => {
        const tags = []
        docs.forEach(category => {
          tags.push(category.data())
        })
        commit('LOAD_ALL_TAGS_SUCCESS', tags)
      })
      .catch(err => commit('SET_ERROR', err.message))
  },
  addNew ({ commit }, tagName) {
    const tagId = slug(tagName).toLowerCase()
    db.collection('tags').doc(tagId)
      .set({
        tag_name: tagName
      })
      .then(() => {
        commit('ADD_TAG_SUCCESS', {
          id: tagId,
          tag_name: tagName
        })
      })
      .catch(err => {
        commit('SET_ERROR', err.message)
      })
  }
}

export const getters = {
  tagNames (state) {
    return state.all.map(tag => tag.tag_name)
  }
}
