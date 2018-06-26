<template>
    <div>
        <router-link :to="`/vacancies/${vacancyId}/`" class="go-back-link">← К списку откликов</router-link>
        <div class="heading" v-if="vacancy && respond">
            <h1 class="title">{{`${respond.name} ${respond.lastName}`}}</h1>
            <div class="sub-title">{{vacancy.position}}</div>
        </div>

        <div class="helpers">
            <div class="helper-block">
                <router-link :to="`/vacancies/${vacancyId}/edit`" class="edit-heading">
                    <!--<vk-icon icon="pencil" class="icon"></vk-icon>-->
                    <el-icon class="el-icon-edit"></el-icon>
                    <span>Редактировать вакансию</span>
                </router-link>
            </div>

            <div class="helper-block">
                <el-button @click="copyExpertLink()" type="text">
                    <!--<vk-icon icon="copy" class="icon"></vk-icon>-->
                    <el-icon class="el-icon-news"></el-icon>

                    <span>Скопировать ссылку для эксперта</span>
                </el-button>
            </div>
        </div>

        <div v-if="respond">
            <h3>Контактные данные</h3>

            <div class="respond-data-block">
                <div class="sub-head">Имя Фамилия</div>
                <div>{{`${respond.name} ${respond.lastName}`}}</div>
            </div>
            <div class="respond-data-block" v-if="respond.phone">
                <div class="sub-head">Телефон</div>
                {{respond.phone}}
            </div>

            <div class="respond-data-block">
                <div class="sub-head">Email</div>
                {{respond.email}}
            </div>

            <div class="respond-data-block" v-if="respond.reviewStatus">
                <div class="sub-head">Статус</div>
                {{RESPONSE_VIEWED_STATUS_RU[respond.reviewStatus]}}
            </div>
        </div>

        <br>
        <br>

        <el-tabs tab-position="top" style="">
            <el-tab-pane label="Рейтинг кандидата" class="final-decision-wrap" v-if="respond">
                <h3>Рейтинг кандидата</h3>

                <div v-for="(skill, key) in skillsSummary" class="skill-summary">
                    <div class="skill-name">{{key}}</div>
                    <el-rate v-model="skillsSummary[key]" class="skill-value" disabled></el-rate>
                </div>
                <!--<el-input type="textarea" rows="5" v-model="respondReviewComment"-->
                <!--placeholder="Напишите пару строк почему вы приняли такое решение"></el-input>-->

                <div class="decision-buttons" style="text-align: left;">
                    <el-button icon="el-icon-close" plain
                               :type="respond.reviewStatus === 'DECLINED' ? 'primary' : ''"
                               @click="declineResponse()">
                        Отказать
                    </el-button>
                    <el-button icon="el-icon-check" plain
                               :type="respond.reviewStatus === 'ACCEPTED' ? 'primary' : ''"
                               @click="acceptResponse()">
                        Принять
                    </el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane :label="`Заключения экспертов ${reviews.length}`">
                <div v-if="!reviews.length">
                    Заключений нет
                </div>

                <div class="imba-table" v-if="reviews.length">
                    <div class="imba-row imba-row-head">
                        <div class="imba-col imba-col-main">Пользователь</div>
                        <div class="imba-col imba-col-main">Комментарий</div>
                        <div class="imba-col">Решение</div>
                    </div>

                    <div class="imba-row imba-row-link" v-for="review in reviews" :key="review.id">
                        <div class="imba-col imba-col-main">{{review.user.login}}</div>
                        <div class="imba-col imba-col-main">{{review.comment}}</div>
                        <div class="imba-col">
                            <template v-if="review.respondReviewStatus === 'APPROVE'">
                                <el-icon class="el-icon-success"></el-icon>
                                {{RESPONSE_REVIEW_STATUS_RU[review.respondReviewStatus]}}
                            </template>

                            <template v-if="review.respondReviewStatus === 'DECLINE'">
                                <el-icon class="el-icon-error"></el-icon>
                                {{RESPONSE_REVIEW_STATUS_RU[review.respondReviewStatus]}}
                            </template>
                        </div>
                    </div>
                </div>

            </el-tab-pane>

            <el-tab-pane label="Интервью">
                <answers-review :responseId="responseId" style="max-width: 900px;"></answers-review>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
  import { Responds, Vacancies } from '../../api';
  import AnswersReview from '../../components/review/index';
  import { RESPONSE_REVIEW_STATUS_RU, RESPONSE_VIEWED_STATUS_RU } from '../../utils/constants';

  export default {
    name: 'responses',
    components: {AnswersReview},
    data() {
      return {
        vacancy: null,
        respond: null,
        respondReviewComment: '',
        reviews: [],
        skillsSummary: {},
        RESPONSE_REVIEW_STATUS_RU,
        RESPONSE_VIEWED_STATUS_RU
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

      Responds.getAllReviews(this.responseId)
        .then(res => {
          this.reviews = res.data;
        });

      Responds.getSkillsSummary(this.responseId)
        .then(() => {

          this.skillsSummary = {
            'Коммуникабельность': 3,
            'Открытость': 4,
            'Мотивация': 5,
            'Agile': 2,
            'Системное мышление': 5,
            'Нацеленность на результат': 4,
            'Опыт тестирования': 3
          };
        });
    },

    methods: {
      acceptResponse() {
        Vacancies.acceptResponse(this.vacancyId, this.responseId);
        this.respond.reviewStatus = 'ACCEPTED';
      },
      declineResponse() {
        Vacancies.declineResponse(this.vacancyId, this.responseId);
        this.respond.reviewStatus = 'DECLINED';
      },

      copyExpertLink() {
        this.$copyText(`${location.href}/review`).then(() => {
          // vacancy.tooltipIsVisible = true;
          setTimeout(() => {
            // vacancy.tooltipIsVisible = false;
          }, 2000);
        });
      }
    }
  };
</script>

<style lang="scss">

    @import "../../assets/styles/variables";

    .respond-data-block {
        margin-bottom: .75rem;

        .sub-head {
            color: $secondary-color;
            font-size: 14px;
        }
    }

    .skill-summary {
        display: flex;
        max-width: 500px;
        line-height: 1.8;

        .skill-name {
            font-size: 18px;
        }

        .skill-value {
            margin-left: auto;
        }
    }
</style>