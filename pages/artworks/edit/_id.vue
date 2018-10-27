<template>
    <div id="main">
        <form-comp v-if="show" :artwork="artworkData"/>
    </div>
</template>

<script>
/* eslint-disable */
import GET_ARTWORK_QUERY from '@/graphql/artwork/getartwork'
import ARTWORK_FORM from '@/components/artwork/forms/edit'

export default {
    apollo: {
        getartwork: {
            query: GET_ARTWORK_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    watch: {
        getartwork: function (val) {
            this.artworkData = val.Model
            this.show = true
        }
    },
    data: () => ({
        artworkData: null,
        show: false
    }),
    components: {
        'form-comp' : ARTWORK_FORM
    },
    methods: {
        triggerloading () {
            eventbus.$emit('loading')
        }
    }
}
</script>

<style scoped>
    #main {
        padding: 10px 20% 10px 20%;
    }
</style>


