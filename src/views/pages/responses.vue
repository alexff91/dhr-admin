<template>
    <div>
        <!-- TODO: отрефачить весь компонент и запилить норм ui-->

        <div class="heading" v-if="vacancy && respond">
            <h1 class="title">{{`${respond.name} ${respond.lastName}`}}</h1>
            <div class="sub-title">{{vacancy.position}}</div>
        </div>

        <div v-if="respond">
            <h3>Контактные данные</h3>

            <div>{{`${respond.name} ${respond.lastName}`}}</div>
            <div>{{respond.phone}}</div>
            <div><a :href="`mailto:${respond.email}`">{{`${respond.email}`}}</a></div>
        </div>

        <div class="">
            Решение:
            <select v-model="respondReviewStatus">
                <option value="APPROVE">approve</option>
                <option value="DECLINE">decline</option>
            </select>

            Комментарий:
            <textarea v-model="respondReviewComment"></textarea>

            <el-button type="primary" @click="sendReview">Отправить</el-button>
        </div>

        <br>
        <br>
        <br>

        <answers-review :responseId="responseId"></answers-review>

    </div>
</template>

<script>
  import { Responds, Vacancies } from '../../api';
  import AnswersReview from '../../components/review/index';

  export default {
    name: 'responses',
    components: {AnswersReview},
    data() {
      return {
        vacancy: null,
        respond: null,
        respondReviewStatus: null,
        respondReviewComment: null
      };
    },
    computed: {
      vacancyId() {
        return this.$route.params.vacancyId;
      },
      responseId() {
        return this.$route.params.responseId;
      },
      user() {
        return this.$store.getters.user;
      }
    },
    created() {
      this.$title('Отклики');
      Vacancies.get(this.vacancyId)
        .then(res => {
          this.vacancy = res.data;
        });

      Vacancies.getResponses(this.vacancyId, this.responseId)
        .then(res => {
          this.respond = res.data;
        });
    },

    methods: {
      sendReview() {
        Responds.createRespondFeedback(this.responseId, this.user.id, {
          respondReviewStatus: this.respondReviewStatus,
          comment: this.respondReviewComment
        });
      }
    }
  };
</script>

<style lang="scss">
</style>