<template>
    <div>
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <router-link :to="`/vacancies/${vacancy.id}`" v-for="vacancy in vacancies" :key="vacancy.id" class="item-row">
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

      if (!this.company) {
        this.$store.dispatch('getUserAndCompany')
          .then(this.getVacancies);
      } else {
        this.getVacancies();
      }
    },
    methods: {
      getVacancies() {

        Companies.getVacancies(this.company.id)
          .then(res => {
            this.vacancies = res.data;
          });
      }
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .item-row {
        display: flex;
        flex-direction: row;
        border-radius: 3px;
        background-color: #fff;
        margin-bottom: .5rem;
        padding: 1rem;
        color: $base-color;
        text-decoration: none;

        &:hover {
            box-shadow: 0 0 0 2px $brand-color;
        }
    }
</style>