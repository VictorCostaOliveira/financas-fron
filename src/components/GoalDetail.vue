<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <ul>
      <v-flex xs12 >
        <v-card color="white" class="black--text minha-classe">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs12>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="goal.description" value="goal.description" label="Nome do objetivo" required type="text"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="goal.value" value="goal.value" label="Total do objetivo" required type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="goal.parcel" value="goal.parcel" label="Parcelas" required type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="formattedDate" value="formattedDate" label="Data final do objetivo" disabled></v-text-field>
                </v-flex>
                <v-card-actions>
                  <v-btn flat dark class="black--text" @click="update(goal)">Atualizar</v-btn>
                  <v-btn flat dark class="black--text" @click="deleteGoal(goal)">Deletar</v-btn>
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
  name: 'GoalDetail',
  data() {
    return {
      goal: {},
      errorText: [],
      success: false,
      successMessage: '',
    };
  },
  mounted() {
    const self = this;
    axios.get(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/goals/${this.$route.params.id}`).then((res) => {
      self.goal = res.data.data.goal;
    });
  },
  methods: {
    update() {
      axios.put(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/goals/${this.$route.params.id}`, { goal: this.goal }).then((res) => {
        this.goal = res.data.data.goal;
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
    deleteGoal() {
      axios.delete(`http://localhost:3000/api/v1/users/${auth.getCredentials()}/goals/${this.$route.params.id}`).then(() => {
        this.$router.replace('/goals');
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
  computed: {
    formattedDate() {
      const today = new Date(this.goal.end_date);
      let day = today.getDate();
      let month = today.getMonth() + 1; // January is 0!
      const year = today.getFullYear();
      if (day < 10) {
        day = `0${day}`;
      }

      if (month < 10) {
        month = `0${month}`;
      }

      return `${day}/${month}/${year}`;
    },
  },
};
</script>
<style>
.align {
  margin-left: 10px;
}
</style>
