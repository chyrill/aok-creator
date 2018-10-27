<template>
    <div>
        <v-card-text>
            <div style="text-align: center">
                <i>You are sure to mark the artwork sold?</i>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :dark="!loading" :disabled="loading" color="black" class="_btn" @click="submit">
                <span v-if="loading">
                    <v-progress-circular indeterminate size="20" color="black"></v-progress-circular>
                </span>
                <span v-else>
                    OK
                </span>
            </v-btn>
            <v-btn outline color="black" class="_btn" @click="close" :disabled="loading">Cancel</v-btn>
        </v-card-actions>
    </div>
</template>


<script>
/* eslint-disable */
import MARK_SOLD_MUTATION from '@/graphql/artwork/marksold'
import eventbus from '@/plugins/eventBus'

export default {
    props: {
        id: {
            type: String
        }
    },
    data: () => ({
        loading : false
    }),
    methods: {
        close () {
            this.$emit('close')
        },
        async submit() {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: MARK_SOLD_MUTATION,
                variables: {
                    id: this.id
                }
            })
            .then(res =>{
               const { Message, Successful } = res.data.marksold
               if(!Successful) {
                   this.triggerAlert(Message, 'red', 'close')
                   this.triggerLoading()
               } else {
                   this.triggerAlert(Message, 'green', 'check')
                   this.triggerLoading()
                   this.close()
                   window.location.reload(true)
               }
            })
            .catch(err => {
                this.triggerAlert(err)
                this.triggerLoading()
            })
        },
        triggerLoading () {
            eventbus.$emit('loading')
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('alert', {
                message,
                color,
                action
            })
        }
    }
}
</script>

