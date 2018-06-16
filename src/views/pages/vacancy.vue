<template>
    <div>
        <div class="heading">
            <h1 class="title">Вакансия «{{vacancy.position}}»
                <router-link :to="`/vacancies/${vacancy.id}/edit`" class="edit-heading">
                    <vk-icon icon="pencil" class="icon"></vk-icon>
                    <span>Редактировать</span>
                </router-link>
            </h1>
            <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
        </div>

        <div class="imba-table" v-if="responses.length">
            <div class="imba-row imba-row-head">
                <div class="imba-col imba-col-main">Имя Фамилия</div>
                <div class="imba-col imba-col-main">Email</div>
                <div class="imba-col imba-col-small">Статус</div>
                <div class="imba-col imba-col-small"></div>
            </div>

            <router-link :to="`/responses/${response.id}`" class="response-row imba-row imba-row-link" v-for="response in
            responses">
                <div class="imba-col imba-col-main">{{ response.name }} {{ response.lastName }}</div>
                <div class="imba-col imba-col-main">{{response.email}}</div>
                <div class="imba-col imba-col-small">{{RESPONSE_STATUS_RU[response.status]}}</div>
                <div class="imba-timestamp imba-col imba-col-small" :title="new Date(response.startDate).toLocaleString()">
                    <vk-icon icon="clock" class="icon" :ratio="0.7"></vk-icon>
                    <span>{{ distanceInWords(new Date(response.startDate), new Date(), { locale: ru }) }} назад</span>
                </div>
            </router-link>
        </div>

        <div v-if="!responses.length">
            Откликов по этой вакансии еще нет.
        </div>
    </div>
</template>

<script>
  import { Vacancies } from '../../api';
  import { distanceInWords } from 'date-fns';
  import ru from 'date-fns/locale/ru';
  import { RESPONSE_STATUS_RU } from '../../utils/constants';

  export default {
    name: 'vacancy',
    data() {
      return {
        vacancy: {},
        responses: [],
        distanceInWords,
        ru,
        RESPONSE_STATUS_RU
      };
    },
    computed: {
      id() {
        return this.$route.params.vacancyId;
      }
    },
    created() {
      this.$title('Вакансия');

      Vacancies.get(this.id)
        .then(res => {
          this.vacancy = res.data;
        });

      Vacancies.getResponses(this.id)
        .then(res => {
          this.responses = res.data;
        });
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .edit-heading {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        font-size: 14px;
        color: $secondary-color;
        text-decoration: none;
        margin-left: 4px;

        &:hover {
            color: $primary-color;

            * {
                stroke: $primary-color;
            }
        }

        * {
            stroke: $secondary-color;
        }

        .icon {
            margin-right: 2px;
        }
    }
</style>