<template>
    <div>
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <div class="imba-table">
            <div class="imba-row imba-row-head">
                <div class="imba-col imba-col-main">Позиция</div>
                <div class="imba-col imba-col-small">Статус</div>
                <div class="imba-col imba-col-small">Отклики</div>
                <div class="imba-col imba-col-small">Создана</div>
            </div>
            <router-link :to="`/vacancies/${vacancy.id}`" v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy-row imba-row">
                <div class="vacancy-status-block is-active"></div>
                <div class="imba-col imba-col-main">
                    {{vacancy.position}}
                </div>
                <div class="imba-col imba-col-small">
                    В работе
                </div>
                <div class="imba-col imba-col-small" title="Откликов/Просмотров">
                    <b>11</b>/65
                </div>
                <div class="vacancy-creation-time imba-col imba-col-small" :title="new Date(vacancy.creationDate).toLocaleString()">
                    <vk-icon icon="clock" class="icon" :ratio="0.7"></vk-icon>
                    <span>{{ distanceInWords(new Date(vacancy.creationDate), new Date(), { locale: ru }) }} назад</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
  import { Companies } from '../../api';
  import { mapGetters } from 'vuex';
  import { distanceInWords } from 'date-fns';
  import ru from 'date-fns/locale/ru';
  import VkIcon from 'vuikit/src/library/icon/components/icon';

  export default {
    name: 'vacancies',
    components: {VkIcon},
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
            this.vacancies = res.data.sort((a, b) => b.creationDate - a.creationDate);
          });
      }
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .imba-row {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;

        .imba-col.imba-col-main {
            flex-basis: 250px;
            flex-grow: 4;
        }

        .imba-col {
            flex-grow: 2;
            flex-shrink: 0;
            flex-basis: 75px;
        }

        .imba-col-small {
            flex-grow: 1;
        }
    }

    .vacancy-row {
        border-radius: 3px;
        background-color: #fff;
        padding: 0 0.5rem 0 1rem;
        color: #211A1E;
        text-decoration: none;
        height: 45px;
        font-size: 15px;
        margin-bottom: 5px;

        &:hover {
            box-shadow: 0 0 0 2px #e4e4e4;
            background-color: #fefeff;
        }

        &:active {
            box-shadow: 0 0 0 1px #e4e4e4;
        }
    }

    .imba-row-head {
        background-color: transparent;
        font-size: 13px;
        font-weight: bold;
        color: grey;
        padding: 0 0.5rem 0 1rem;
        margin-bottom: 4px;
    }

    .vacancy-status-block {
        width: 6px;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: #24bb64;
        border-radius: 3px 0 0 3px;
    }

    .vacancy-creation-time {
        display: flex;
        align-items: center;
        margin-left: auto;
        color: $secondary-color;
        font-size: 12px;

        .icon {
            margin-right: 4px;
            margin-top: 2px;

            * {
                stroke: $secondary-color
            }
        }
    }
</style>