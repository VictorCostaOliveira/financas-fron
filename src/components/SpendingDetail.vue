<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <ul>
      <v-flex xs12 >
        <v-card color="white" class="black--text minha-classe">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="spending.description" value="spending.description" label="Descrição do gasto" required type="text"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="spending.value" value="spending.value" label="Quanto vc gastou?" required type="number"></v-text-field>
                </v-flex>
                <p class="align">Categorias</p>
                <v-chip v-for="category in spending.categories" v-if="category">
                  <strong>{{ category.name }}</strong>
                </v-chip>
                <strong v-else class="align">Nenhuma categoria foi cadastrada</strong>
                <v-card-actions>
                  <v-btn flat dark class="black--text" @click="update(spending)">Atualizar</v-btn>
                  <v-btn flat dark class="black--text" @click="deleteSpending(spending)">Deletar</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-alert v-for="(error) in errorText" :value="error" color="error">
        {{ error }}
      </v-alert>
      <v-alert :value="success" color="success">
        {{ successMessage }}
      </v-alert>
    </ul>
  </v-container>
</template>
<script>
import axios from 'axios'
import auth from '@/api/auth'
export default {
  name: 'SpendingDetail',
  data() {
    return {
      spending: {},
      errorText: [],
      success: false,
      successMessage: '',
    }
  },
  mounted() {
    const self = this;
    axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/spendings/${this.$route.params.id}`).then((res) => {
      self.spending = res.data.data.spending;
    });
  },
  methods: {
    update() {
      axios.put(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/spendings/${this.$route.params.id}`, {spending: this.spending }).then((res) => {
        this.spending = res.data.data.spending;
        this.success = true;
        this.successMessage = 'Gasto atualizado';
        this.setTimeout(function() {
          this.success = false;
        }, 30)
      }).catch((error) => {
        if (!error.response.data.data) {
          this.errorText.push(error.message)
        }else  {
          error.response.data.data[0].forEach(item => {
            this.errorText.push(item)
          });
        }
      })
    },
    deleteSpending() {
      axios.delete(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/spendings/${this.$route.params.id}`).then((res) => {
        this.$router.replace('/spendings');
      }).catch((error) => {
        if (!error.response.data.data) {
          this.errorText.push(error.message)
        }else  {
          error.response.data.data[0].forEach(item => {
            this.errorText.push(item)
          });
        }
      })
    },
  }
};
</script>
<style>
.align {
  margin-left: 10px;
}
</style>
