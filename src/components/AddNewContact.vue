<template>
  <v-container fluid>
    <vue-headful title="New Contact - GRTraQ"/>
    <v-flex>
      <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Add New Contact</h1>
    </v-flex>
    <v-flex xs12 sm8 offset-sm2 mt-3>
      <form @submit.prevent="addNewContact">
        <v-text-field label="Full Name" placeholder="Name" v-model="name"></v-text-field>
        <v-text-field label="Title" placeholder="Title" v-model="title"></v-text-field>
        <v-text-field label="Department" placeholder="Department" v-model="department"></v-text-field>
        <br>
        <v-flex xs12 sm4 offset-sm4>
          <p>Is this person an elected official?</p>
          <v-radio-group v-model="isElected" row>
            <v-radio label="Yes" value="Yes"></v-radio>
            <v-radio label="No" value="No"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-text-field
          label="Is this person an alumnus?"
          placeholder="Degree Citation (Leave blank for none)"
          v-model="alum"
        ></v-text-field>
        <v-select :items="selectOptionsOne" label="Level of Government?" v-model="levelOfGov"></v-select>
        <v-select :items="selectOptionsTwo" label="Caucus Membership" v-model="caucus"></v-select>
        <br>
        <h3>Addresses</h3>
        <v-layout flex justify-space-between>
          <v-flex xs12 sm6>
            <v-text-field label="Address Type" v-model="addressType"></v-text-field>
            <v-text-field
              label="Street Address"
              prepend-inner-icon="business"
              v-model="streetaddress"
            ></v-text-field>
            <v-text-field label="City" prepend-inner-icon="pin_drop" v-model="city"></v-text-field>
            <v-text-field label="Province" prepend-inner-icon="pin_drop" v-model="province"></v-text-field>
            <v-text-field
              label="Postal Code"
              prepend-inner-icon="pin_drop"
              placeholder="A1A 1A1"
              v-model="postal"
            ></v-text-field>
            <v-text-field
              label="Phone"
              placeholder="111-111-1111"
              prepend-inner-icon="contact_phone"
              v-model="phone"
            ></v-text-field>
            <v-text-field label="E-Mail" prepend-inner-icon="contact_mail" v-model="email"></v-text-field>
            <v-text-field
              label="Cell"
              placeholder="111-111-1111"
              prepend-inner-icon="stay_primary_portrait"
              v-model="cell"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 offset-xs1>
            <v-text-field label="Second Address Type" v-model="addressType2"></v-text-field>
            <v-text-field
              label="Street Address"
              prepend-inner-icon="business"
              v-model="streetaddress2"
            ></v-text-field>
            <v-text-field label="City" prepend-inner-icon="pin_drop" v-model="city2"></v-text-field>
            <v-text-field label="Province" prepend-inner-icon="pin_drop" v-model="province2"></v-text-field>
            <v-text-field
              label="Postal Code"
              prepend-inner-icon="pin_drop"
              placeholder="A1A 1A1"
              v-model="postal2"
            ></v-text-field>
            <v-text-field
              label="Phone"
              placeholder="111-111-1111"
              prepend-inner-icon="contact_phone"
              v-model="phone2"
            ></v-text-field>
            <v-text-field label="E-Mail" prepend-inner-icon="contact_mail" v-model="email2"></v-text-field>
          </v-flex>
        </v-layout>
        <br>
        <v-text-field label="Website" prepend-inner-icon="fa-window-maximize" v-model="website"></v-text-field>
        <v-text-field label="Facebook" prepend-inner-icon="fab fa-facebook-square" v-model="fb"></v-text-field>
        <v-text-field label="Twitter" prepend-inner-icon="fab fa-twitter-square" v-model="twitter"></v-text-field>
        <v-text-field label="Other" prepend-inner-icon="plus_one" v-model="other"></v-text-field>
        <br>
        <v-text-field label="Image URL" prepend-inner-icon="camera_enhance" v-model="img"></v-text-field>
        <br>
        <h3>Biography</h3>
        <v-textarea placeholder="Contact Biography" v-model="bio"></v-textarea>
        <v-flex class="text-xs-center" mt-5>
          <v-btn color="primary" type="submit" :disabled="loading">Add Contact</v-btn>
        </v-flex>
      </form>
    </v-flex>
  </v-container>
</template>

<script>
import { peopleCollection } from "../firebaseConfig";

export default {
  name: "new-contact",
  data() {
    return {
      name: "",
      title: "",
      department: "",
      isElected: "",
      alum: "",
      levelOfGov: "",
      caucus: "",
      addressType: "",
      streetaddress: "",
      city: "",
      province: "",
      postal: "",
      phone: "",
      cell: "",
      email: "",
      addressType2: "",
      streetaddress2: "",
      city2: "",
      province2: "",
      postal2: "",
      phone2: "",
      email2: "",
      website: "",
      twitter: "",
      fb: "",
      other: "",
      bio: "",
      img: "",
      slug: "",
      selectOptionsOne: ["Federal", "Ontario", "Municipal", "Other/NA"],
      selectOptionsTwo: [
        "Fed - LPC",
        "Fed - CPC",
        "Fed - NDP",
        "Fed - GRN",
        "Fed - PPL",
        "Fed - Other/Ind.",
        "Fed - PubSvc",
        "Prov - PCPO",
        "Prov - LPO",
        "Prov - ONDP",
        "Prob - OGrn",
        "Prov - Ind",
        "Prov - PubSvc",
        "Muni - Non-Partisan",
        "Other"
      ],
      alert: false
    };
  },
  methods: {
    addNewContact() {
      peopleCollection
        .add({
          name: this.name,
          title: this.title,
          department: this.department,
          isElected: this.isElected,
          alum: this.alum,
          levelOfGov: this.levelOfGov,
          caucus: this.caucus,
          addressType: this.addressType,
          streetaddress: this.streetaddress,
          city: this.city,
          province: this.province,
          postal: this.postal,
          phone: this.phone,
          cell: this.cell,
          email: this.email,
          addressType2: this.addressType2,
          streetaddress2: this.streetaddress2,
          city2: this.city2,
          province2: this.province2,
          postal2: this.postal2,
          phone2: this.phone2,
          email2: this.email2,
          website: this.website,
          twitter: this.twitter,
          fb: this.fb,
          other: this.other,
          img: this.img,
          bio: this.bio,
          slug: this.generateUUID()
        })
        .then(
          user => {
            this.$router.replace("/ext-contacts");
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
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null);
      }
    }
  }
};
</script>

<style>
</style>
