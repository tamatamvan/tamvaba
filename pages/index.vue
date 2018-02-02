<template>
  <v-layout row wrap>
    <article-card
    v-for="(article, idx) in articles.all"
    :article="article"
    :key="idx"
    ></article-card>
    <pagination-list></pagination-list>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ArticleCard from '../components/ArticleCard'
import PaginationList from '../components/PaginationList'
export default {
  middleware: 'authenticated',
  components: {
    ArticleCard,
    PaginationList
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  methods: {
    ...mapActions({
      getAll: 'articles/getAll'
    })
  },
  mounted () {
    this.getAll()
  }
}
</script>


<style scoped>
  .gutter-8 {
    padding: 8px;
  }
</style>
