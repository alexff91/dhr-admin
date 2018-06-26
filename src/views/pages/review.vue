<template>
    <div>
        <div class="heading" v-if="vacancy && response">
            <h1 class="title">{{`${response.name} ${response.lastName}`}}</h1>
            <div class="sub-title">{{vacancy.position}}</div>
        </div>
        <answers-review :responseId="responseId"></answers-review>
    </div>
</template>

<script>
  import { Vacancies } from '../../api';
  import AnswersReview from '../../components/review/index';

  export default {
    name: 'review',
    components: {AnswersReview},
    data() {
      return {
        vacancy: null,
        response: null
      };
    },
    computed: {
      vacancyId() {
        return this.$route.params.vacancyId;
      },
      responseId() {
        return this.$route.params.responseId;
      }
    },
    created() {
      this.$title('Видеоинтервью: ');
      Vacancies.get(this.vacancyId)
        .then(res => {
          this.vacancy = res.data;
          this.$title(`Видеоинтервью: ${this.vacancy.position}`);
        });

      Vacancies.getResponses(this.vacancyId, this.responseId)
        .then(res => {
          this.response = res.data;

        });
    }
  };
</script>

<style scoped>

</style>