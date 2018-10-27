<template>
    <div>
        <v-toolbar color="black" dark flat>
            <v-btn flat class="_btn" @click=" $router.push('/')"><img src="/title2.png" width="70px"/> <h3>AOK-Creator</h3></v-btn>
            <v-spacer></v-spacer>           
            <v-btn color="cyan ligthen-2" class="_btn" to="/artworks/add">Sell Artwork</v-btn>
            <v-badge v-model="notify" left color="red" overlap>
                <span slot="badge">{{newNotification}}</span>
                <v-menu dark offset-y nudge-bottom="15%"> 
                    <v-btn icon slot="activator" @click="readNotify"><v-icon>notifications</v-icon></v-btn>
                    <v-list three-line dense>
                        <v-list-tile v-for="(item, index) in notifications.slice(0,5)" :key="index" :to="item.link.url">
                            <v-list-tile-action>
                                <img :src="item.thumbnail" style="width: 50px; height: 50px; object-fit: cover" />
                            </v-list-tile-action>
                            <v-list-tile-content class="pl-2 pr-2">
                                <v-list-tile-sub-title>{{item.message}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>
                                    <elapsed-comp :dateVal="item.dateCreated" />
                                </v-list-tile-action-text>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-badge>
            <v-menu offset-y class="black" dark min-width="250px" :nudge-right="60" nudge-bottom="13px">
                <v-btn icon dark slot="activator"><v-avatar :size="35"><img :src="profile === null ? '/icon_avatar.png': profile.displayPicture"></v-avatar></v-btn>        
                <v-list>
                    <v-list-tile avatar to="/profile">
                        <v-list-tile-avatar>
                            <v-icon>far fa-user-circle</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Profile
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile @click="signout" avatar>
                        <v-list-tile-avatar>
                            <v-icon>fa fa-sign-out-alt</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Sign Out
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

            </v-menu>
        </v-toolbar>
        <v-snackbar :timeout="6000" :color="alert.color" v-model="popAlert" top right>
            {{alert.message}} <v-btn flat dark icon @click="popAlert = !popAlert"><v-icon>{{alert.action}}</v-icon></v-btn>
        </v-snackbar>
    </div>
</template>


<script>
/* eslint-disable */
import EventBus from '@/plugins/eventBus'
import elapsedComp from '@/components/helpers/elapsedtime'
import READ_NOTIF_MUTATION from '@/graphql/notification/readnotification'
import {CLIENT_ROUTE, API_ROUTE} from '@/config/apiroutes'
import {PushManager} from '@/helpers/push'

export default {
    data: () => ({
        profile: null,
        alert: {
            message: '',
            color: '',
            action: ''
        },
        popAlert: false,
        notifications : []
    }),
    created () {
        this.$store.watch(
            state => {
                this.profile = this.$store.state.profile.data
                this.notifications = this.$store.state.notification.list
            }
        )
    },
    mounted () {
        EventBus.$on('alert',(data) => {
            this.alert['message'] = data.message
            this.alert['color'] = data.color
            this.alert['action'] = data.action
            this.popAlert = !this.popAlert
        })
    },
    methods: {
        async signout () {
            let registraion = await navigator.serviceWorker.getRegistration('./push_service.js')
            let subscription = await registraion.pushManager.getSubscription()
            this.unsubscribe(subscription)
        },
        async readNotify () {
            this.$store.commit('notification/read')
            this.$apollo.mutate({
                mutation: READ_NOTIF_MUTATION
            }).then(response => {

            }).catch(err => {
                alert(err)
            })
           
        },
        unsubscribe(data) {
            fetch(API_ROUTE + '/unsubscribe', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                localStorage.clear()
                location.replace(CLIENT_ROUTE)
            })
            .catch(err => { 
                alert(err)
            })
        }
    },
    computed: {
        newNotification () {
            var value = 0 
            this.notifications.forEach(element => {
                if(element.new) {
                    value ++
                }
            })
            return value
        },
        notify () {
            return this.newNotification > 0 ? true : false
        }  
    },
    components: {
        'elapsed-comp': elapsedComp
    }
}
</script>

<style scoped>
    ._btn {
        text-transform: none;
    }
    a {
        text-decoration: none;
        color: inherit
    }
</style>

