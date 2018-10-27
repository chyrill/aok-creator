<template>
    <div>
        <v-card-text>
            <div style="text-align: center">
                <i>Are you sure to create shipping transaction now?</i>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="_btn black" :disabled="loading" :dark="!loading" @click="submit">
                <span v-if="loading">
                    <v-progress-circular indeterminate size="25" color="black"></v-progress-circular>
                </span>
                <span v-else>
                    OK
                </span>
            </v-btn>
            <v-btn class="_btn" outline :disabled="loading" @click="close">Cancel</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
/* eslint-disable */
import eventbus from '@/plugins/eventBus'
import CREATE_SHIPPING_MUTATION from '@/graphql/shipping/createshippingtransaction'

export default {
    props: {
        id: {
            type: String
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async submit() {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: CREATE_SHIPPING_MUTATION,
                variables: {
                    id: this.id
                }
            })
            .then(res => {
                this.triggerAlert('Successfully created shipping transaction', 'green', 'check')
                window.open(res.data.createshippingtransaction.label_url)
                eventbus.$emit('shipping', res.data.createshippingtransaction.orderId)
                window.location.reload(true)
                this.close()
            })
            .catch(err => {
                this.triggerAlert('Error on creating shipping transaction', 'red', 'close')
                this.triggerLoading()
            })
        },
        triggerLoading() {
            this.loading = !this.loading
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('alert', {
                message,
                color,
                action
            })
        } 
    },
    data: () => ({
        loading: false
    })    
}
</script>

