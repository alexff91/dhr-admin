<template>
    <div class="container">
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <div class="imba-table">
            <div class="imba-row imba-row-head">
                <div class="imba-col imba-col-main">Позиция</div>
                <div class="imba-col imba-col-small">Отклики</div>
                <div class="imba-col imba-col-small">Создана</div>
                <div class="imba-col-action"></div>
                <div class="imba-col-action"></div>
            </div>
            <router-link :to="`/vacancies/${vacancy.id}`" v-for="vacancy in vacancies" :key="vacancy.id"
                         class="imba-row imba-row-link">
                <div class="vacancy-status-block is-active"></div>
                <div class="imba-col imba-col-main">
                    {{vacancy.position}}
                </div>
                <div class="imba-col imba-col-small" title="Откликов/Просмотров">
                    <b>{{vacancy.respondsCount}}</b>
                </div>
                <div class="imba-timestamp imba-col imba-col-small" :title="new Date(vacancy.creationDate).toLocaleString()">
                    <vk-icon icon="clock" class="icon" :ratio="0.7"></vk-icon>
                    <span>{{ distanceInWords(new Date(vacancy.creationDate), new Date(), { locale: ru }) }} назад</span>
                </div>

                <div class="imba-col-action" title="Скопировать ссылку на вакансию">
                    <div class="imba-popper" v-if="vacancy.tooltipIsVisible">
                        Ссылка скопирована
                    </div>
                    <button @click.prevent="copyVacancyLink(vacancy)">
                        <vk-icon icon="link"></vk-icon>
                    </button>
                </div>

                <div class="imba-col-action" title="Редактировать">
                    <router-link :to="`/vacancies/${vacancy.id}/edit`">
                        <vk-icon icon="file-edit"></vk-icon>
                    </router-link>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
  const VACANCIES_URL = 'https://app.vi-hr.com/demo/vacancy/';
  import { Companies } from '../../api';
  import { mapGetters } from 'vuex';
  import { distanceInWords } from 'date-fns';
  import ru from 'date-fns/locale/ru';

  export default {
    name: 'vacancies',
    data() {
      return {
        vacancies: [],
        distanceInWords,
        ru
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
            this.vacancies = res.data.sort((a, b) => b.creationDate - a.creationDate).map(vacancy => {
              return {
                ...vacancy,
                tooltipIsVisible: false
              };
            });
          });
      },
      copyVacancyLink(vacancy) {
        console.log(vacancy.tooltipIsVisible);

        this.$copyText(this.getVacancyLink(vacancy.id)).then(() => {
          vacancy.tooltipIsVisible = true;
          setTimeout(() => {
            vacancy.tooltipIsVisible = false;
          }, 2000);
        });
      },

      getVacancyLink(id) {
        return VACANCIES_URL + id;
      }
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .vacancy-status-block {
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: #24bb64;
        border-radius: 3px 0 0 3px;
    }
</style>