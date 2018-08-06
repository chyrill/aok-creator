<template>
    <div>
        <search-comp />
        <v-divider />
        <div class="pb-2 pt-2">
            <selection-comp/>
        </div>
        <v-divider />
        <div id="list">
            <artwork-listing-comp />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import searchComp from './search-comp-with-title'
import selectionComp from './selection-btn-comp'
import artworkListing from './artwork-listing-comp'

export default {
    components: {
        'search-comp' : searchComp,
        'selection-comp': selectionComp,
        'artwork-listing-comp': artworkListing
    }
}
</script>

<style scoped>
    #list {
        height: 70vh;
        overflow-y: auto; 
    }
</style>


