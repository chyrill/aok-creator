<template>
    <div class="pa-3">
        <v-list two-line v-if="show">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img :src="profile.displayPicture === null? '/icon_avatar.png' : profile.displayPicture" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h4>{{profile.fullName}}</h4>
                    </v-list-tile-title>
                    <v-list-tile-sub-title v-if="profile.country">
                        {{profile.country.split(' ')[0]}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs6>
                    <h4>Balance</h4>
                </v-flex>
                <v-flex xs6>
                    <h4>Withdraw</h4>
                </v-flex>
                <v-flex xs6>
                    <span style="color: grey"><money-comp :item="balance"/></span>
                </v-flex>
                <v-flex xs6>
                    <span style="color: grey"><money-comp :item="withdrawals"/></span>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */
import MoneyComp from '@/components/helpers/moneyconversion'

export default {
    data: () => ({
        show: false,
        profile: null
    }),
    computed: {
        balance () {
            return this.$store.state.balance
        },
        withdrawals () {
            return this.$store.state.withdrawals
        }
    },
    components: {
        'money-comp' : MoneyComp
    },
    mounted () {
        this.$store.watch(
            state => {
                if(state.profile.data) {
                    this.profile = state.profile.data
                    this.show = true
                }
            }
        )
    }
}
</script>

<style scoped>

</style>


