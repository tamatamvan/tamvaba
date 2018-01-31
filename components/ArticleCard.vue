<template>
  <v-flex xs12 sm8 md6 class="gutter-8">
    <v-card>
      <v-card-media src="https://static.pexels.com/photos/290164/pexels-photo-290164.jpeg" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <p class="summary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis itaque maxime laboriosam asperiores error quibusdam nemo consequuntur alias placeat nisi quas illum blanditiis, cupiditate consequatur quis delectus dolores, et fugiat.
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
