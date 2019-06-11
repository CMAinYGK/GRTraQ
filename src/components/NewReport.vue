<template>
  <v-container fluid>
    <vue-headful title="New Engagement Report - GRTraQ"/>
    <v-flex xs12 class="text-xs-center">
      <h1>New Contact Report</h1>
      <br>
      <v-flex sm8 offset-sm2>
        <p>Track meetings or engagements involving external contacts.</p>
      </v-flex>

      <v-form @submit.prevent="newReport">
        <v-flex xs12 sm4 offset-sm4>
          <v-text-field label="date" type="date" placeholder="date" v-model="date"></v-text-field>
        </v-flex>

        <v-layout row wrap>
          <v-flex xs12>
            <v-btn @click="plusAttendee">Add Attendees</v-btn>
          </v-flex>
          <v-flex xs12 sm6 offset-sm3 v-for="(extAttendee, index) in extAttendees" :key="index">
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

        <v-flex xs12 sm6 offset-sm3>
          <v-text-field label="Queen's Attendees" v-model="QAttend"></v-text-field>
        </v-flex>
        <v-layout row justify-space-around>
          <v-flex xs12 sm4>
            <v-select :items="selectType" label="Contact Type" v-model="selectedType"></v-select>
          </v-flex>
          <v-flex xs12 sm4>
            <v-select :items="selectInt" label="GR Strategy Alignment" v-model="selectedExt"></v-select>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm4 offset-sm4>
          <v-select :items="selectSF" label="Strategic Framework Alignment" v-model="selectedSF"></v-select>
        </v-flex>

        <v-textarea label="Notes" v-model="message" solo></v-textarea>
        <v-flex class="text-xs-center" mt-5>
          <v-btn color="primary" type="submit">Submit Report</v-btn>
        </v-flex>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import { contactsCollection } from "../firebaseConfig";
import Vue from "vue";

export default {
  name: "contact-report",
  data() {
    return {
      extAttendee: {
        name: "",
        title: "",
        department: ""
      },
      extAttendees: [],
      date: "",
      QAttend: "",
      selectedType: "",
      selectedExt: "",
      selectedSF: "",
      message: "",
      selectType: [
        "Call (Inbound)",
        "Call (Outbound)",
        "Written",
        "Meeting",
        "Event - External",
        "Event - Internal",
        "Event - Visibility",
        "Other (Please Specify in Notes)"
      ],
      selectInt: [
        "Regulatory (Provincial)",
        "Regulatory (Federal)",
        "Community Relations/Issues",
        "Research and Innovation",
        "Other (Please Specify in Notes)"
      ],
      selectSF: [
        "Student Learning Experience",
        "Financial Sustainability",
        "International",
        "Research Prominence",
        "Other (Please Specify in Notes)"
      ],
      isHidden: true
    };
  },
  firestore() {
    return {
      contacts: contactsCollection.orderBy("date")
    };
  },
  methods: {
    plusAttendee() {
      this.extAttendees.push(Vue.util.extend({}, this.extAttendee));
    },
    minusAttendee(index) {
      Vue.delete(this.extAttendees, index);
    },
    newReport() {
      contactsCollection
        .add({
          attendees: this.extAttendees,
          date: this.date,
          QAttend: this.QAttend,
          selectedType: this.selectedType,
          selectedExt: this.selectedExt,
          selectedSF: this.selectedSF,
          message: this.message,
          createdAt: new Date(),
          slug: this.generateUUID()
        })
        .then(
          user => {
            this.$router.replace("/reports");
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