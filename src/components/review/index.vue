<template>
    <div class="review-wrap">

        <el-steps :active="activeIndex" v-if="!finalDecisionIsActive && !finished" finish-status="success" class="review-steps">
            <el-step v-for="n in answers" :key="n.id"></el-step>
        </el-steps>

        <div class="answer-viewer" v-if="activeAnswer && !finalDecisionIsActive">
            <h3>Вопрос: {{activeAnswer.question.question}}</h3>
            <div class="answer-item" v-if="activeAnswer">
                <div class="video-block">
                    <video :src="activeAnswer.videoPath" controls></video>
                </div>

                <div class="review-actions">
                    <div class="skills-wrap">
                        <div v-for="skill in activeAnswer.question.respondSkills" :key="skill.id">
                            {{skill.name}}:
                            <el-rate v-model="reviews[activeIndex].skillsFeedback[skill.name]"></el-rate>
                        </div>
                    </div>

                    <el-input type="textarea" rows="5" v-model="reviews[activeIndex].comment" placeholder="Напишите комментарий"
                              class="comment-input"></el-input>
                </div>
            </div>
            <div class="review-pagination">
                <el-button type="text" size="big" v-if="activeIndex > 0" @click="setActiveAnswer(activeIndex - 1)">Назад</el-button>
                <el-button type="primary" size="big" @click="nextAnswerHandler()">Следующий</el-button>
            </div>
        </div>

        <div class="final-decision-wrap" v-if="finalDecisionIsActive && !finished">
            <h3>Напишите ваше финальное заключение по кандидату</h3>
            <el-input type="textarea" rows="5" v-model="respondReviewComment"
                      placeholder="" @input="showDecisionButtons = true"></el-input>

            <div class="decision-buttons" v-if="showDecisionButtons">
                <el-button icon="el-icon-close" plain @click="sendReview('DECLINE')">
                    Отказать
                </el-button>
                <el-button icon="el-icon-check" plain @click="sendReview('APPROVE')">
                    Принять
                </el-button>
            </div>
        </div>

        <div class="finished-block" v-if="finished">
            <h3>Спасибо за ревью!</h3>
            <p>
                Ваши комментарии и оценки сохранены.
            </p>
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
        reviews: [],
        activeIndex: 0,
        finished: false,
        finalDecisionIsActive: false,
        showDecisionButtons: false,
        respondReviewComment: ''
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      activeAnswer() {
        return this.answers[this.activeIndex];
      }
    },
    created() {
      Responds.getAnswers(this.responseId)
        .then(res => {
          this.answers = res.data;
          this.reviews = this.answers.map(answer => {

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
      nextAnswerHandler() {
        this.sendAnswerReview(this.reviews[this.activeIndex])
          .then(() => {
            this.setActiveAnswer(this.activeIndex + 1);
          });
      },

      sendAnswerReview(review) {
        return Answers.createAnswerFeedback(review.answerId, this.user.id, review);
      },

      setActiveAnswer(i) {
        if (i === this.answers.length) {
          this.finalDecisionIsActive = true;
          return;
        }

        this.activeIndex = i;
        Answers.get(this.activeAnswer.id, this.user.id);
      },

      sendReview(status) {
        Responds.createRespondFeedback(this.responseId, this.user.id, {
          respondReviewStatus: status,
          comment: this.respondReviewComment
        })
          .then(() => {
            this.finished = true;
          });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../assets/styles/variables";

    .review-steps {
        margin-bottom: 3rem;
    }

    .answer-viewer {
        max-width: 800px;
        margin: 0 auto;

        h3 {
            text-align: center;
            margin-bottom: 2rem;
        }
    }

    .answer-item {
        display: flex;
        margin: 0 auto 2rem;

        .video-block {
            width: 400px;
            height: 300px;
            margin-right: 2rem;
            background-color: #000;

            video {
                position: relative;
                display: block;
                max-width: 100%;
                max-height: 100%;
                margin: 0 auto;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .skills-wrap {
            margin-bottom: 1rem;
        }

        .comment-input {
            width: 370px;
        }
    }

    .review-pagination {
        text-align: center;

        button:first-of-type {
            margin-right: 2rem;
        }
    }

    .final-decision-wrap {
        margin: 0 auto;

        h3 {
            margin-top: 3rem;
            text-align: center;
        }
    }

    .finished-block {
        max-width: 400px;
        margin: 6rem auto 0;
    }
</style>