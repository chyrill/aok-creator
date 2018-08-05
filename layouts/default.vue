<template>
  <v-app>
    <nav-comp />
    <v-content>
      <nuxt/>
    </v-content>
    <footer-comp />
  </v-app>  
</template>


<script>
/* eslint-disable */
import navigationComp from '@/components/navigation/navigation-comp'
import footerComp from '@/components/footer/footer-comp'

export default {
  components: {
    'nav-comp' : navigationComp,
    'footer-comp': footerComp
  }
}
</script>

<style scoped>
  * {
    font-family: 'Nunito', sans-serif;
  }
</style>
