<template>
  <v-container fluid>
    <vue-headful title="Create Account - GRTraQ."/>
    <v-layout row wrap>
      <v-flex>
        <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm4 offset-sm4 mt-3>
        <form @submit.prevent="userSignUp">
          <v-layout column>
            <v-flex>
              <v-text-field name="name" label="Name" id="name" type="text" v-model="name" required></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const fb = require("../firebaseConfig");
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",

      passwordConfirm: "",
      alert: false
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm
        ? true
        : "Passwords don't match";
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return;
      }
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$store.commit("setIsAuthenticated", true);
          console.log(user.user.uid);

          // create user obj
          fb.usersCollection
            .doc(user.user.uid)
            .set({
              name: this.name,
              email: this.email
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.replace("/home");
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  }
};
</script> 