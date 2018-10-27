<template>
    <div>
        <v-card-text>
            <div style="text-align: center">
                <i>Do you want to extend the auction date?</i>
            </div>
            <v-container fluid fill-height class="pt-0 pb-0">
                <v-layout row wrap>
                    <v-flex xs4 offset-xs8>
                        <div style="text-align: left">
                            <v-text-field label="Days" v-model="days" :disabled="loading" :error-messages="daysErrors" @blur="$v.days.$touch()" @input="$v.days.$touch()" type="number"></v-text-field>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>   
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="_btn" :dark="!loading && !invalidForm" :disabled="loading || invalidForm" color="black" @click="submit">
                <span v-if="loading">
                    <v-progress-circular indeterminate color="black" size="25"></v-progress-circular>
                </span>
                <span v-else>
                    OK
                </span>
            </v-btn>
            <v-btn class="_btn" outline color="black" @click="close" :disabled="loading">Cancel</v-btn>
        </v-card-actions>
    </div>
</template>


<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import eventbus from '@/plugins/eventBus'
import EXTEND_AUCTION_MUTATION from '@/graphql/artwork/extendauction'

export default {
    mixins: [validationMixin],
    validations: {
        days: {
            required
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        async submit () {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: EXTEND_AUCTION_MUTATION,
                variables: {
                    id: this.id,
                    days: this.days
                }
            })
            .then(res => {
                this.triggerAlert('Successfully extended auction', 'green', 'check')
                this.triggerLoading()
                window.location.reload(true)
                this.close()
            })
            .catch(err => {
                this.triggerLoading()
                this.triggerAlert('Error on extending auction', 'red', 'close')
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
        loading: false,
        days: null
    }),
    computed: {
        daysErrors () {
            const errors = []
            if(!this.$v.days.$dirty) return errors
            !this.$v.days.required && errors.push('Days are required')
            return errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    props: {
        id: {
            type: String
        }
    }
}
</script>

