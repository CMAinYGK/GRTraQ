<template>
  <v-container fluid>
    <vue-headful title="GRTraQ"/>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>GRTraQ</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          A Government Relations ORM
          <br>designed and built in-house
          <br>at Queen's University
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <!-- <v-btn color="primary" to="/signup">Sign Up</v-btn> -->
        <v-btn v-if="currentUser" color="primary" to="/home">Get Started</v-btn>
        <v-btn v-else color="primary" to="/signin">Sign In</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "landing",
  computed: {
    appTitle() {
      return this.$store.state.appTitle;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>

<style>
</style>
