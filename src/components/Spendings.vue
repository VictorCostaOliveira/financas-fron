<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <div v-if="message">
      <div>{{ message }}</div>
    </div>
    <ul>
      <li v-for="(spending) in spendings">
        <v-flex xs12 >
          <v-card color="white" class="black--text minha-classe">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div class="headline">{{ spending.description }}</div>
                    <div class="subheading">Recebi R$ {{ spending.value }}</div>
                  </div>
                  <v-card-actions>
                    <v-btn flat dark class="black--text" @click="seeDetails(spending)">Detalhes</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </li>
    </ul>
    <v-btn absolute dark fab bot right color="pink" class="float-button" @click="openDialog" fixed="true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Diga o que você gastou</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="description" label="Descrição do gasto" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="value" label="Valor" required type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                 <v-select v-model="select" :items="items" label="Escolha ou digite uma categoria" chips tags>
                 </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" >Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="createSpending">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert v-for="(error) in errorText" :key="error.id" :value="error" color="error">
      {{ error }}
    </v-alert>
  </v-container>
</template>
<script>
import axios from 'axios';
import auth from '@/api/auth';

export default {
  name: 'Spendings',
  data() {
    return {
      select: [],
      spendings: [],
      categories: [],
      dialog: false,
      description: '',
      value: '',
      message: '',
      errorText: [],
    };
  },
  mounted() {
    this.getSpendings();
    this.getCategories();
  },
  methods: {
    getSpendings() {
      axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/spendings`).then((res) => {
        if (res.status === 204) {
          this.message = 'Voce ainda não cadastrou nenhum gasto';
        } else {
          res.data.data.forEach((item) => {
            if (!this.spendings.some(spending => item.id === spending.id)) {
              this.spendings.push(item);
            }
          });
        }
      });
    },
    createSpending() {
      const newCategories = [];
      if (this.select) {
        this.select.forEach((item) => {
          newCategories.push({ name: item });
        });
      }
      const spendingData = { value: this.value, description: this.description };
      axios.post(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/spendings`, { spending: spendingData, categories: newCategories }).then((res) => {
        this.spendings.push(res.data.data.spending);
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
    seeDetails(spending) {
      this.$router.replace(`/spendings/${spending.id}`);
    },
    openDialog() {
      this.dialog = true;
    },
    getCategories() {
      axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/categories`).then((res) => {
        res.data.data.forEach((item) => {
          if (!this.categories.some(categorie => item.id === categorie.id)) {
            this.categories.push(item);
          }
        });
      });
    },
  },
  computed: {
    items() {
      return this.categories.map(item => item.name);
    },
  },
};
</script>
<style></style>
