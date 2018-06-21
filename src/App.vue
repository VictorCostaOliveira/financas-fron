<template>
  <v-app>
    <v-toolbar app >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content class="backgroud">
      <router-view/>
    </v-content>
    <div v-if="this.$route.meta.needBottom">
      <bottom-navigation></bottom-navigation>
    </div>
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/BottomNavigation';

export default {
  name: 'App',
  components: {
    BottomNavigation,
  },
  data() {
    return {
      title: 'Finanças',
    };
  },
};
</script>
<style >
.backgroud {
  background-color: #F5F5F5;
}
</style>
