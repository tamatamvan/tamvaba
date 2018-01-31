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
import ArticleCard from '../components/ArticleCard'
import PaginationList from '../components/PaginationList'
export default {
  components: {
    ArticleCard,
    PaginationList
  }
}
</script>


<style scoped>
  .gutter-8 {
    padding: 8px;
  }
</style>
