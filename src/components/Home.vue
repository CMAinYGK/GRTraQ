<template>
  <v-container fluid>
    <vue-headful title="GRTraQ"/>
    <v-app id="main">
      <v-flex xs9 sm4 offset-xs3 offset-sm8>
        <br>
        <!-- <v-card>
          <p>The current user is {{user}}</p>
          <router-link v-bind:to="{ name: 'profile'}">Edit Person</router-link>
        </v-card>
        <br>-->

        <v-card>
          <h2 class="text-xs-left">Helpful Links</h2>
          <ul>
            <li>
              <a href="https://www.ourcommons.ca/en">House of Commons Website</a>
            </li>
            <li>
              <a href="https://sencanada.ca/en">Senate of Canada</a>
            </li>
            <li>
              <a href="https://www.ola.org/en/node/3771">Legislative Assembly of Ontario</a>
            </li>
            <li>
              <a href="https://lobbycanada.gc.ca/eic/site/012.nsf/eng/h_00000.html">Lobby Registry</a>
            </li>
          </ul>
        </v-card>
        <br>
      </v-flex>
      <v-flex xs8 sm6 offset-xs3 offset-sm6>
        <v-card>
          <KeyDates></KeyDates>
        </v-card>
      </v-flex>
    </v-app>
  </v-container>
</template>

<script>
import KeyDates from "./KeyDates.vue";
export default {
  name: "home",
  components: {
    KeyDates
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
#main {
  background-image: url("https://pbs.twimg.com/media/DLxtwBlX4AEkz1V.jpg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  min-height: 100vh;
  margin: -30px;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
v-card {
  background-color: (256, 256, 256, 0.7);
}
</style>
