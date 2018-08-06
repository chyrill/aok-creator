<template>
    <div>
        <v-btn :outline="select === 1 ? false: true" :dark="select === 1 ? true: false" class="_btn" @click="changeSelect(1)">All Artworks</v-btn>
        <v-btn class="_btn" :outline="select === 2 ? false: true" :dark="select === 2 ? true: false"  @click="changeSelect(2)">For Shipping</v-btn>
        <v-btn class="_btn"  :outline="select === 3 ? false: true" :dark="select === 3 ? true: false"  @click="changeSelect(3)">Sold</v-btn>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    data: () => ({
        select: 1
    }),
    methods: {
        changeSelect(value) {
            this.select = value
        }
    }    
}
</script>


<style scoped>
    ._btn {
        text-transform: none;
        width: 160px;
        height: 35px;
    }
</style>

