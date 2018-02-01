<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 text-xs-center>
      <h1>Login</h1>
      <v-alert dismissible 
      color="error"
      icon="priority_high"
      value="errLogin.status"
      v-if="errLogin.status"
      @input="clearErr">
        {{ errLogin.message }}
      </v-alert>
      <v-form v-model="valid"
      @submit.prevent="login(formLogin).then(()=> $router.push('/'))">
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
  mapState,
  mapMutations
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
      'authLoading',
      'errLogin'
    ])
  },
  methods: {
    ...mapActions({
      login: 'signInWithEmail'
    }),
    ...mapMutations({
      clearErr: 'RESET_ERROR_LOGIN'
    })
  }
}
</script>
