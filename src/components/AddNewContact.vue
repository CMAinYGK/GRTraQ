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
        <v-layout row wrap>
          <v-flex xs12 sm8>
            <v-btn @click="plusAddress">Add Address</v-btn>
          </v-flex>
          <v-flex xs6 v-for="(address, index) in addresses" :key="index">
            <v-text-field
              label="Address Type"
              name="addresses[][addressType]"
              v-model="address.addressType"
            ></v-text-field>
            <v-text-field
              label="Street Address"
              prepend-inner-icon="business"
              v-model="address.streetaddress"
              name="addresses[][streetaddress]"
            ></v-text-field>
            <v-text-field
              label="City"
              prepend-inner-icon="pin_drop"
              name="addresses[][city]"
              v-model="address.city"
            ></v-text-field>
            <v-text-field
              label="Province"
              prepend-inner-icon="pin_drop"
              name="addresses[][province]"
              v-model="address.province"
            ></v-text-field>
            <v-text-field
              label="Postal Code"
              name="addresses[][postal]"
              prepend-inner-icon="pin_drop"
              placeholder="A1A 1A1"
              v-model="address.postal"
            ></v-text-field>
            <v-text-field
              label="Phone"
              name="addresses[][phone]"
              placeholder="111-111-1111"
              prepend-inner-icon="contact_phone"
              v-model="address.phone"
            ></v-text-field>
            <v-text-field
              label="E-Mail"
              prepend-inner-icon="contact_mail"
              name="addresses[][email]"
              v-model="address.email"
            ></v-text-field>
            <v-text-field
              label="Cell"
              name="addresses[][cell]"
              placeholder="111-111-1111"
              prepend-inner-icon="stay_primary_portrait"
              v-model="address.cell"
            ></v-text-field>
            <v-btn @click="minusAddress(index)">Remove</v-btn>
          </v-flex>
          <br>
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
import Vue from "vue";

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
      addresses: [],
      address: {
        addressType: "",
        streetaddress: "",
        city: "",
        province: "",
        postal: "",
        phone: "",
        cell: "",
        email: ""
      },
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
    plusAddress() {
      this.addresses.push(Vue.util.extend({}, this.address));
    },
    minusAddress(index) {
      Vue.delete(this.addresses, index);
    },
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
          addresses: this.addresses,
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
