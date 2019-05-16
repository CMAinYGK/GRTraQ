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
          <router-link v-bind:to="{ name: 'edit', params: { edit: people.slug }}">Edit Person</router-link>
        </v-flex>
      </v-layout>
      <br>

      <br>
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
              <h2 class="text-xs-center" v-if="people.addressType">{{people.addressType}}</h2>
              <p v-if="people.streetaddress && people.city && people.province && people.postal">
                {{people.streetaddress}}
                <br>
                {{people.city}}, {{people.province}}
                <br>
                {{people.postal}}
              </p>
              <p v-if="people.phone">
                <strong>Phone:</strong>
                {{people.phone}}
              </p>
              <p v-if="people.cell">
                <strong>Cell:</strong>
                {{people.cell}}
              </p>
              <p v-if="people.email">
                <strong>Email:</strong>
                {{people.email}}
              </p>
              <br>
              <h2 class="text-xs-center" v-if="people.addressType2">{{people.addressType2}}</h2>
              <p v-if="people.streetaddress2 && people.city2 && people.province2 && people.postal2">
                {{people.streetaddress2}}
                <br>
                {{people.city2}}, {{people.province2}}
                <br>
                {{people.postal2}}
              </p>
              <p v-if="people.phone2">
                <strong>Phone:</strong>
                {{people.phone2}}
              </p>
              <p v-if="people.email2">
                <strong>Email:</strong>
                {{people.email2}}
              </p>
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
            <ViewReports v-bind="props"></ViewReports>
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
  props: {
    passedName: name,
    type: "string"
  },
  data() {
    return {
      items: [],
      reports: []
    };
  },
  components: {
    ViewReports
  },
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
            addressType: doc.data().addressType,
            streetaddress: doc.data().streetaddress,
            city: doc.data().city,
            province: doc.data().province,
            postal: doc.data().postal,
            phone: doc.data().phone,
            cell: doc.data().cell,
            email: doc.data().email,
            addressType2: doc.data().addressType2,
            streetaddress2: doc.data().streetaddress2,
            city2: doc.data().city2,
            province2: doc.data().province2,
            postal2: doc.data().postal2,
            phone2: doc.data().phone2,
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
