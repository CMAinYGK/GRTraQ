<template>
  <v-container fluid>
    <vue-headful title="Contact Report - GRTraQ"/>
    <v-flex xs-12 class="text-xs-center" v-for="(contact, idx) in items" :key="idx">
      <h1>Contact Report for {{contact.date}}</h1>
      <br>
      <span v-for="(attendee, index) in contact.attendees" :key="index">
        <strong>{{ contact.attendees[index].name}}</strong>
        - {{contact.attendees[index].title}}, {{contact.attendees[index].department}}
        <br>
      </span>
      <br>
      <p>
        <strong>Engagement Type:</strong>
        {{ contact.selectedType }}
      </p>
      <br>
      <p>
        <strong>Internal Alignment:</strong>
        {{contact.selectedSF}}
        <br>
        <strong>External Objective:</strong>
        {{contact.selectedExt}}
        <br>
        <strong>Queen's Attendees:</strong>
        {{contact.QAttend}}
      </p>
      <br>
      <label>Meeting Notes</label>
      <div class="notes">{{contact.message}}</div>
    </v-flex>
  </v-container>
</template>

<script>
import { contactsCollection } from "../firebaseConfig";
export default {
  name: "report-details",
  data() {
    return {
      items: []
    };
  },
  mounted() {
    contactsCollection
      .where("slug", "==", this.$route.params.report)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            attendees: doc.data().attendees,
            name: doc.data().name,
            title: doc.data().title,
            department: doc.data().department,
            name2: doc.data().name2,
            title2: doc.data().title2,
            department2: doc.data().department2,
            name3: doc.data().name3,
            title3: doc.data().title3,
            department3: doc.data().department3,
            name4: doc.data().name4,
            title4: doc.data().title4,
            department4: doc.data().department4,
            date: doc.data().date,
            QAttend: doc.data().QAttend,
            selectedType: doc.data().selectedType,
            selectedExt: doc.data().selectedExt,
            selectedSF: doc.data().selectedSF,
            message: doc.data().message,
            createdAt: doc.data().createdAt,
            slug: doc.data().slug
          };
          this.items.push(data);
        });
      });
  }
};
</script>

<style>
</style>
