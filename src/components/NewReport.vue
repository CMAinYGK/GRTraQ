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
            <v-text-field label="Name" placeholder="Full Name" v-model="name" required></v-text-field>
            <v-text-field label="Title" placeholder="Title" v-model="title" required></v-text-field>
            <v-text-field label="Department" placeholder="Department" v-model="department" required></v-text-field>
          </v-flex>

          <v-flex xs12 sm5>
            <v-text-field label="Second Person Name" placeholder="Full Name" v-model="name2"></v-text-field>
            <v-text-field label="Title" placeholder="Title" v-model="title2"></v-text-field>
            <v-text-field label="Department" placeholder="Department" v-model="department2"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn type="button" v-if="isHidden" v-on:click="isHidden = !isHidden">Add more</v-btn>
        <div v-if="!isHidden">
          <v-layout row justify-space-around>
            <v-flex xs12 sm5>
              <v-text-field label="Third Person Name" placeholder="Full Name" v-model="name3"></v-text-field>
              <v-text-field label="Title" placeholder="Title" v-model="title3"></v-text-field>
              <v-text-field label="Department" placeholder="Department" v-model="department3"></v-text-field>
            </v-flex>
            <v-flex xs12 sm5>
              <v-text-field label="Fourth Person Name" placeholder="Full Name" v-model="name4"></v-text-field>
              <v-text-field label="Title" placeholder="Title" v-model="title4"></v-text-field>
              <v-text-field label="Department" placeholder="Department" v-model="department4"></v-text-field>
            </v-flex>
          </v-layout>
        </div>
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

export default {
  name: "contact-report",
  data() {
    return {
      name: "",
      title: "",
      department: "",
      name2: "",
      title2: "",
      department2: "",
      name3: "",
      title3: "",
      department3: "",
      name4: "",
      title4: "",
      department4: "",
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
    newReport() {
      contactsCollection
        .add({
          name: this.name,
          title: this.title,
          department: this.department,
          name2: this.name2,
          title2: this.title2,
          department2: this.department2,
          name3: this.name3,
          title3: this.title3,
          department3: this.department3,
          name4: this.name4,
          title4: this.title4,
          department4: this.department4,
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