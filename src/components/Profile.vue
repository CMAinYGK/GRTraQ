<template>
  <v-container fluid>
    <v-flex xs12 sm4 offset-sm4>
      <h1>Profile</h1>
      <v-flex v-for="(users, idx) in items" :key="idx">
        <p>
          <strong>User Name:</strong>
          {{users.name}}
        </p>
        <p>
          <strong>Title:</strong>
          {{users.title}}
        </p>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import { usersCollection } from "../firebaseConfig";
export default {
  name: "profile",
  data() {
    return {
      items: []
    };
  },
  mounted() {
    usersCollection
      .doc(user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            name: doc.data().name,
            email: doc.data().email,
            avatar: doc.data().avatar,
            isAdmin: doc.data().isAdmin
          };
          this.items.push(data);
        });
      });
  }
};
</script>

<style>
</style>
