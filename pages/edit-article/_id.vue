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
          v-if="article"
          @submit.prevent="postNew(article).then(()=> $router.push('/'))">
            <v-text-field
              label="Title"
              :value="article.title"
              @focus="selectField('title')"
              @change="handleChange"
              :rules="rules.title"
              required
            ></v-text-field>
            <v-text-field
              label="Content"
              :value="article.content"
              @focus="selectField('content')"
              @change="handleChange"
              :rules="rules.content"
              textarea
              required
            ></v-text-field>
            <v-text-field
              label="Summary"
              :value="article.summary"
              @focus="selectField('summary')"
              @change="handleChange"
              :rules="rules.summary"
              textarea
              required
            ></v-text-field>
            <v-text-field
              label="Featured Image"
              :value="article.featured_img"
              @focus="selectField('featured_img')"
              @change="handleChange"
              :rules="rules.featured_img"
              required
            ></v-text-field>
            <v-select
              v-bind:items="categories"
              :value="article.category"
              @focus="selectField('category')"
              @change="handleChange"
              label="Select"
              :rules="rules.category"
              single-line
              bottom
            ></v-select>
            <v-select
              :value="article.keywords"
              @focus="selectField('keywords')"
              @change="handleChange"
              label="Keywords"
              chips
              tags
            ></v-select>
            <v-select
              v-bind:items="tags"
              :value="article.tags"
              @focus="selectField('tags')"
              @change="handleChange"
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
      selectedField: '',
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
      articlesErr: state => state.articles.err,
      article: state => state.articles.selected
    })
  },
  methods: {
    ...mapActions({
      postNew: 'articles/postNew',
      getOne: 'articles/getOne'
    }),
    handleChange (data) {
      this.$store.commit('articles/UPDATE_FIELD_VALUE', {
        name: this.selectedField,
        value: data
      })
    },
    selectField (fieldName) {
      console.log('select ', fieldName)
    }
  },
  created () {
    this.getOne(this.$route.params.id)
  }
}
</script>

<style scoped>
.card__title {
  display: block;
}
</style>