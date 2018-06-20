<template>
  <v-card flat>
    <v-bottom-nav :value="true" absolute color="white" class="fixed">
      <v-btn flat color="teal" value="recent" @click="goToSpendings">
        <span>Gastos</span>
        <v-icon>money_off</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="favorites" @click="goToEarnings">
        <span>Ganhos</span>
        <v-icon>attach_money</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby" @click="goToGoals">
        <span>Objetivos</span>
        <v-icon>trending_up </v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby" @click="logout">
        <span>Deslogar</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-card>
</template>
<script>
import auth from '@/api/auth'
export default {
  name: 'BottomNavigation',
  data() {
    return {
    }
  },
  methods: {
    goToSpendings() {
      this.$router.push('/spendings');
    },
    goToEarnings() {
      this.$router.push('/home');
    },
    goToGoals() {
      this.$router.push('/goals');
    },
    logout() {
      auth.destroyCredentials();
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.float-button {
  bottom: 68px;
}
.fixed {
  position: fixed;
}
</style>
