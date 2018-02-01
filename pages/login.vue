<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 text-xs-center>
      <h1>Login</h1>
      <v-form v-model="valid" @submit.prevent="login(formLogin  )">
        <v-text-field
          label="E-mail"
          v-model="formLogin.email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          v-model="formLogin.password"
          :rules="passwdRules"
          :counter="8"
          required
        ></v-text-field>
        <v-btn
        type="submit"
        :loading="authLoading"
        :disabled="authLoading"
        >Login
          <span slot="loader">Loading...</span>
        </v-btn>
      </v-form>
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
      formLogin: {
        email: '',
        password: ''
      },
      valid: false,
      passwdRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be more than 8 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    ...mapState([
      'authLoading'
    ])
  },
  methods: {
    ...mapActions({
      login: 'signInWithEmail'
    })
  }
}
</script>
