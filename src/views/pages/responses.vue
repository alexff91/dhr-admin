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

        <div class="response-wrap" v-if="answers.length">

            <h2>Видеоответы</h2>
            <div class="question-item" v-for="answer in answers" :key="answer.id">
                <video :src="answer.videoPath" controls></video>
            </div>
        </div>
    </div>
</template>

<script>
  import { Responds, Vacancies } from '../../api';

  export default {
    name: 'responses',
    data() {
      return {
        respond: null,
        answers: {}
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

      Responds.getAnswers(this.responseId)
        .then(res => {
          this.answers = res.data;
        });
    }
  };
</script>