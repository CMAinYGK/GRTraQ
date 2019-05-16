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
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:items="props">
            <td>
              <router-link
                class="button is-primary"
                v-bind:to="{ name: 'report-details', params: { report: props.item.slug }}"
              >Details</router-link>
            </td>
            <td class="text-sm-right">{{ props.item.date}}</td>
            <td class="text-sm-right">
              {{ props.item.name3 }}
              <br>
              {{ props.item.name }}
              <br>
              {{ props.item.name2 }}
              <br>
              {{ props.item.name4 }}
            </td>
            <td class="text-sm-right">{{ props.item.selectedType }}</td>
            <td class="text-sm-right">{{ props.item.selectedExt }}</td>
            <td class="text-sm-right">{{ props.item.selectedSF }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>

import { contactsCollection } from '../firebaseConfig';

export default {
  name: "ViewReports",
  props: ["passedName"],
  data() {
    return {
      items: [],
      search: "",
      headers: [
        { text: "More Info", align: "right", sortable: false },
        {
          text: "Date",
          align: "right",
          descending: "true",
          value: "date"
        },
        {
          text: "External Contacts",
          align: "right",
          value: "name, name2, name3, name4"
        },

        { text: "Contact Type", align: "right", value: "selectedType" },
        { text: "Objectives Alignment", align: "right", value: "selectedExt" },
        {
          text: "Strategic Framework Alignment",
          align: "right",
          value: "selectedSF"
        }
      ]
    };
  },
  mounted() {
    contactsCollection
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            name: doc.data().name,
            name2: doc.data().name2,
            name3: doc.data().name3,
            name4: doc.data().name4,
            date: doc.data().date,
            QAttend: doc.data().QAttend,
            selectedType: doc.data().selectedType,
            selectedExt: doc.data().selectedExt,
            selectedSF: doc.data().selectedSF,
            slug: doc.data().slug
          };
          this.items.push(data);
        });
      });
  }
};
</script>



