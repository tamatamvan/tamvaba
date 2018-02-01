<template>
  <v-btn
    color="secondary"
    :loading="loading"
    @click.native="loader = 'loading'"
    :disabled="loading"
  >
    {{ btnValue }}
  </v-btn>
</template>

<script>
export default {
  props: ['btnValue'],
  data () {
    return {
      loader: null,
      loading: false
    }
  }
}
</script>
