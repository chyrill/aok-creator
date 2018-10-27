<template>
    <div>
        <v-container fluid grid-list-xl>
            <v-layout row wrap justify-space-between>
                <v-flex xs3>
                    <br>
                    <h2>Artworks</h2>
                </v-flex>
                <v-flex xs6>
                    <v-text-field label="Search" v-model="search" @input="getsearch" append-icon="search" />
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
/* eslint-disable */
export default {
    data: () => ({
        search: null
    }),
    methods: {
        getsearch() {
            this.$emit('searchinput', this.search)
        }
    }
}
</script>

