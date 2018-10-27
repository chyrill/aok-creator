<template>
    <div></div>
</template>

<script>
/* eslint-disable */
import socket from "socket.io-client"
import { API_ROUTE } from "@/config/apiroutes"
import eventbus from '@/plugins/eventBus'

const io = socket(API_ROUTE)

export default {
    mounted() {
        this.$store.watch(
            state => {
                this.profileId = state.profile._id
            }
        )
        io.on('notification', (data) => {
            if(data.recipientId === this.profileId ) {
                eventbus.$emit('notification', { show: true, message: data.message, title: 'AOK-CREATOR'})
                this.$store.dispatch('addNotification', data)
            }
        })
        eventbus.$on('endauction', (data) => {
            io.emit('endauction', { artworkId: data._id, fullName: data.artist.fullName})
        })
        eventbus.$on('acceptbid', (data) => {
            io.emit('acceptbid', data)
        })
        eventbus.$on('shipping', (data) => {
            io.emit('shipproduct', data)
        })
    },
    data: () => ({
        profileId: null
    })
}
</script>

