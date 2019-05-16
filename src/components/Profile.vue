<template>
  <v-container fluid>
    <v-flex xs12 sm4 offset-sm4>
      <h1>Profile</h1>
      <v-flex xs12 sm2 offset-sm2></v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import { usersCollection } from "../firebaseConfig";
export default {
  name: "profile",
  data() {
    return {
      items: {},
      userName: "",
      avatar: "",
      isAdmin: false
    };
  },
  // computed: {
  //   email() {
  //     return this.$store.state.user.email;
  //   },
  //   userName() {
  //     return this.$store.state.user.userName;
  //   },
  //   avatar() {
  //     return this.$store.state.user.avatar;
  //   }
  // },
  mounted() {
    usersCollection
      .where("email", "==", this.$store.state.user)
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
  },
  methods: {
    userUpdate() {
      this.$store.dispatch("userUpdate", {
        userName: this.userName,
        avatar: this.avatar,
        isAdmin: this.isAdmin
      });
    }
  }
};
</script>

<style>
</style>
