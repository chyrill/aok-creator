<template>
    <div id="main">
        <artwork-form-comp />
    </div>
</template>


<script>
/* eslint-disable */
import artworkFormComp from '@/components/artwork/artwork-form-comp'

export default {
    components: {
        'artwork-form-comp' : artworkFormComp
    }    
}
</script>

<style scoped>
    #main {
        padding: 20px 20% 20px 20%;
    }
</style>

