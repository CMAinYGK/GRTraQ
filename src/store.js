import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import router from "@/router";
import { currentUser } from "./firebaseConfig";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    appTitle: "GRTraQ",
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    userSignUp({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit("setUser", { email: firebaseUser.user.email });
          commit("setLoading", false);
          router.push("/home");
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .set({
              currentUser
            });
        })
        .catch(error => {
          commit("setError", error.message);
          commit("setLoading", false);
        });
    },
    userSignIn({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit("setUser", { email: firebaseUser.email });
          commit("setLoading", false);
          commit("setError", null);
          router.push("/home");
        })
        .catch(error => {
          commit("setError", error.message);
          commit("setLoading", false);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { email: payload.email });
    },
    userUpdate({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .currentUser.updateProfile({
          userName: payload.userName,
          avatar: payload.avatar,
          isAdmin: payload.isAdmin
        })
        .catch(error => {
          commit("setError", error.message);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
});
