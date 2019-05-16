<template>
  <v-container fluid>
    <vue-headful title="External Contacts - GRTraQ"/>
    <v-flex xs12 class="text-xs-center" mt-5>
      <vue-headful title="External Contacts - GRTraQ"/>
      <h1>All Contacts</h1>

      <v-flex xs12 sm4 offset-sm4>
        <v-text-field
          id="search"
          v-model="search"
          prepend-inner-icon="search"
          placeholder="Search by name"
        ></v-text-field>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="filteredList"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-right">
            <router-link
              v-bind:to="{ name: 'contact-details', params: { person: props.item.slug }}"
            >More Info</router-link>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.levelOfGov }}</td>
        </template>
      </v-data-table>
      <br>
      <router-link to="/add-contact" tag="span">
        <v-btn>
          Add New Contact
          <v-icon right>person_add</v-icon>
        </v-btn>
      </router-link>
    </v-flex>
  </v-container>
</template>
  

<script>
import { peopleCollection } from "../firebaseConfig";
export default {
  name: "ext-contacts",
  data() {
    return {
      search: "",
      items: [],
      pagination: {
        sortBy: "levelOfGov"
      },
      selected: [],
      headers: [
        { text: "More Info", value: "slug", align: "right", sortable: false },
        {
          text: "Name",
          align: "center",
          sortable: true
          // value: "name"
        },
        { text: "Title", value: "title", align: "right", sortable: true },
        {
          text: "Level of Government",
          value: "levelOfGov",
          align: "right",
          sortable: true
        }
      ],
      alert: false
    };
  },
  mounted() {
    peopleCollection
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            name: doc.data().name,
            title: doc.data().title,
            department: doc.data().department,
            isElected: doc.data().isElected,
            levelOfGov: doc.data().levelOfGov,
            img: doc.data().img,
            slug: doc.data().slug,
            key: doc.idx
          };
          this.items.push(data);
        });
      });
  },
  computed: {
    filteredList() {
      return this.items.filter(people => {
        return people.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    sortByLast() {}
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>

