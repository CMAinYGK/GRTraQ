<template>
  <v-container fluid>
    <vue-headful title="Edit - GRTraQ"/>

    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Edit Contact</h1>
    </v-flex>
    <v-flex xs12 sm8 offset-sm2 mt-3>
      <form>
        <v-text-field label="Full Name" v-model="editUser.name"></v-text-field>
        <v-text-field label="Title" placeholder="title" v-model="editUser.title"></v-text-field>
        <v-text-field label="Department" placeholder="Department" v-model="editUser.department"></v-text-field>
        <br>
        <br>
        <v-flex xs12 sm4 offset-sm4>
          <p>Is this person an elected official?</p>
          <v-radio-group v-model="editUser.isElected" row>
            <v-radio label="Yes" value="Yes"></v-radio>
            <v-radio label="No" value="No"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-text-field
          label="Is this person an alumnus?"
          placeholder="Degree Citation (Leave blank for none)"
          v-model="editUser.alum"
        ></v-text-field>
        <v-select
          :items="selectOptionsOne"
          label="Level of Government?"
          v-model="editUser.levelOfGov"
        ></v-select>
        <v-select :items="selectOptionsTwo" label="Caucus Membership" v-model="editUser.caucus"></v-select>
        <br>
        <h3>Addresses</h3>
        <v-layout row wrap>
          <v-flex xs12 sm8>
            <v-btn @click="plusAddress">Add Address</v-btn>
          </v-flex>
          <v-flex xs6 v-for="(address, index) in editUser.addresses" :key="index">
            <v-text-field
              label="Address Type"
              name="addresses[][addressType]"
              v-model="editUser.address.addressType"
            ></v-text-field>
            <v-text-field
              label="Street Address"
              prepend-inner-icon="business"
              v-model="editUser.address.streetaddress"
              name="addresses[][streetaddress]"
            ></v-text-field>
            <v-text-field
              label="City"
              prepend-inner-icon="pin_drop"
              name="addresses[][city]"
              v-model="editUser.address.city"
            ></v-text-field>
            <v-text-field
              label="Province"
              prepend-inner-icon="pin_drop"
              name="addresses[][province]"
              v-model="editUser.address.province"
            ></v-text-field>
            <v-text-field
              label="Postal Code"
              name="addresses[][postal]"
              prepend-inner-icon="pin_drop"
              placeholder="A1A 1A1"
              v-model="editUser.address.postal"
            ></v-text-field>
            <v-text-field
              label="Phone"
              name="addresses[][phone]"
              placeholder="111-111-1111"
              prepend-inner-icon="contact_phone"
              v-model="editUser.address.phone"
            ></v-text-field>
            <v-text-field
              label="E-Mail"
              prepend-inner-icon="contact_mail"
              name="addresses[][email]"
              v-model="editUser.address.email"
            ></v-text-field>
            <v-text-field
              label="Cell"
              name="addresses[][cell]"
              placeholder="111-111-1111"
              prepend-inner-icon="stay_primary_portrait"
              v-model="editUser.address.cell"
            ></v-text-field>
            <v-btn @click="minusAddress(index)">Remove</v-btn>
          </v-flex>
          <br>
        </v-layout>
        <br>
        <v-text-field
          label="Website"
          prepend-inner-icon="fa-window-maximize"
          v-model="editUser.website"
        ></v-text-field>
        <v-text-field
          label="Facebook"
          prepend-inner-icon="fab fa-facebook-square"
          v-model="editUser.fb"
        ></v-text-field>
        <v-text-field
          label="Twitter"
          prepend-inner-icon="fab fa-twitter-square"
          v-model="editUser.twitter"
        ></v-text-field>
        <v-text-field label="Other" prepend-inner-icon="plus_one" v-model="editUser.other"></v-text-field>
        <br>
        <v-text-field label="Image URL" prepend-inner-icon="camera_enhance" v-model="editUser.img"></v-text-field>
        <br>
        <h3>Biography</h3>
        <v-textarea placeholder="Contact Biography" v-model="editUser.bio"></v-textarea>
        <div id="hidden">
          <v-text-field label="Slug - DO NOT EDIT!!!!!" v-model="editUser.slug"></v-text-field>
        </div>

        <v-flex class="text-xs-center" mt-5>
          <v-btn color="primary" type="submit" @click.prevent="onEdit">Edit Contact</v-btn>
        </v-flex>
      </form>
    </v-flex>
  </v-container>
</template>


<script>
import { peopleCollection } from "../firebaseConfig";
import Vue from "vue";
export default {
  name: "edit",
  data() {
    return {
      items: [],
      editUser: {
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
        slug: ""
      },
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
      ]
    };
  },
  beforeCreate() {
    peopleCollection
      .where("slug", "==", this.$route.params.edit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          (this.editUser.name = doc.data().name),
            (this.editUser.title = doc.data().title),
            (this.editUser.department = doc.data().department),
            (this.editUser.isElected = doc.data().isElected),
            (this.editUser.alum = doc.data().alum),
            (this.editUser.levelOfGov = doc.data().levelOfGov),
            (this.editUser.caucus = doc.data().caucus),
            (this.editUser.addresses = doc.data().addresses),
            (this.editUser.website = doc.data().website),
            (this.editUser.twitter = doc.data().twitter),
            (this.editUser.fb = doc.data().fb),
            (this.editUser.other = doc.data().other),
            (this.editUser.img = doc.data().img),
            (this.editUser.bio = doc.data().bio),
            (this.editUser.slug = doc.data().slug);
        });
      });
  },
  methods: {
    plusAddress() {
      this.editUser.addresses.push(Vue.util.extend({}, this.editUser.address));
    },
    minusAddress(index) {
      Vue.delete(this.editUser.addresses, index);
    },
    onEdit() {
      peopleCollection
        .where("slug", "==", this.$route.params.edit)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              name: this.editUser.name,
              title: this.editUser.title,
              department: this.editUser.department,
              isElected: this.editUser.isElected,
              alum: this.editUser.alum,
              levelOfGov: this.editUser.levelOfGov,
              caucus: this.editUser.caucus,
              addresses: this.editUser.addresses,
              website: this.editUser.website,
              twitter: this.editUser.twitter,
              fb: this.editUser.fb,
              other: this.editUser.other,
              img: this.editUser.img,
              bio: this.editUser.bio,
              slug: this.editUser.slug
            });
          });
        })
        .then(
          user => {
            this.$router.replace("/ext-contacts");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>


<style scoped>
#hidden {
  visibility: hidden;
}
</style>
