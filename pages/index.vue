<template>
  <v-layout row wrap>
    <article-card></article-card>
    <article-card></article-card>
    <article-card></article-card>
    <article-card></article-card>
    <pagination-list></pagination-list>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleCard from '../components/ArticleCard'
import PaginationList from '../components/PaginationList'
export default {
  middleware: 'authenticated',
  components: {
    ArticleCard,
    PaginationList
  },
  methods: {
    ...mapActions({
      getAll: 'articles/getAll'
    })
  },
  mounted () {
    console.log('hahahah')
    this.getAll()
  }
}
</script>


<style scoped>
  .gutter-8 {
    padding: 8px;
  }
</style>
