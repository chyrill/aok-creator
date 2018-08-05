<template>
    <div class="_main">
        <div v-if="newUser">
            <h2>Setup Profile</h2>
            <div class="pt-3">
                <profile-form-comp />
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import profileFormComp from '@/components/profile/profileForm'

export default {
    data: () => ({
        newUser: true
    }),
    components: {
        'profile-form-comp' :profileFormComp
    }
}
</script>

<style scoped>
    ._main {
        padding: 20px 20% 20px 20%;
    }
</style>


