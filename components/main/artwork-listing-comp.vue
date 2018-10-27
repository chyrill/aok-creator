<template>
    <div class="pt-2">
        <div v-if="!show" class="pa-5">
            <v-container fluid fill-height justify-center>
                <div style="text-align: center">
                    <v-icon size="150px">fas fa-box-open</v-icon>
                    <h3>No artworks found.</h3>
                </div>
            </v-container>
        </div>
        <div v-else v-for="(item, index) in artworks" :key="index">
            <artwork-list-item-comp :artwork="item"/>
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import artworkItem from './artwork-list-item'

export default {
    props: ['artworks'],
    components: {
        'artwork-list-item-comp' : artworkItem
    },
    data: () => ({
        show: false
    }),
    watch: {
        artworks: function (val) {
            console.log(val)
            if(val) {
                this.show = true
            } else if (val === null){
                this.show = false
            }
        }
    }
}
</script>

