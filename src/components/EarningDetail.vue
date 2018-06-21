<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <ul>
      <v-flex xs12 >
        <v-card color="white" class="black--text minha-classe">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="earning.description" value="earning.description" label="Descrição do ganho" required type="text"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="earning.value" value="earning.value" label="Quantos vc ganhou?" required type="number"></v-text-field>
                </v-flex>
                <v-card-actions>
                  <v-btn flat dark class="black--text" @click="update(earning)">Atualizar</v-btn>
                  <v-btn flat dark class="black--text" @click="deleteEarning(earning)">Deletar</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-alert v-for="(error) in errorText" :key="error.id" :value="error" color="error">
        {{ error }}
      </v-alert>
      <v-alert :value="success" color="success">
        {{ successMessage }}
      </v-alert>
    </ul>
  </v-container>
</template>
<script>
import axios from 'axios';
import auth from '@/api/auth';

export default {
  name: 'EarningDetail',
  data() {
    return {
      earning: {},
      errorText: [],
      success: false,
      successMessage: '',
    };
  },
  mounted() {
    const self = this;
    axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/earnings/${this.$route.params.id}`).then((res) => {
      self.earning = res.data.data.earning;
    });
  },
  methods: {
    update() {
      axios.put(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/earnings/${this.$route.params.id}`, { earning: this.earning }).then((res) => {
        this.earning = res.data.data.earning;
        this.success = true;
        this.successMessage = 'Gasto atualizado';
      }).catch((error) => {
        if (!error.response.data.data) {
          this.errorText.push(error.message);
        } else {
          error.response.data.data[0].forEach((item) => {
            this.errorText.push(item);
          });
        }
      });
    },
    deleteEarning() {
      axios.delete(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/earnings/${this.$route.params.id}`).then(() => {
        this.$router.push('/home');
      }).catch((error) => {
        if (!error.response.data.data) {
          this.errorText.push(error.message);
        } else {
          error.response.data.data[0].forEach((item) => {
            this.errorText.push(item);
          });
        }
      });
    },
  },
};
</script>
<style>
.align {
  margin-left: 10px;
}
</style>
