<template>
    <div class="pt-2">
        <div v-for="i in itemList" :key="i">
            <artwork-list-item-comp />
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import artworkItem from './artwork-list-item'

export default {
    components: {
        'artwork-list-item-comp': artworkItem
    },
    data: () => ({
        itemList: ['sample', 'again', 'here','shit']
    })
}
</script>

