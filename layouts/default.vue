<template>
  <v-app>
    <socket-comp />
    <nav-comp />
    <v-content>
      <v-dialog :value="dialogShow" max-width="500px" transition="scale-transition" persistent>
        <dialog-comp v-if="dialogShow" :type="dialogData.type" :data="dialogData.data" @close="dialogShow = false"/>
      </v-dialog>
      <nuxt/>
      <div v-for="(item, index) in alert" :key="index" id="alert">
        <alert-comp :alert="item" @close="alert.splice(index,1)" />
      </div>
      <v-dialog persistent width="300px" height="300px" v-model="loading">
        <v-card>
          <v-container fill-height fluid justify-center>
            <div style="text-align: center">
              <v-progress-circular indeterminate size="150" color="black"></v-progress-circular><br><br>
              <h4>Please wait for a moment ..... </h4>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-content>
    <footer-comp />
  </v-app>  
</template>


<script>
/* eslint-disable */
import navigationComp from "@/components/navigation/navigation-comp";
import footerComp from "@/components/footer/footer-comp";
import GET_USERDATA from "@/graphql/user/getmyprofile";
import EventBus from '@/plugins/eventBus'
import GET_ARTWORK_QUERY from '@/graphql/getartworks'
import { CLIENT_ROUTE } from '@/config/apiroutes'
import socketcomp from '@/components/socket/socket'
import AlertComp from '@/components/alert/alert'
import DialogComp from '@/components/dialog/main'
import { PushManager } from '@/helpers/push'

export default {
  components: {
    "nav-comp": navigationComp,
    'alert-comp': AlertComp,
    "footer-comp": footerComp,
    'socket-comp': socketcomp,
    'dialog-comp': DialogComp
  },
  data: () => ({
    profile: {},
    refetch: false,
    alert: [],
    dialogShow: false,
    dialogData: null,
    loading: false
  }),
  created() {
    this.$store.watch(
      state => {
        return this.$store.state.token;
      },
      (newValue, oldValue) => {
        if(newValue === null || newValue === '') {
          this.$store.commit("setToken", localStorage.getItem('token'))
        }
      }
    );
  },
  mounted() {
    if (this.$route.query.auth) {
      if(!localStorage.getItem('token')) {
        localStorage.setItem("token", this.$route.query.auth);
        PushManager(true)
      }      
      this.$apolloHelpers.onLogin(this.$route.query.auth);
      this.$store.commit("setToken", this.$route.query.auth);
    }
    if(!this.$route.query.auth && !localStorage.getItem('token')) {
      location.replace(CLIENT_ROUTE)
    }
    if(localStorage.getItem('token')){
      this.$apolloHelpers.onLogin(localStorage.getItem('token'))
      this.$store.commit("setToken", localStorage.getItem('token'));
    }
    EventBus.$on('updateState',() => {
      console.log('event triggered')
      this.$apollo.queries.userprofile.refetch()
    })
    EventBus.$on('notification', (data) => {
      this.alert.push(data)
    })
    EventBus.$on('dialog', (data) => {
      this.dialogShow = true
      this.dialogData = data
    })
    EventBus.$on('loading', (val) => {
      if(val === null) {
        this.loading = !this.loading
      } else {
        this.loading = val
      }
    })
  },
  watch: {
    getmyprofile: function(val) {
      if (val) {
        const { Model } = val
        this.$store.commit('profile/set', Model.profile)
        this.$store.commit('notification/set', Model.notifications)
        this.$store.commit('authentication/set',Model._id)
      }
    }
  },
  apollo: {
    getmyprofile: {
      query: GET_USERDATA
    }
  },
  methods: {
    setProfile(val) {
      this.$store.dispatch('setBalance',val.balance)
      this.$store.dispatch('setWithdrawals', val.withdrawals)
      this.$store.commit("setProfile", val.profile);
      this.$store.commit("setNotifications", val.notifications)
    }
  }
};
</script>

<style>
  * {
    font-family: "Nunito", sans-serif;
  }
  ._btn {
    text-transform: none;
  }
 #alert {
        position: fixed;
        top: 150px;
        right: 25px;
        height: auto;
    }
    @media screen and (max-width: 770px) {
        #alert {
            width: 98vw;
            right: 0;
        }
    }
</style>
