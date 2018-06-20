<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <div v-if="message">
      <div>{{ message }}</div>
    </div>
    <ul>
      <li v-for="(earning) in earnings">
        <v-flex xs12 >
          <v-card color="white" class="black--text minha-classe">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div class="headline">{{ earning.description }}</div>
                    <div class="subheading mt-2">Recebi R$ {{ earning.value }}</div>
                  </div>
                  <v-card-actions>
                    <v-btn flat dark class="black--text" @click="seeDetails(earning)">Detalhes</v-btn>
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
          <span class="headline">Descreva seu ganho</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="description" label="Descrição do ganho" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="value" label="Quantos vc recebeu?" required type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" >Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="createEarning">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script >
import axios from 'axios';
import auth from '@/api/auth';
export default {
  name: 'Home',
  data() {
    return {
      description: '',
      dialog: false,
      earnings: [],
      message: '',
      value: '',
    }
  },
  mounted() {
    this.getEarnings();
  },
  methods: {
    getEarnings(){
      axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/earnings`).then((res) => {
        res.data.data.forEach(item => {
          if (!this.earnings.some(earning => item.id === earning.id)) {
            this.earnings.push(item);
          };
        });
      })
    },
    seeDetails(earning) {
      this.$router.push(`/earnings/${earning.id}`)
    },
    createEarning() {
      let earningData = {description: this.description, value: this.value}
      axios.post(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/earnings`, {earning: earningData}).then((res) => {
        this.earnings.push(res.data.data.earning);
      }).catch((error) => {
        console.log(error.data.data);
      });
    },
    openDialog() {
      this.dialog = true;
    }
  }
};
</script>
<style >
ul {
  list-style-type: none;
}
li {
  margin-bottom: 10px;
}
.minha-classe {
  border-radius: 20px;
}
</style>
