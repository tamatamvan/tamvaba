<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 text-xs-center>
      <v-card>
        <v-card-title>
          <h2 class="md-0 headline">
            Create New Article
          </h2>
          <v-alert dismissible 
          color="error"
          icon="priority_high"
          value="articlesErr.status"
          v-if="articlesErr.status"
          @input="clearErr">
            {{ articlesErr.message }}
          </v-alert>
          <v-form v-model="valid"
          @submit.prevent="postNew(newArticle).then(()=> $router.push('/'))">
            <v-text-field
              label="Title"
              v-model="newArticle.title"
              :rules="rules.title"
              required
            ></v-text-field>
            <v-text-field
              label="Content"
              v-model="newArticle.content"
              :rules="rules.content"
              textarea
              required
            ></v-text-field>
            <v-text-field
              label="Summary"
              v-model="newArticle.summary"
              :rules="rules.summary"
              textarea
              required
            ></v-text-field>
            <v-text-field
              label="Featured Image"
              v-model="newArticle.featured_img"
              :rules="rules.featured_img"
              required
            ></v-text-field>
            <v-select
              v-bind:items="categories"
              v-model="newArticle.category"
              label="Select"
              :rules="rules.category"
              single-line
              bottom
            ></v-select>
            <v-select
              v-model="newArticle.keywords"
              label="Keywords"
              chips
              tags
            ></v-select>
            <v-select
              v-bind:items="tags"
              v-model="newArticle.tags"
              label="Tags"
              chips
              tags
            ></v-select>
            <v-btn
            type="submit"
            :loading="articlesLoading"
            :disabled="articlesLoading"
            >Post Article
              <span slot="loader">Loading...</span>
            </v-btn>
          </v-form>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  data () {
    return {
      valid: false,
      newArticle: {
        title: '',
        content: '',
        summary: '',
        featured_img: '',
        category: '',
        keywords: [],
        tags: []
      },
      rules: {
        title: [
          v => !!v || 'Title is required!'
        ],
        content: [
          v => !!v || 'Content is required'
        ],
        featured_img: [
          v => !!v || 'Featured image is required',
          v => /(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(v) || 'The value should be link of valid jpg or png image'
        ],
        category: [
          v => !!v || 'You should choose one category'
        ],
        keywordsNTags: [
          v => v.length < 1 || 'You should at least choose one'
        ]
      },
      categories: [
        'haha',
        'hihi',
        'huhu'
      ],
      tags: [
        'hahaha',
        'hihihi',
        'huhuhu'
      ]
    }
  },
  computed: {
    ...mapState({
      articlesLoading: state => state.articles.loading,
      articlesErr: state => state.articles.err
    })
  },
  methods: {
    ...mapActions({
      postNew: 'articles/post'
    })
  }
}
</script>

<style scoped>
.card__title {
  display: block;
}
</style>