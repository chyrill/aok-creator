<template>
    <div>
        <v-card>
            <v-toolbar dark class="black">
                <v-container fluid fill-height justify-center>
                    <img src="/title2.png" width="60px"> <h2>AOK-Creator</h2>
                </v-container>
            </v-toolbar>
            <div>
                <mark-sold-comp v-if="type === 'mark-sold'" :id="data.id" @close="close"/>
                <extend-auction-comp v-if="type === 'extend-auction'" @close="close" />
                <create-shipping-comp v-if="type === 'create-shipping'" :id="data.id" @close="close" />
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import MarkSoldForm from './forms/marksold'
import ExtendAuctionForm from './forms/extendauction'
import CreateShippingForm from './forms/createshipping'

export default {
    props: {
        show: {
            type: Boolean
        },
        type: {
            type: String
        },
        data: {
            type: Object
        }
    },
    methods: {
        close () {
            this.$emit('close')
        }
    },
    components: {
        'mark-sold-comp' : MarkSoldForm,
        'extend-auction-comp': ExtendAuctionForm,
        'create-shipping-comp' : CreateShippingForm
    }
}
</script>

