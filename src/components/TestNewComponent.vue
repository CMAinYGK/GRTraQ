<template>
  <v-container fluid>
    <vue-headful title="New Engagement Report - GRTraQ"/>
    <v-flex xs12 class="text-xs-center">
      <h1>New Contact Report</h1>
      <br>
      <v-flex sm8 offset-sm2>
        <p>Track meetings involving up to four external contacts. For more than four, please use the notes section below to list additional attendees.</p>
      </v-flex>

      <v-form @submit.prevent="newReport">
        <v-flex xs12 sm4 offset-sm4>
          <v-text-field label="date" type="date" placeholder="date" v-model="date"></v-text-field>
        </v-flex>

        <v-layout row justify-space-around>
          <v-flex xs12 sm5>
            <v-btn @click="plusAttendee">Add Attendees</v-btn>
          </v-flex>
          <v-flex xs12 sm5 v-for="(extAttendee, index) in extAttendees" :key="index">
            <v-btn @click="minusAttendee(index)">Remove</v-btn>
            <v-text-field
              label="Name"
              name="extAttendees[][name]"
              placeholder="Full Name"
              v-model="extAttendee.name"
              required
            ></v-text-field>
            <v-text-field
              label="Title"
              name="extAttendees[][title]"
              placeholder="Title"
              v-model="extAttendee.title"
              required
            ></v-text-field>
            <v-text-field
              label="Department"
              name="extAttendees[][department]"
              placeholder="Department"
              v-model="extAttendee.department"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex class="text-xs-center" mt-5>
          <v-btn color="primary" type="submit">Submit Report</v-btn>
        </v-flex>
      </v-form>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <span v-for="(extAttendees, index) in item" :key="index">
          <p
            v-for="(extAttendee, index) in extAttendees"
            :key="index"
          >{{extAttendee.name}} - {{extAttendee.title}}</p>
        </span>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import { testCollection } from "../firebaseConfig";
import Vue from "vue";

export default {
  name: "test",
  data() {
    return {
      extAttendee: {
        name: "",
        title: "",
        department: ""
      },
      date: "",
      extAttendees: [],
      items: []
    };
  },
  mounted() {
    testCollection.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
          extAttendees: doc.data().extAttendees
        };
        this.items.push(data);
      });
    });
  },
  methods: {
    plusAttendee() {
      this.extAttendees.push(Vue.util.extend({}, this.extAttendee));
    },
    minusAttendee(index) {
      Vue.delete(this.extAttendees, index);
    },
    newReport() {
      testCollection
        .add({
          extAttendees: this.extAttendees,
          date: this.date,
          createdAt: new Date(),
          slug: this.generateUUID()
        })
        .then(
          user => {
            this.$router.replace("/test");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    generateUUID() {
      let d = new Date().getTime();
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    }
  }
};
</script>

<style>
#req {
  border: 1px solid black;
}
</style>