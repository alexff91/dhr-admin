<template>
    <div>
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <div class="imba-table">
            <div class="imba-row imba-row-head">
                <div class="imba-col imba-col-main">Позиция</div>
                <div class="imba-col">Статус</div>
                <div class="imba-col">Отклики</div>
                <div class="imba-col imba-col-small">Создана</div>
            </div>
            <router-link :to="`/vacancies/${vacancy.id}`" v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy-row imba-row">
                <div class="imba-col imba-col-main">
                    {{vacancy.position}}
                </div>
                <div class="imba-col">
                    В работе
                </div>
                <div class="imba-col">
                    11/65
                </div>
                <div class="vacancy-creation-time imba-col imba-col-small">
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
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: .5rem;

        padding: 0 1rem;

        .imba-col {
            flex-grow: 3;
            flex-shrink: 0;
            flex-basis: 75px;
        }

        .imba-col-small {
            flex-grow: 1;
        }

        .imba-col-main {
            flex-basis: 250px;
            flex-grow: 0;
        }
    }

    .vacancy-row {
        border-radius: 3px;
        background-color: #fff;
        padding: 1rem;
        color: $base-color;
        text-decoration: none;
        height: 60px;

        &:hover {
            box-shadow: 0 0 0 2px $primary-color;
        }
    }

    .imba-row-head {
        background-color: transparent;
        font-size: 14px;
        font-weight: bold;
        color: grey
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