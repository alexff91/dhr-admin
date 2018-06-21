<template>
    <div class="review-wrap">
        <!-- TODO: отрефачить весь компонент и запилить норм ui-->
        answers review component:

        <div class="answer-item" v-for="(answer, i) in answers" :key="answer.id">
            <video :src="answer.videoPath" controls></video>

            <div class="answer-review">
                <div>{{answer.question.question}}</div>

                <div v-for="skill in answer.question.respondSkills" :key="skill.id">
                    {{skill.name}}:
                    <el-rate v-model="review[i].skillsFeedback[skill.name]"></el-rate>
                </div>

                <textarea v-model="review[i].comment" placeholder="Комментарий"></textarea>

                <el-button type="primary" @click="sendAnswerReview(i)">Отправить</el-button>

            </div>
        </div>

    </div>
</template>

<script>
  import { Answers, Responds } from '../../api';

  export default {
    name: 'answers-review',
    props: {
      responseId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        answers: [],
        review: [],
        test: null
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    created() {
      Responds.getAnswers(this.responseId)
        .then(res => {
          this.answers = res.data;
          this.review = this.answers.map(answer => {

            const skillsFeedback = {};
            answer.question.respondSkills.forEach(skill => {
              skillsFeedback[skill.name] = null;
            });

            return {
              answerId: answer.id,
              skillsFeedback,
              comment: ''
            };
          });
        });
    },
    methods: {
      sendAnswerReview(answerId) {
        Answers.createAnswerFeedback(this.review[answerId].answerId, this.user.id, this.review[answerId]);
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/styles/variables";

    .answer-item {
        border-bottom: 1px solid #e4e4e4;
        display: flex;

        textarea {
            background-color: #fff;
            border: 1px solid $secondary-color;
        }
    }
</style>