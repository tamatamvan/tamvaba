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

export const actions = {
  getAll () {
    db.collection('articles').get()
      .then(docs => {
        const articles = []
        docs.forEach(doc => {
          articles.push({
            id: doc.id,
            ...doc.data()
          })
        })
        console.log('get articles ', articles)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
