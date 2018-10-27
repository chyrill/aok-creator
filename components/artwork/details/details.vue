<template>
    <div>
        <v-card flat>
            <v-card-title>
                <div class="pl-4 pt-2 pb-2 pr-4">
                    <h3 style="color: grey"> Artwork Details</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <div class="pl-4 pr-4">
                    <span style="float: left"><h2>{{artwork.title}}, {{artwork.year}}</h2></span>  <span style="float: right"><h2><money-comp :item="artwork.sellingPrice" /></h2></span><br><br>
                    <br><br>
                    {{artwork.description}}
                </div>
                <v-container fill-height fluid grid-list-sm>
                    <v-layout row wrap>
                        <v-flex xs3>
                            <div>
                                Size <br>
                                {{artwork.length}} x {{artwork.width}} x {{artwork.height}} {{artwork.measurement}}
                            </div>
                        </v-flex>
                        <v-flex xs9>
                            <div>
                                Medium <br>
                                {{artwork.medium}}
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <br>
                            <expiration-comp v-if="artwork.status == 1" prepend_message="Expires in" :date="artwork.auctionEndDate" />
                            <span v-else-if="artwork.status == 6" style="color: grey">Expired last<elapsed-time :dateVal="artwork.auctionEndDate"/></span>
                            <span v-else-if="artwork.status ==3" style="color: grey">Sold last<elapsed-time :dateVal="artwork.dateUpdated" /></span>
                        </v-flex>
                    </v-layout>
                </v-container> 

            </v-card-text>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import moneyComp from '@/components/helpers/moneyconversion'
import expirationComp from '@/components/helpers/expirationcountdown'
import categoryEnum from '@/components/enumselection/artworkcategoryenum'
import ElapsedTime from '@/components/helpers/elapsedtime'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    components: {
        'money-comp': moneyComp,
        'expiration-comp': expirationComp,
        'elapsed-time' : ElapsedTime
    }
}
</script>
