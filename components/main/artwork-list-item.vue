<template>
    <div>
        <v-container fluid fill-height>
            <v-layout row wrap justify-space-between>
                <v-flex xs9>
                    <v-layout row wrap>
                        <v-flex xs3>
                            <v-card :height="180" :width="180" class="grey lighten-2">
                               <v-card-media height="180px">
                                   <img :src="artwork.pictures[0]" />
                               </v-card-media>
                            </v-card>
                        </v-flex>
                        <v-flex xs6>
                            <span style="font-size:19px; font-weight: 700;">{{artwork.title}}, {{artwork.year}}</span> <br>
                            <div style="color: grey">
                                {{artwork.length}} x {{artwork.width}} x {{artwork.height}} {{artwork.distanceUnit}} <br>
                                {{artwork.medium}} <br>
                                {{artwork.artist.country}} <br>
                                <br>
                                pledging <span style="color: cyan">%{{artwork.pledge}}</span> to <span style="color: cyan">{{artwork.charity.name}}</span><br>    
                                <date-comp v-if="artwork.dateCreated" prepend_message="Created on" :date="artwork.dateCreated"  :isFullMonth="true"/> <br>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs3>
                    <div style="text-align:right">
                        <span style="font-size: 19px; font-weight: 700;"><price-comp :item="artwork.price"/></span> <br> <br> <br>
                        <div>
                            <v-container fluid justify-center style="padding: 0">
                                <div v-if="artwork.status === 'PAID'">
                                    <a @click="createship">Create Shipment</a>
                                </div>
                                <div v-else-if="artwork.status === 'ON-GOING'">
                                    <a :href="'/artworks/edit/' + artwork._id">Edit Item</a><br>    
                                    <a :href="'/artworks/' + artwork._id">View Bids</a> <br>
                                    <a @click="markSold">Mark as Sold</a>
                                </div>
                                <div v-else-if="artwork.status=== 'SOLD'">
                                    <a :href="'/artworks/' + artwork._id">View Bids</a> <br>
                                </div>
                                <div v-else-if="artwork.status === 'EXIPIRED'">
                                    <a :href="'/artworks/edit/' + artwork._id">Edit Item</a><br>    
                                    <a :href="'/artworks/' + artwork._id">View Bids</a> <br>
                                    <a @click="markSold">Mark as Sold</a> <br>
                                    <a @click="extendAuction">Extend Auction</a>
                                </div>
                            </v-container>
                        </div>
                    </div>
                </v-flex>
                <v-flex xs3>
                    <div class="pt-2">
                        <span v-if="artwork.status === 'ON-GOING'" style="color:grey"><expiration-comp prepend_message="Expires in" :date="artwork.auctionEndDate" /> </span>
                        <span v-else-if="artwork.status === 'SOLD'">
                            <span style="background-color: red; color: whitesmoke; font-weight: 700; text-transform: uppercase; padding-left: 2px; padding-right: 2px;">sold</span> <elapsed-time :dateVal="artwork.dateUpdated" />
                        </span>
                        <span v-else-if="artwork.status === 'PAID'">
                            <span style="background-color: red; color: whitesmoke; font-weight: 700; text-transform: uppercase; padding-left: 2px; padding-right: 2px;">sold</span> 
                            <span style="background-color: red; color: whitesmoke; font-weight: 700; text-transform: uppercase; padding-left: 2px; padding-right: 2px; margin-left: 5px">paid</span> 
                            <elapsed-time :dateVal="artwork.dateUpdated" />
                        </span>
                        <span v-else-if="artwork.status === 'EXPIRED'">
                            <span style="background-color: red; color: whitesmoke; font-weight: 700; text-transform: uppercase; padding-left: 2px; padding-right: 2px;">ended</span> 
                            <elapsed-time :dateVal="artwork.auctionEndDate"></elapsed-time>
                        </span>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */
import categoryEnum from '../enumselection/artworkcategoryenum'
import moneyConversionComp from '../helpers/moneyconversion'
import dateComp from '../helpers/datedisplay'
import datedisplayVue from '../helpers/datedisplay'
import expirationComp from '../helpers/expirationcountdown'
import elapsedTimeComp from '../helpers/elapsedtime'
import eventbus from '@/plugins/eventBus'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    methods: {
        markSold () {
            eventbus.$emit('dialog', {
                type: 'mark-sold',
                data: {
                    id: this.artwork._id
                }
            })
        },
        extendAuction () {
            eventbus.$emit('dialog', {
                type: 'extend-auction',
                data: {
                    id: this.artwork._id
                }
            })
        },
        createship () {
            eventbus.$emit('dialog', {
                type: 'create-shipping',
                data: {
                    id: this.artwork._id
                }
            })
        }
    },
    components: {
        'price-comp': moneyConversionComp,
        'date-comp': datedisplayVue,
        'expiration-comp': expirationComp,
        'elapsed-time': elapsedTimeComp
    },
    watch: {
        artwork: function(val) {
            if(val) {
                this.artwork = val
            }
        }
    }
}
</script>

<style scoped>
    a {
        text-transform: none;
        color: #1CA7B8;
        text-decoration: none;  
    }
    #_con {
        padding: 0;
        height: 180px;
    }
    img {
        object-fit: contain;
        width: 100%;
    }
</style>


