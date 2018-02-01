<template>
  <div class="text-xs-center" style="width: 100%">
    <v-container fluid class="gutter-8">
      <v-layout justify-center>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-pagination v-bind:length.number="15" v-model="page"></v-pagination>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1
      }
    }
  }
</script>

<style scoped>
.gutter-8 {
  padding: 8px;
}
</style>
