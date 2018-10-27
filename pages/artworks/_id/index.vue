<template>
    <div class="main">
        <album-comp :pictures="artworkData.pictures" :status="status"/>
        <detail-comp :artwork="artworkData" />
        <bids-comp :artwork="artworkData" @sold="changesold"/>
    </div>
</template>

<script>
/* eslint-disable */
import GET_ARTWORK_QUERY from '@/graphql/artwork/getartwork'
import albumComp from '@/components/artwork/details/album'
import detailsComp from '@/components/artwork/details/details'
import bidsComp from '@/components/artwork/details/bids'
import eventbus from '@/plugins/eventBus'

export default {
    apollo: {
        getartwork : {
            query: GET_ARTWORK_QUERY,
            variables () {
                return {
                    id : this.$route.params.id
                }
            }
        }
    },
    components: {
        'album-comp' : albumComp,
        'detail-comp' : detailsComp,
        'bids-comp' : bidsComp
    },
    data: () => ({
        artworkData : {},
        status: ''
    }),
    watch: {
        getartwork: function (val) {
            if(val) {
                this.artworkData = val.Model
                this.status = val.Model.status
                this.triggerloading(false)
            }
        }
    },
    methods: {
        triggerloading(val) {
           eventbus.$emit('loading', val) 
        },
        changesold(val) {
            this.status = val
        }
    },
    mounted() {
        this.triggerloading(true)
    }
}
</script>

<style scoped>
    .main {
        padding: 10px 20% 30px 20%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }
</style>

