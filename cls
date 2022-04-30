warning: LF will be replaced by CRLF in client/src/components/Home/Sidebar.vue.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in client/src/router/index.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in client/src/store/index.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in client/src/views/HomeView.vue.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in server/node_modules/.package-lock.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in server/package-lock.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in server/package.json.
The file will have its original line endings in your working directory
[1mdiff --git a/client/src/api/index.js b/client/src/api/index.js[m
[1mindex d6cec31..e75e267 100644[m
[1m--- a/client/src/api/index.js[m
[1m+++ b/client/src/api/index.js[m
[36m@@ -1,8 +1,13 @@[m
[31m-const axios = require('axios');[m
[32m+[m[32mimport { mapActions, mapGetters } from 'vuex';[m
 [m
[32m+[m[32mconst axios = require('axios');[m
[32m+[m[32mconst notification = require('../utils/notification.js');[m
 const BASE_URL = "http://localhost:3000";[m
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';[m
[31m-[m
[32m+[m[32mexport const setAuthInHeader = token => {[m
[32m+[m[32m    axios.defaults.headers.common['Authorization'] = `Bearer ${token ?? localStorage.getItem('token')}`[m
[32m+[m[32m}[m
[32m+[m[32msetAuthInHeader()[m
 [m
 const request = (method, path, data) => {[m
     return axios({[m
[36m@@ -10,7 +15,12 @@[m [mconst request = (method, path, data) => {[m
         url: BASE_URL + path,[m
         data[m
     })[m
[31m-        .then(result => result.data)[m
[32m+[m[32m        .then(result => {[m
[32m+[m[32m            let { success, message } = result.data;[m
[32m+[m[32m            notification.default(message, success);[m
[32m+[m[32m            if (!success) return[m
[32m+[m[32m            return result.data;[m
[32m+[m[32m        })[m
         .catch(result => {[m
             console.log(result)[m
             throw result.response[m
[36m@@ -23,7 +33,20 @@[m [mexport const auth = {[m
         return request('POST', '/register', { NAME, LASTNAME, EMAIL, PASSWORD })[m
     },[m
     login(EMAIL, PASSWORD) {[m
[31m-        return request('POST', '/login', {EMAIL, PASSWORD })[m
[32m+[m[32m        return request('POST', '/login', { EMAIL, PASSWORD })[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32mexport const feedback = {[m
[32m+[m[32m    create(data) {[m
[32m+[m[32m        return request("POST", "/feedback/create", data)[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const user = {[m
[32m+[m[32m    get() {[m
[32m+[m[32m        return request("POST", "/authuser")[m
     }[m
 }[m
 [m
[1mdiff --git a/client/src/assets/common.less b/client/src/assets/common.less[m
[1mindex 841b28d..05bb59b 100644[m
[1m--- a/client/src/assets/common.less[m
[1m+++ b/client/src/assets/common.less[m
[36m@@ -46,7 +46,7 @@[m [mp {[m
 [m
 .notification {[m
   position: fixed;[m
[31m-  --y: -100%;[m
[32m+[m[32m  --y: -120%;[m
   transform: translate(-50%, var(--y));[m
   top: 0;[m
   left: 50%;[m
[1mdiff --git a/client/src/components/Home/Sidebar.vue b/client/src/components/Home/Sidebar.vue[m
[1mindex b14f370..ae0a729 100644[m
[1m--- a/client/src/components/Home/Sidebar.vue[m
[1m+++ b/client/src/components/Home/Sidebar.vue[m
[36m@@ -1,6 +1,10 @@[m
 <template lang="pug">[m
  [m
 .sidebar[m
[32m+[m[32m  .sidebar__cart.zero(v-if="isLogin")[m
[32m+[m[32m    router-link(to="/account") My Account[m
[32m+[m[32m    a(href="/myfeedbacks") My Feedbacks[m
[32m+[m[32m    a(href="/logout" @click="logout($event)") Log out[m
   .sidebar__cart.one[m
     h2 Frontend Mentor[m
     p Feedback Board[m
[36m@@ -37,12 +41,31 @@[m [mexport default {[m
   props: {[m
     msg: String,[m
   },[m
[32m+[m[32m  methods: {[m
[32m+[m[32m    logout(e) {[m
[32m+[m[32m      e.preventDefault();[m
[32m+[m[32m      this.$store.dispatch("LOGOUT");[m
[32m+[m[32m      this.isLogin = false;[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
[32m+[m[32m  data() {[m
[32m+[m[32m    return {[m
[32m+[m[32m      isLogin: this.$store.getters.isAuth,[m
[32m+[m[32m    };[m
[32m+[m[32m  },[m
 };[m
 </script>[m
 [m
 <!-- Add "scoped" attribute to limit CSS to this component only -->[m
 <style scoped lang="less">[m
 .sidebar {[m
[32m+[m[32m  a {[m
[32m+[m[32m    display: block;[m
[32m+[m[32m    margin: 15px 0;[m
[32m+[m[32m    &:hover {[m
[32m+[m[32m      text-decoration: underline;[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
   .sidebar__cart {[m
     width: 280px;[m
     min-height: 150px;[m
[1mdiff --git a/client/src/router/index.js b/client/src/router/index.js[m
[1mindex 25e4b01..64a6a9c 100644[m
[1m--- a/client/src/router/index.js[m
[1m+++ b/client/src/router/index.js[m
[36m@@ -1,5 +1,12 @@[m
 import { createRouter, createWebHistory } from 'vue-router'[m
 import HomeView from '../views/HomeView.vue'[m
[32m+[m[32mimport store from '../store'[m
[32m+[m
[32m+[m[32mconst requireAuth = (to, from, next) => {[m
[32m+[m[32m  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;[m
[32m+[m[32m  store.getters.isAuth ? next() : next(loginPath)[m
[32m+[m[32m}[m
[32m+[m
 [m
 const routes = [[m
   {[m
[36m@@ -10,11 +17,13 @@[m [mconst routes = [[m
   {[m
     path: '/create',[m
     name: 'Create Feedback',[m
[32m+[m[32m    beforeEnter: requireAuth,[m
     component: () => import('../views/CreateFeedback.vue')[m
   },[m
   {[m
     path: '/update/:id',[m
     name: 'Update Feedback',[m
[32m+[m[32m    beforeEnter: requireAuth,[m
     component: () => import('../views/CreateFeedback.vue')[m
   },[m
   {[m
[36m@@ -31,6 +40,12 @@[m [mconst routes = [[m
     path: '/login',[m
     name: 'Login',[m
     component: () => import('../views/Login.vue')[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    path: '/account',[m
[32m+[m[32m    name: 'Account',[m
[32m+[m[32m    beforeEnter: requireAuth,[m
[32m+[m[32m    component: () => import('../views/Account.vue')[m
   }[m
 ][m
 [m
[1mdiff --git a/client/src/store/index.js b/client/src/store/index.js[m
[1mindex 6fd9ff9..ed9ebcf 100644[m
[1m--- a/client/src/store/index.js[m
[1m+++ b/client/src/store/index.js[m
[36m@@ -6,9 +6,14 @@[m [mexport default createStore({[m
   state: {[m
     feedbacks: [],[m
     feedback: {},[m
[31m-    rgdata: {}[m
[32m+[m[32m    rgdata: {},[m
[32m+[m[32m    user: {},[m
[32m+[m[32m    token: null[m
   },[m
   getters: {[m
[32m+[m[32m    isAuth(state) {[m
[32m+[m[32m      return !!(state.token ?? localStorage.getItem("token"))[m
[32m+[m[32m    }[m
   },[m
   mutations: {[m
     SET_FEEDBACKS(state, feedbacks) {[m
[36m@@ -19,6 +24,21 @@[m [mexport default createStore({[m
     },[m
     COMMIT_REGISTER(state, data) {[m
       state.rgdata = data[m
[32m+[m[32m    },[m
[32m+[m[32m    LOGIN(state, accessToken) {[m
[32m+[m[32m      if (!accessToken) return[m
[32m+[m[32m      state.token = accessToken[m
[32m+[m[32m      localStorage.setItem('token', accessToken);[m
[32m+[m[32m      api.setAuthInHeader(accessToken);[m
[32m+[m[32m    },[m
[32m+[m[32m    LOGOUT(state) {[m
[32m+[m[32m      state.token = null;[m
[32m+[m[32m      delete localStorage.token[m
[32m+[m[32m      api.setAuthInHeader(null);[m
[32m+[m[32m    },[m
[32m+[m[32m    SET_AUTH_USER(state, data) {[m
[32m+[m[32m      if (!data) return[m
[32m+[m[32m      state.user = data[m
     }[m
   },[m
   actions: {[m
[36m@@ -26,20 +46,36 @@[m [mexport default createStore({[m
       this.commit('SET_FEEDBACKS', feedBacks)[m
     },[m
 [m
[32m+[m[32m    //parametleri obje içinde gönder data{}[m
     REGISTER({ state }, { NAME, LASTNAME, EMAIL, PASSWORD }) {[m
[31m-      return api.auth.register(NAME, LASTNAME, EMAIL, PASSWORD)[m
[32m+[m[32m      return api.auth.register(NAME, LASTNAME, EMAIL, PASSWORD).then(() => this.dispatch("LOGIN", { EMAIL, PASSWORD }))[m
     },[m
 [m
[31m-    LOGIN({state},{EMAIL,PASSWORD}){[m
[31m-      return api.auth.login(EMAIL,PASSWORD)[m
[32m+[m[32m    LOGIN({ commit }, { EMAIL, PASSWORD }) {[m
[32m+[m[32m      return api.auth.login(EMAIL, PASSWORD).then(({ accessToken }) => commit('LOGIN', accessToken))[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    LOGOUT({ commit }) {[m
[32m+[m[32m      commit('LOGOUT')[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    FETCH_USER({ commit }) {[m
[32m+[m[32m      return api.user.get().then(user => commit('SET_AUTH_USER', user));[m
     },[m
 [m
     FETCH_FEEDBACK(state, feedback_id) {[m
       this.dispatch("FETCH_FEEDBACKS")[m
       let currentFeedback = this.state.feedbacks.find(f => f.id == feedback_id);[m
       this.commit('SET_FEEDBACK', currentFeedback)[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    CREATE_FEEDBACK({ commit }, data) {[m
[32m+[m[32m      return api.feedback.create(data)[m
     }[m
[32m+[m
[32m+[m
   },[m
   modules: {[m
[32m+[m
   }[m
 })[m
[1mdiff --git a/client/src/utils/notification.js b/client/src/utils/notification.js[m
[1mindex d0f0da5..71b278d 100644[m
[1m--- a/client/src/utils/notification.js[m
[1m+++ b/client/src/utils/notification.js[m
[36m@@ -1,4 +1,4 @@[m
[31m-export default function notification(message, type) {[m
[32m+[m[32mexport default function notification(message, success) {[m
     try {[m
         const CLASS_NAME = "notification";[m
 [m
[36m@@ -7,7 +7,7 @@[m [mexport default function notification(message, type) {[m
         if (document.querySelector(`.${CLASS_NAME}[show]`)) return[m
         let notification = document.createElement("div");[m
         notification.innerText = message;[m
[31m-        notification.classList.add(`${CLASS_NAME}`, type);[m
[32m+[m[32m        notification.classList.add(`${CLASS_NAME}`, success ? "success" : "error");[m
         document.body.appendChild(notification);[m
 [m
         setTimeout(() => {[m
[1mdiff --git a/client/src/views/CreateFeedback.vue b/client/src/views/CreateFeedback.vue[m
[1mindex 9af7776..30e319f 100644[m
[1m--- a/client/src/views/CreateFeedback.vue[m
[1m+++ b/client/src/views/CreateFeedback.vue[m
[36m@@ -7,23 +7,23 @@[m
       >[m
     </div>[m
 [m
[31m-    <form action="">[m
[32m+[m[32m    <div action>[m
       <div v-if="!isUpdate" class="icon">&plus;</div>[m
       <div v-else class="icon">[m
         <img src="@/assets/document-editor.png" alt="" />[m
       </div>[m
[31m-      <h2 v-if="isUpdate" class="form__title">Update "{{ feedback.title }}"</h2>[m
[32m+[m[32m      <h2 v-if="isUpdate" class="form__title">Update "{{ feedback.TITLE }}"</h2>[m
       <h2 v-else class="form__title">Create New FeedBack</h2>[m
       <div class="fields">[m
         <div class="field">[m
           <label for="">Feedback Title</label>[m
           <small>Add a short, descriptiove headline</small>[m
[31m-          <input type="text" :value="feedback.title" />[m
[32m+[m[32m          <input type="text" v-model="feedback.TITLE" />[m
         </div>[m
         <div class="field">[m
           <label for="">Category</label>[m
           <small>Choose a category for your feedback</small>[m
[31m-          <select name="" id="" va v-model="feedback.category">[m
[32m+[m[32m          <select name="" id="" v-model="feedback.CATEGORY">[m
             <option value="Feature">Feature</option>[m
             <option value="Live">Live</option>[m
             <option value="Enhancement">Live</option>[m
[36m@@ -35,17 +35,25 @@[m
             >Include any specific, comments on what should be improved, added,[m
             etc.</small[m
           >[m
[31m-          <textarea name="" id="" cols="30" rows="10" v-model="feedback.description"></textarea>[m
[32m+[m[32m          <textarea[m
[32m+[m[32m            name=""[m
[32m+[m[32m            id=""[m
[32m+[m[32m            cols="30"[m
[32m+[m[32m            rows="10"[m
[32m+[m[32m            v-model="feedback.DESCRIPTION"[m
[32m+[m[32m          ></textarea>[m
         </div>[m
       </div>[m
       <div class="buttons">[m
         <router-link to="/" class="cancel">Cancel</router-link>[m
[31m-        <button class="submit">Submit Feedback</button>[m
[32m+[m[32m        <button @click="addFeedback()" class="submit">Submit Feedback</button>[m
       </div>[m
[31m-    </form>[m
[32m+[m[32m    </div>[m
   </div>[m
 </template>[m
 <script>[m
[32m+[m[32mimport {mapActions} from "vuex";[m
[32m+[m
 export default {[m
   name: "Create Feed Back",[m
   data() {[m
[36m@@ -54,13 +62,19 @@[m [mexport default {[m
       feedback: {},[m
     };[m
   },[m
[32m+[m[32m  methods: {[m
[32m+[m[32m    ...mapActions(["CREATE_FEEDBACK"]),[m
[32m+[m[32m    addFeedback() {[m
[32m+[m[32m      this.CREATE_FEEDBACK(this.feedback);[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
   mounted() {[m
[31m-    this.isUpdate = this.$route.path.includes("update") ? true : false;[m
[31m-    let {id} = this.$route.params;[m
[31m-    if (id) {[m
[31m-      this.$store.dispatch("FETCH_FEEDBACK", Number(id));[m
[31m-      this.feedback = this.$store.state.feedback;[m
[31m-    }[m
[32m+[m[32m    // this.isUpdate = this.$route.path.includes("update") ? true : false;[m
[32m+[m[32m    // let {id} = this.$route.params;[m
[32m+[m[32m    // if (id) {[m
[32m+[m[32m    //   this.$store.dispatch("FETCH_FEEDBACK", Number(id));[m
[32m+[m[32m    //   this.feedback = this.$store.state.feedback;[m
[32m+[m[32m    // }[m
   },[m
 };[m
 </script>[m
[36m@@ -85,7 +99,7 @@[m [mexport default {[m
   margin: auto;[m
   display: block;[m
 }[m
[31m-form {[m
[32m+[m[32mdiv[action] {[m
   background: #fff;[m
   padding: 3rem 2.5rem;[m
   position: relative;[m
[1mdiff --git a/client/src/views/HomeView.vue b/client/src/views/HomeView.vue[m
[1mindex 156e468..4612aea 100644[m
[1m--- a/client/src/views/HomeView.vue[m
[1m+++ b/client/src/views/HomeView.vue[m
[36m@@ -3,6 +3,7 @@[m
     <Sidebar />[m
     <div class="content">[m
       <AddFeedBack />[m
[32m+[m
       <template v-for="feedback in feedbacks" v-bind:key="feedback.title">[m
         <Feedback @click="feedbackDetail(feedback.id)" :feedback="feedback" />[m
       </template>[m
[1mdiff --git a/client/src/views/Login.vue b/client/src/views/Login.vue[m
[1mindex 6cbbc96..ec45b45 100644[m
[1m--- a/client/src/views/Login.vue[m
[1m+++ b/client/src/views/Login.vue[m
[36m@@ -20,14 +20,13 @@[m
           </div>[m
         </div>[m
       </div>[m
[32m+[m[32m      {{ rPath }}[m
       <div class="buttons">[m
         <router-link to="/" class="cancel">Log in via Google</router-link>[m
         <button @click="login()" class="submit" type="button">Login</button>[m
       </div>[m
     </form>[m
   </div>[m
[31m-[m
[31m-  <pre>{{ result }}</pre>[m
 </template>[m
 <script>[m
 import {mapActions} from "vuex";[m
[36m@@ -35,20 +34,21 @@[m [mexport default {[m
   name: "Login",[m
   data() {[m
     return {[m
[31m-      EMAIL: "",[m
[31m-      PASSWORD: "",[m
[31m-      result: {data: "data"},[m
[32m+[m[32m      EMAIL: "yasin@limunis.com",[m
[32m+[m[32m      PASSWORD: "selam",[m
[32m+[m[32m      rPath: "/create",[m
     };[m
   },[m
   methods: {[m
     ...mapActions(["LOGIN"]),[m
     login() {[m
       let {NAME, LASTNAME, EMAIL, PASSWORD} = this;[m
[31m-      this.LOGIN({EMAIL, PASSWORD}).then((result) =>[m
[31m-        $notification(result.message, result.success ? "success" : "error")[m
[31m-      );[m
[32m+[m[32m      this.LOGIN({EMAIL, PASSWORD}).then((a) => this.$router.push(this.rPath));[m
     },[m
   },[m
[32m+[m[32m  created() {[m
[32m+[m[32m    this.rPath = this.$route.query.rPath || "/";[m
[32m+[m[32m  },[m
 };[m
 </script>[m
 <style lang="less" scoped>[m
[1mdiff --git a/client/src/views/Register.vue b/client/src/views/Register.vue[m
[1mindex 81c4f3e..df45d81 100644[m
[1m--- a/client/src/views/Register.vue[m
[1m+++ b/client/src/views/Register.vue[m
[36m@@ -48,8 +48,8 @@[m [mexport default {[m
     ...mapActions(["REGISTER"]),[m
     register() {[m
       let {NAME, LASTNAME, EMAIL, PASSWORD} = this;[m
[31m-      this.REGISTER({NAME, LASTNAME, EMAIL, PASSWORD}).then((a) =>[m
[31m-        alert(JSON.stringify(a))[m
[32m+[m[32m      this.REGISTER({NAME, LASTNAME, EMAIL, PASSWORD}).then(() =>[m
[32m+[m[32m        this.$router.push("/")[m
       );[m
     },[m
   },[m
[1mdiff --git a/server/api/auth.js b/server/api/auth.js[m
[1mindex bf977e8..008448d 100644[m
[1m--- a/server/api/auth.js[m
[1m+++ b/server/api/auth.js[m
[36m@@ -1,26 +1,45 @@[m
 [m
 const database = require("../database/connection");[m
 database.connect();[m
[32m+[m[32mconst jwt = require("jsonwebtoken");[m
 [m
 [m
 const { Identity } = require("../database/models");[m
 [m
 const register = (req, res, next) => {[m
[31m-    console.log(req.body);[m
[31m-    if (req.body) {[m
[32m+[m[32m    if (req.body && !!req.body.EMAIL) {[m
         req.body.USERNAME = req.body.EMAIL.split("@").shift();[m
         Identity.create(req.body);[m
[32m+[m[32m        res.json({ succes: true, message: "Successfuly" });[m
     }[m
[31m-    res.json({ succes: true, message: "Successfuly" });[m
 }[m
 [m
 const login = (req, res, next) => {[m
     Identity.findOne(req.body, (err, usr) => {[m
[31m-        res.json(usr ? { success: true, message: "Successfully logged in" } : { success: false, message: "Not found" })[m
[32m+[m[32m        if (usr) {[m
[32m+[m[32m            const token = jwt.sign({ _id: usr._id }, 'yasin');[m
[32m+[m[32m            return res.header('Authorization', token).json({ success: true, message: "Successfully logged in", accessToken: token })[m
[32m+[m[32m        }[m
[32m+[m[32m        else {[m
[32m+[m[32m            return res.json({ success: false, message: "Not found" })[m
[32m+[m[32m        }[m
     });[m
 };[m
[32m+[m[32mconst getAuthUser = (req, res) => {[m
[32m+[m[32m    Identity.findOne({ _id: req.userId }, (err, usr) => {[m
[32m+[m[32m        if (usr) {[m
[32m+[m[32m            let { EMAIL, USERNAME, LASTNAME, NAME } = usr;[m
[32m+[m[32m            return res.json({ success: true, message: "Success", data: { EMAIL, USERNAME, LASTNAME, NAME } })[m
[32m+[m[32m        }[m
[32m+[m[32m        else {[m
[32m+[m[32m            return res.json({ succes: false, message: "Not found" })[m
[32m+[m[32m        }[m
[32m+[m[32m    });[m
[32m+[m[32m};[m
[32m+[m
 [m
 module.exports = {[m
     register,[m
[31m-    login[m
[32m+[m[32m    login,[m
[32m+[m[32m    getAuthUser[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/server/app.js b/server/app.js[m
[1mindex 25e2441..4797fc5 100644[m
[1m--- a/server/app.js[m
[1m+++ b/server/app.js[m
[36m@@ -1,6 +1,8 @@[m
 const express = require('express');[m
 const cors = require('cors');[m
 const auth = require('./api/auth');[m
[32m+[m[32mconst feedback = require('./api/feedback');[m
[32m+[m[32mconst verifyToken = require('./middleware/verifytoken.js');[m
 [m
 const app = express();[m
 app.use(cors())[m
[36m@@ -8,10 +10,16 @@[m [mapp.use(express.json());[m
 [m
 [m
 [m
[31m-app.get('/', (req, res) => {[m
[31m-    res.json({ message: "Lütfen Başar Artık" })[m
[31m-})[m
 app.post('/login', auth.login)[m
[32m+[m
[32m+[m[32mapp.get('/', verifyToken, (req, res) => {[m
[32m+[m[32m    res.json({ message: "Hi there", as: `başarılı id'niz ${req.userId}` })[m
[32m+[m[32m})[m
[32m+[m
[32m+[m[32mapp.post('/authuser', verifyToken, auth.getAuthUser)[m
[32m+[m
[32m+[m[32mapp.post('/feedback/create', verifyToken, feedback.create)[m
[32m+[m
 app.post('/register', auth.register)[m
 app.listen(3000, function () {[m
     console.log("3000 de ayağa kalktı", "http://localhost:3000");[m
[1mdiff --git a/server/database/models.js b/server/database/models.js[m
[1mindex 76426b4..a9e363c 100644[m
[1m--- a/server/database/models.js[m
[1m+++ b/server/database/models.js[m
[36m@@ -5,13 +5,23 @@[m [mconst Schema = mongoose.Schema;[m
 [m
 //TODO[m
 //-- Validations , virtuals, utils func.[m
[31m-var Identity =  mongoose.model("Identity", new Schema({[m
[31m-    NAME:String,[m
[31m-    LASTNAME:String,[m
[31m-    USERNAME:String,[m
[31m-    EMAIL:String,[m
[31m-    PASSWORD:String[m
[32m+[m[32mvar Identity = mongoose.model("Identity", new Schema({[m
[32m+[m[32m    NAME: String,[m
[32m+[m[32m    LASTNAME: String,[m
[32m+[m[32m    USERNAME: String,[m
[32m+[m[32m    EMAIL: String,[m
[32m+[m[32m    PASSWORD: String,[m
[32m+[m[32m    USERID: String[m
 }))[m
 [m
[32m+[m[32mvar Feedback = mongoose.model("Feedback", new Schema({[m
[32m+[m[32m    TITLE: String,[m
[32m+[m[32m    CATEGORY: String,[m
[32m+[m[32m    DETAIL: String,[m
[32m+[m[32m    VOTE: String,[m
[32m+[m[32m    USERID: String[m
[32m+[m[32m}))[m
[32m+[m
[32m+[m
 [m
[31m-module.exports = {Identity};[m
\ No newline at end of file[m
[32m+[m[32mmodule.exports = { Identity, Feedback };[m
\ No newline at end of file[m
[1mdiff --git a/server/node_modules/.package-lock.json b/server/node_modules/.package-lock.json[m
[1mindex cb2dc91..5264133 100644[m
[1m--- a/server/node_modules/.package-lock.json[m
[1m+++ b/server/node_modules/.package-lock.json[m
[36m@@ -245,6 +245,11 @@[m
         "ieee754": "^1.1.13"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/buffer-equal-constant-time": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-+OcRMvf/5uAaXJaXpMbz5I1cyBk="[m
[32m+[m[32m    },[m
     "node_modules/bytes": {[m
       "version": "3.1.2",[m
       "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",[m
[36m@@ -566,6 +571,14 @@[m
       "integrity": "sha1-7gHdHKwO08vH/b6jfcCo8c4ALOI=",[m
       "dev": true[m
     },[m
[32m+[m[32m    "node_modules/ecdsa-sig-formatter": {[m
[32m+[m[32m      "version": "1.0.11",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",[m
[32m+[m[32m      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "safe-buffer": "^5.0.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/ee-first": {[m
       "version": "1.1.1",[m
       "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",[m
[36m@@ -1015,6 +1028,51 @@[m
       "integrity": "sha1-Wx85evx11ne96Lz8Dkfh+aPZqJg=",[m
       "dev": true[m
     },[m
[32m+[m[32m    "node_modules/jsonwebtoken": {[m
[32m+[m[32m      "version": "8.5.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-8.5.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-XjwVfRS6jTMsqYs0EsuJ4LGxXV14zQybNd4L2r0UvbVnSF9Af8x7p5MzbJ90Ioz/9TI41/hTCvznF/loiSzn8w==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "jws": "^3.2.2",[m
[32m+[m[32m        "lodash.includes": "^4.3.0",[m
[32m+[m[32m        "lodash.isboolean": "^3.0.3",[m
[32m+[m[32m        "lodash.isinteger": "^4.0.4",[m
[32m+[m[32m        "lodash.isnumber": "^3.0.3",[m
[32m+[m[32m        "lodash.isplainobject": "^4.0.6",[m
[32m+[m[32m        "lodash.isstring": "^4.0.1",[m
[32m+[m[32m        "lodash.once": "^4.0.0",[m
[32m+[m[32m        "ms": "^2.1.1",[m
[32m+[m[32m        "semver": "^5.6.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=4",[m
[32m+[m[32m        "npm": ">=1.4.28"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/jsonwebtoken/node_modules/ms": {[m
[32m+[m[32m      "version": "2.1.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/jwa": {[m
[32m+[m[32m      "version": "1.4.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[