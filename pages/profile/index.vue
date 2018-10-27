<template>
    <div class="_main">
        <div v-if="newUser">
            <h2>Setup Profile</h2>
            <div class="pt-3">
                <profile-form-comp :profile="userprofile"/>
            </div>
        </div>
        <div v-else>
            <h2>Edit Profile</h2>
            <div class="pt-3">
                <profile-form-comp :profile="userprofile"/>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import profileFormComp from '@/components/profile/profileForm'
import GET_PROFILE_QUERY from '@/graphql/getprofile'

export default {
    data: () => ({
        newUser: true,
        userprofile: null,
        show: false
    }),
    components: {
        'profile-form-comp' :profileFormComp
    },
    mounted () {
        if(this.$route.query.auth) {
        }
        else {
            this.newUser = false
        }
        this.$store.watch(
            state => {
                if(state.profile.data) {
                    this.userprofile = state.profile.data
                }
            }
        )
    }
}
</script>

<style scoped>
    ._main {
        padding: 20px 20% 20px 20%;
    }
</style>


