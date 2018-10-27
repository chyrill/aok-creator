<template>
    <div>
        <v-card flat>
            <v-card-text>
                <div class="pl-4">
                    <h3 style="color:grey">Bids</h3>
                </div>
                <v-list two-line v-if="bids != null">
                    <v-list-tile avatar v-for="(item, index) in bids" :key="index">
                        <v-list-tile-avatar>
                            <img :src="item.bidder.displayPicture" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <h4>{{item.bidder.fullName}}</h4>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                <elapsed-comp :dateVal="item.dateCreated" />
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>
                                <h3><money-comp :item="item.amount" /></h3>
                            </v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                <div v-else>
                    <v-container fluid fill-height justify-center>
                        <div style="text-align: center">
                            <v-icon size="150px">fas fa-box-open</v-icon><br>
                            <h3>No bids yet...</h3>
                        </div>
                    </v-container>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div v-if="artwork.status === 'ON-GOING' || artwork.status === 'EXPIRED'" style="width:100%;">
                    <div style="text-align: center;">
                        <v-btn color="black" dark v-if="!accept" class="_btn" style="height: 75px;font-weight: 700;" @click="endAuction" block>
                          End Auction
                        </v-btn>
                        <v-btn v-else-if="accept" :dark="bids != null" :disabled="bids === null" color="black" class="_btn" style="height:75px; font-weight: 700;" @click="acceptBid" block>Accept Bid</v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import elapsedTimeComp from '@/components/helpers/elapsedtime'
import moneyComp from '@/components/helpers/moneyconversion'
import END_AUCTION_MUTATION from '@/graphql/artwork/endauction'
import eventbus from '@/plugins/eventBus'
import ACCEPT_BID_MUTATION from '@/graphql/artwork/acceptbid'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    watch: {
        artwork: function(val) {
            if(val) {
                this.accept = val.status === 'EXPIRED' ? true : false
                this.bids = this.artwork.bids ? this.artwork.bids.items : null
            }
        }
    },
    data: () => ({
        bids: [],
        auctionEndDate: null,
        accept : false,
        loading: false
    }),
    components: {
        'elapsed-comp': elapsedTimeComp,
        'money-comp': moneyComp
    },
    methods: {
        async acceptBid () {
            this.triggerLoading() 
            this.$apollo.mutate({
                mutation: ACCEPT_BID_MUTATION,
                variables: {
                    id: this.$route.params.id
                }
            })
                .then( res => {
                    this.triggerLoading()
                    this.triggerAlert('Successfully accepted bid', 'green' , 'check')
                    eventbus.$emit('acceptbid', res.data.acceptbid)
                    this.$router.push('/')
                })
                .catch( err => {
                    this.triggerLoading()
                    this.triggerAlert('Error on accepting bid', 'red', 'close')
                    alert(err)
                })
        },
        async endAuction () {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: END_AUCTION_MUTATION,
                variables: {
                    id: this.$route.params.id
                }
            })
                .then(res => {
                    const { Message, Successful } = res.data.endauction
                    if(!Successful) {
                        this.triggerAlert(Message, 'red', 'close')
                        this.triggerLoading()
                    } else {
                        this.triggerAlert(Message, 'green', 'check')
                        this.triggerLoading()
                        this.$emit('sold', 'EXPIRED')
                        this.accept = true
                    }
                })
                .catch(err => {
                    alert(err)
                })
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('alert', {
                message,
                color,
                action
            })
        },
        triggerLoading () {
            eventbus.$emit('loading')
        }
    }    
}
</script>
