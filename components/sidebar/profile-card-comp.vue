<template>
    <div class="pa-3">
        <v-list two-line>
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="/icon_avatar.png" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h4>Artist Name</h4>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        Country
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
                    <span style="color: grey">$ 0.00 </span>
                </v-flex>
                <v-flex xs6>
                    <span style="color: grey">$ 0.00</span>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    
}
</script>

<style scoped>

</style>


