<template>
    <div>
        <search-comp @searchinput="changesearch"/>
        <v-divider />
        <div class="pb-2 pt-2">
            <selection-comp @selection="changeselection"/>
        </div>
        <v-divider />
        <div id="list">
            <artwork-listing-comp :artworks="artworks"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import searchComp from './search-comp-with-title'
import selectionComp from './selection-btn-comp'
import artworkListing from './artwork-listing-comp'
import GET_ARTWORKS from '@/graphql/artwork/getartworkbyuser'

export default {
    components: {
        'search-comp' : searchComp,
        'selection-comp': selectionComp,
        'artwork-listing-comp': artworkListing
    }, 
    data: () => ({
        selection: 'all',
        search: null,
        filter: {},
        artworks: null
    }),
    methods: {
        changesearch(val) {
            this.search = val
        },
        changeselection(val) {
            this.selection = val
        }
    },
    watch: {
        search: function (val) {
            this.filter = {}
            if(val.length > 0 && val != null) {
                switch(this.selection) {
                    case 'paid': {
                        this.filter = {
                            status: 'PAID',
                            title: { $regex: val, $options: 'i'}
                        }
                    }
                    case 'sold': {
                        this.filter = {
                            status: 'SOLD',
                            title: { $regex: val, $options: 'i'}
                        }
                    }
                    default: {
                        this.filter = {
                            title: { $regex: val, $options: 'i'}
                        }
                    }
                    break;
                }
            }
        },
        selection: function (val) {
            this.filter = {}
            if(this.search != null && this.search.length > 0) {
                 switch(this.selection) {
                    case "paid": {
                        this.filter = {
                            status: 'PAID',
                            title: { $regex: val, $options: 'i'}
                        }
                        break;
                    }
                    case "sold": {
                        this.filter = {
                            status: 'SOLD',
                            title: { $regex: val, $options: 'i'}
                        }
                        break;
                    }
                    default: {
                        this.filter = {
                            title: { $regex: val, $options: 'i'}
                        }
                        break;
                    }
                }
            } else {
                 switch(this.selection) {
                    case "paid": {
                        this.filter['status'] = 'PAID'
                        break;
                    }
                    case "sold": {
                        this.filter = {
                            status: 'SOLD'
                        }
                        break;
                    }
                    default: {
                        this.filter = {
                        }
                        break;
                    }
                }
            }
        },
        getartworkbyuser: function (val) {
            this.artworks = val.SearchItems
        }
    },
    apollo: {
        getartworkbyuser: {
            query: GET_ARTWORKS,
            variables () {
                return {
                    filter: JSON.stringify(this.filter),
                    sort: null,
                    limit: null,
                    skip: null
                }
            }
        }
    }
}
</script>

<style scoped>
    #list {
        height: 70vh;
        overflow-y: auto; 
    }
</style>


