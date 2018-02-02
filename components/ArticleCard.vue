<template>
  <v-flex xs12 sm8 md6 class="gutter-8">
    <v-card>
      <v-card-media :src="article.featured_img" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ article.title }}</h3>
          <p class="summary">
            {{ article.summary }}
          </p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Preview</v-btn>
        <v-btn flat color="orange">Edit</v-btn>
        <v-btn flat color="orange">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
    }
  }
}
</script>


<style scoped>
.gutter-8 {
  padding: 8px;
}
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.summary {
  margin: 8px 0;
}
</style>
