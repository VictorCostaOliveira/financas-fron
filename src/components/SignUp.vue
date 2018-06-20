<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" label="Nome" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="Senha" required type="password"></v-text-field>
      <v-alert v-for="(error) in errorText" :value="error" color="error">
        {{ error }}
      </v-alert>
      <v-btn :disabled="!valid" @click="submit">Criar usuario</v-btn>
    </v-form>
    <p class="button-login" @click="goToLogin">Ja possui conta? <b> Fazer login </b></p>
  </v-container>
</template>
<script>
import axios from 'axios'
import auth from '@/api/auth'
export default {
  name: 'SignUp',
  data(){
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name é obrigatório',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Senha é obrigatoria'
      ],
      error: false,
      errorText: [],
    }
  },
  methods: {
    submit() {
      let userData = {name: this.name, email: this.email, password: this.password};
      axios.post('http://localhost:3000/api/v1/users', {user: userData})
      .then((response) => {
        if (response.data.status === 201) {
          auth.saveCredentials(response.data.data.user.id);
          this.$router.push('/home');
        } else {
          error.response.data.data[0].forEach(item => {
            this.errorText.push(item)
          });
        }
      })
      .catch((error) => {
        error.response.data.data[0].forEach(item => {
          this.errorText.push(item)
        });
      });
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-login {
  position: fixed;
  bottom: 10px;
  margin-left: 74px;
}
</style>
