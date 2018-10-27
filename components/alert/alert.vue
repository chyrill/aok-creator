<template>
    <div>
        <v-alert :value="alert.show" type="info" color="black" dismissible outline id="alert_item" @click="del">
            <h3>{{alert.title}}</h3>
            <span>{{alert.message}}</span>
        </v-alert>
    </div>
</template>


<script>
/* eslint-disable */
export default {
    props: {
        alert : {
            type: Object
        }
    },
    methods: {
        del() {
            this.$emit('close')
        }
    }
}
</script>



<style scoped>
    #alert_item {
        background: rgba(255,255,255,0.2);
        width: 500px;
    }
    @media screen and (max-width: 770px){
        #alert_item {
            width: 98vw;
        }
    }
</style>
