<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="Senha" required type="password"></v-text-field>
      <v-alert v-for="(error) in errorText" :value="error" color="error">
        {{ error }}
      </v-alert>
      <v-btn :disabled="!valid" @click="submit"> submit</v-btn>
    </v-form>
    <p class="button-signup" @click="goToSignUp">Não possui conta? <b> Fazer cadastro </b></p>
  </v-container>
</template>
<script>
import axios from 'axios'
import auth from '@/api/auth'
export default {
  name: 'Login',
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
      let userData = {email: this.email, password: this.password};
      const self = this;
      axios.post('http://localhost:3000/api/v1/users/sign_in', {user: userData})
      .then((response) => {
        if (response.data.status === 200) {
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
    goToSignUp() {
      this.$router.push('/')
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-signup {
  position: fixed;
  bottom: 10px;
  margin-left: 56px;
}
</style>
