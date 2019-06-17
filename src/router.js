import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";

const routerOptions = [
  { path: "/", component: "Landing" },
  { path: "*", component: "NotFound" },
  { path: "/signin", component: "SignIn" },
  { path: "/signup", component: "SignUp" },
  { path: "/password-reset", component: "PasswordReset" },
  { path: "/home", component: "Home", meta: { requiresAuth: true } },
  {
    path: "/reports",
    name: "ViewReports",
    component: "ViewReports",
    meta: { requiresAuth: true }
  },
  {
    path: "/new-report",
    component: "NewReport",
    meta: { requiresAuth: true }
  },
  {
    path: "/ext-contacts",
    component: "ExtContacts",
    meta: { requiresAuth: true }
  },
  {
    path: "/add-contact",
    component: "AddNewContact",
    meta: { requiresAuth: true }
  },
  {
    path: "contact-profile/:person",
    name: "contact-details",
    component: "ContactDetails",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "contact-event/:report",
    name: "report-details",
    component: "ReportDetails",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit/:edit",
    name: "edit",
    component: "EditPerson",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: "Profile",
    meta: {
      requiresAuth: true
    }
  }
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  };
});

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
