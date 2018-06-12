<template>
    <div>
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <router-link :to="`/vacancies/${vacancy.id}`" v-for="vacancy in vacancies" class="item-row">
            <div>
                {{vacancy.position}}
            </div>
            <div style="margin-left: auto;">
                {{new Date(vacancy.creationDate).toLocaleString()}}
            </div>
        </router-link>
    </div>
</template>

<script>
  import { Companies } from '../../api';
  import { mapGetters } from 'vuex';

  export default {
    name: 'vacancies',
    data() {
      return {
        vacancies: []
      };
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      this.$title('Вакансии');
      this.getVacancies();
    },
    methods: {
      getVacancies() {
        this.$store.dispatch('getUserAndCompany')
          .then(() => {
            Companies.getVacancies(this.company.id)
              .then(res => {
                this.vacancies = res.data;
              });
          });
      }
    }
  };
</script>

<style lang="scss">
    .item-row {
        display: flex;
        flex-direction: row;
        /*border: 1px solid rebeccapurple;*/
        border-radius: 3px;
        background-color: #fff;
        margin-bottom: .5rem;
        padding: 1rem;
    }
</style>