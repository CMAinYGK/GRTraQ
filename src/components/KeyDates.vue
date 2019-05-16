<template>
  <v-container fluid>
    <h2 class="text-xs-left">Key Dates</h2>

    <form @submit.prevent>
      <v-text-field v-model="name" placeholder="Name"/>
      <v-text-field v-model="date" label="date" type="date" placeholder="Event Date"/>

      <v-btn type="submit" @click="addEvent(name, date)">Add Event</v-btn>
    </form>

    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.date | fromNow }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from "moment";
import { eventsCollection } from "../firebaseConfig";

export default {
  name: "KeyDates",
  data() {
    return {
      items: [],
      name: "",
      date: "",
      headers: [
        { text: "Event", value: "name", sortable: false },
        { text: "Date", value: "date" },
        { text: "Countdown", sortable: false }
      ]
    };
  },
  mounted() {
    eventsCollection.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
          name: doc.data().name,
          date: doc.data().date
        };
        this.items.push(data);
      });
    });
  },
  methods: {
    addEvent(name, date) {
      eventsCollection.add({ name, date });
      alert("Success!");
      this.name = "";
      this.date = "";
    },
    deleteEvent(idx) {
      eventsCollection.doc(idx).delete();
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style scoped>
td {
  font-size: 8px;
}
</style>
