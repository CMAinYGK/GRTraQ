<template>
  <v-container fluid>
    <vue-headful title="GRTraQ"/>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Reset Your Password</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="passwordReset">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
            </v-flex>
            <H2>Please enter your email address below</H2>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Send Reset Email</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <div>
          <router-link to="/signin">Return to Sign In</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const fb = require("../firebaseConfig");
export default {
  name: "password-reset",
  data() {
    return {
      email: "",
      alert: false
    };
  },
  methods: {
    passwordReset() {
      fb.auth
        .sendPasswordResetEmail(this.email)
        .then(function() {
          alert(
            "Thank You. If there is an account connected to this email, you will receive a reset email shortly."
          );
          this.$router.replace("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null);
      }
    }
  }
};
</script>