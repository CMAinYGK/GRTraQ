<template>
  <v-container fluid>
    <vue-headful title="Recent Engagements - GRTraQ"/>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Recent Engagements</h1>
      <router-link to="/new-report" tag="span">
        <v-btn>
          <v-icon left>plus_one</v-icon>New Contact Report
        </v-btn>
      </router-link>
      <br>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-sm-right">{{ props.item.date}}</td>
            <td class="text-sm-right">
              <span v-for="(extAttendees, index) in props.item.extAttendees" :key="index">
                {{ props.item.extAttendees[index].name}}
                <br>
              </span>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { testCollection } from "../firebaseConfig";

export default {
  name: "test-reports",
  props: {},
  data() {
    return {
      items: [],
      search: "",
      pagination: {
        sortBy: "date",
        descending: true
      },
      headers: [
        {
          text: "Date",
          align: "right",
          descending: "true",
          value: "date"
        },
        {
          text: "External Contacts",
          align: "right",
          value: "extAttendees"
        }
      ]
    };
  },
  mounted() {
    testCollection
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            extAttendeesIndex: doc.data().extAttendees.length,
            extAttendees: doc.data().extAttendees,
            date: doc.data().date
          };
          this.items.push(data);
        });
      });
  }
};
</script>



