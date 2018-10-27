<template>
    <div>
        <v-card flat>
            <v-toolbar dark color="black" flat v-if="status === 'EXPIRED' || status === 'SOLD'">
                <span v-if="status === 'EXPIRED'">
                    <v-toolbar-title><h3>This Auction has ended</h3></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <h4>Accept Highest Bid</h4>
                </span>
                <span v-else>
                    <v-toolbar-title><h3>This artwork is sold</h3></v-toolbar-title>
                </span>
            </v-toolbar>
            <v-card-title>
                <div  class="pa-2" style="width: 100%">
                    <span style="float: left; color: grey"><h3>Artwork Photos</h3></span> <span style="float: right"><a :href="'/artworks/edit/' + id " v-if="status === 'EXPIRED' || status === 'ON-GOING'">Edit</a></span>
                </div>
            </v-card-title>
            <v-card-text>
                <div class="pa-1 main_container">
                    <div v-for="item in pictures" :key="item" style="widht:250px; height: 250px;">
                        <v-card class="grey lighten-3" width="250px">
                            <v-card-media height="250px">
                                <img :src="item" />
                            </v-card-media>
                        </v-card>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: ['pictures', 'status'],
    computed: {
        id () {
            return this.$route.params.id 
        }
    }
}
</script>

<style scoped>
    a {
        color: cyan;
        text-transform: none;
        text-decoration: none;
    }
    .main_container {
        width: 100%;
        overflow-x: inherit;
        grid-template-columns: repeat(10, 250px);
        grid-template-rows: 250px;
        grid-gap: 10px;
    }
    img {
        object-fit: contain;
        width: 100%;
    }
</style>


