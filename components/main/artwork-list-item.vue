<template>
    <div>
        <v-container fluid fill-height>
            <v-layout row wrap justify-space-between>
                <v-flex xs9>
                    <v-layout row wrap>
                        <v-flex xs3>
                            <v-card :height="180" :width="180" class="grey ligthen-3">
                            </v-card>
                        </v-flex>
                        <v-flex xs6>
                            <span style="font-size:19px; font-weight: 700;">Artwork Name, Year</span> <br>
                            <div style="color: grey">
                                category <br>
                                size <br>
                                medium <br>
                                country <br>
                                <br>
                                charity <br>    
                                created date <br>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs3>
                    <div style="text-align:right">
                        <span style="font-size: 19px; font-weight: 700;">Price</span> <br> <br> <br>
                        <div>
                            <v-container fluid justify-center style="padding: 0">
                                <div v-if="sold">
                                    <a>Create Shipment</a>
                                </div>
                                <div v-else>
                                    <a>Edit Item</a><br>    
                                    <a>View Bids</a> <br>
                                    <a>Mark as Sold</a>
                                </div>
                            </v-container>
                        </div>
                    </div>
                </v-flex>
                <v-flex xs3>
                    <div class="pt-2">
                        <span style="color:grey">Expires in date. </span>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    data: () => ({
        sold: true
    })
}
</script>

<style scoped>
    .a {
        text-transform: none;
        color: #1CA7B8;
    }
    #_con {
        padding: 0;
        height: 180px;
    }
</style>


