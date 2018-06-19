<template>
    <div>
        <div class="heading">
            <h1 class="title">Отклик {{vacancyId}} / {{responseId}}</h1>
        </div>

        <div v-if="respond">
            <h2>Контактные данные</h2>

            <div>{{`${respond.name} ${respond.lastName}`}}</div>
            <div><a :href="`mailto:${respond.email}`">{{`${respond.email}`}}</a></div>
        </div>

        <!--<div class="response-wrap" v-if="questionResponses.length">-->
        <!--<div class="question-item" v-for="question in questionResponses" :key="question.id">-->
        <!--{{question}}-->

        <!--<video :src="question.videoPath" controls></video>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  import { Responds, Vacancies } from '../../api';

  export default {
    name: 'responses',
    data() {
      return {
        respond: null,
        questionResponses: {}
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
      this.$title('Отклики');
      Vacancies.getResponses(this.vacancyId, this.responseId)
        .then(res => {
          this.respond = res.data;
        });

      Responds.getResponses(this.responseId)
        .then(res => {
          this.answers = res.data;
        });
    }
  };
</script>