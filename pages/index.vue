<template>
  <v-layout row wrap>
    <article-card></article-card>
    <article-card></article-card>
    <article-card></article-card>
    <article-card></article-card>
  </v-layout>
</template>

<script>
import ArticleCard from '../components/ArticleCard'
export default {
  components: {
    ArticleCard
  }
}
</script>


<style scoped>
  .gutter-8 {
    padding: 8px;
  }
</style>
