<template>
  <v-container fluid>
    <vue-headful title="GRTraQ"/>
    <v-flex
      xs12
      sm8
      offset-xs1
      offset-sm2
      class="text-xs-center"
      mt-5
      v-for="(people, idx) in items"
      :key="idx"
    >
      <v-layout row>
        <v-flex xs12 sm2 offset-sm2>
          <v-img v-bind:src="people.img" width="100%"></v-img>
        </v-flex>
        <v-flex xs12 sm6 offset-8>
          <h1>{{ people.name }}</h1>
          <p>{{people.alum}}</p>
          <h3>{{people.title}} - {{people.department}}</h3>
          <p>{{people.caucus}}</p>
        </v-flex>
      </v-layout>
      <br>
      <!-- <span v-if="this.$store.state.userProfile.name == 'Chris Moffatt Armes'">
        <router-link v-bind:to="{ name: 'edit', params: { edit: people.slug }}">Edit Person</router-link>
      </span>
      <br>-->
      <v-expansion-panel focusable>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>About</div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">{{people.bio}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Contact</div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">
              <span v-for="(address, index) in people.addresses" :key="index">
                <h2>{{people.addresses[index].addressType}}</h2>
                <br>
                {{people.addresses[index].streetaddress}}
                <br>
                {{people.addresses[index].city}}, {{people.addresses[index].province}}
                <br>
                {{people.addresses[index].postal}}
                <br>
                <strong>Phone:</strong>
                {{people.addresses[index].phone}}
                <br>
                <strong>Email:</strong>
                {{people.addresses[index].email}}
                <br>
                <strong>Cell:</strong>
                {{people.addresses[index].cell}}
                <br>
                <br>
              </span>

              <h3 class="text-xs-center">Social</h3>
              <a v-if="people.website" v-bind:href="people.website">
                <v-btn>
                  Website
                  <v-icon right>fa-window-maximize</v-icon>
                </v-btn>
              </a>
              <a v-if="people.fb" v-bind:href="people.fb">
                <v-btn>
                  Facebook
                  <v-icon right>fab fa-facebook-square</v-icon>
                </v-btn>
              </a>
              <a v-if="people.twitter" v-bind:href="people.twitter">
                <v-btn>
                  Twitter
                  <v-icon right>fab fa-twitter-square</v-icon>
                </v-btn>
              </a>
              <a v-if="people.other" v-bind:href="people.other">
                <v-btn>
                  Other Digital
                  <v-icon right>fas fa-globe</v-icon>
                </v-btn>
              </a>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Recent Contacts</div>
          </template>
          <v-card>
            <ViewReports></ViewReports>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-container>
</template>

<script>
import ViewReports from "./ViewReports";
import { peopleCollection } from "../firebaseConfig";

export default {
  name: "contact-details",
  data() {
    return {
      items: []
    };
  },
  components: {
    ViewReports
  },
  // computed: {
  //   user() {
  //     return this.$store.state.user;
  //   }
  // },
  mounted() {
    peopleCollection
      .where("slug", "==", this.$route.params.person)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            name: doc.data().name,
            title: doc.data().title,
            department: doc.data().department,
            isElected: doc.data().isElected,
            alum: doc.data().alum,
            levelOfGov: doc.data().levelOfGov,
            caucus: doc.data().caucus,
            addresses: doc.data().addresses,
            email2: doc.data().email2,
            website: doc.data().website,
            twitter: doc.data().twitter,
            fb: doc.data().fb,
            other: doc.data().other,
            img: doc.data().img,
            bio: doc.data().bio,
            slug: doc.data().slug
          };
          this.items.push(data);
        });
      });
  }
};
</script>
<style>
a {
  text-decoration: none;
  align-self: center;
}
</style>
