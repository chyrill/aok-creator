<template>
    <div class="main">
        <div id="side_bar">
            <v-card height="100vh" class="pa-0">
                <profile-comp />
                <v-divider></v-divider>
                <transactioin-comp />
            </v-card>
        </div>
        <div id="artwork">
            <v-card class="pa-3" height="100vh">
                <main-comp />
            </v-card>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import profileComp from '@/components/sidebar/profile-card-comp'
import transactionComp from '@/components/sidebar/transaction-comp-list'
import mainComp from '@/components/main/main-comp'

export default {
    components: {
        'profile-comp' : profileComp,
        'transactioin-comp': transactionComp,
        'main-comp': mainComp
    }
}
</script>


<style scoped>
    .main {
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 100%;
    }
    #artwork {
    }
</style>
