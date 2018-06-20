<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <div v-if="message">
      <div>{{ message }}</div>
    </div>
    <ul>
      <li v-for="(goal) in goals">
        <v-flex xs12 >
          <v-card color="white" class="black--text minha-classe">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div class="headline">{{ goal.description }}</div>
                    <div class="subheading">Total do obejtivo R$ {{ goal.value }}</div>
                    <div class="subheading">Parcelas R$ {{ goal.parcel }}</div>
                    <div class="subheading">Final {{ formattedDate(goal.end_date) }}</div>
                  </div>
                  <v-card-actions>
                    <v-btn flat dark class="black--text" @click="seeDetails(goal)">Detalhes</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </li>
    </ul>
    <v-alert v-for="(error) in errorText" :value="error" color="error">
      {{ error }}
    </v-alert>
    <v-btn absolute dark fab bot right color="pink" class="float-button" @click="openDialog"  fixed="true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Novo objetivo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="description" label="Qual seu objetivo? " required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="value" prefix="R$" label="Valor que vc quer alcançar" required type="number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="parcel" prefix="R$" label="Quantidade que vc pretende guardar ao mes" required type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="createGoal">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios';
import auth from '@/api/auth';
export default {
  name: 'Goals',
  data() {
    return {
      landscape: false,
      reactive: false,
      dialog: false,
      goals: [],
      description: '',
      value: '',
      parcel: '',
      end_date: null,
      message: '',
      errorText: [],
    }
  },
  mounted() {
    this.getAllGoals();
  },
  watch: {

  },
  methods: {
    getAllGoals() {
      axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/goals`).then((res) => {
      if (res.status === 204) {
        if (!this.goals) {
          this.message = 'Nenhum objetivo foi criado'
        }
      } else {
        res.data.data.forEach(item => {
          if (!this.goals.some(goal => item.id === goal.id)) {
            this.goals.push(item);
          };
        });
      }
      });
    },
    createGoal() {
      let goalData = {description: this.description, parcel: this.parcel, value: this.value}
      axios.post(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/goals`, {goal: goalData}).then((res) => {
        this.goals.push(res.data.data.goal);
      }).catch((error) => {
        if (!error.response.data.data) {
          this.errorText.push(error.message);
        } else {
          error.response.data.data[0].forEach(item => {
            this.errorText.push(item);
          });
        }
      })
    },
    openDialog() {
      this.dialog = true;
    },
    seeDetails(goal) {
      this.$router.push(`/goals/${goal.id}`);
    },
    formattedDate(end_date) {
      var today = new Date(end_date);
      var day = today.getDate();
      var month = today.getMonth()+1; //January is 0!
      var year = today.getFullYear();
      if(day<10) {
          day = '0'+day
      }

      if(month<10) {
          month = '0'+month
      }
      return day + '/' + month + '/' + year;
    }
  }
};
</script>
<style>
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
