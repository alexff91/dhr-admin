<template>
    <div>
        <slot v-if="vacancy">
            <router-link :to="`/vacancies/${vacancy.id}`" class="view-vacancy-link">← К просмотру вакансии</router-link>
            <div class="heading">
                <input class="vacancy-position-input" v-model="vacancy.position">
                <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
            </div>

            <wysiwyg class="vacancy-description" v-model="vacancy.description"></wysiwyg>

            <div class="questions" v-if="vacancy.questions">
                <h2>Вопросы</h2>

                <div class="" v-if="vacancy.questions.length === 0">
                    Вы еще не добавили вопросы.
                </div>

                <div class="imba-table" v-if="vacancy.questions.length">
                    <div class="imba-row imba-row-head">
                        <div class="imba-col-action">&nbsp;</div>
                        <div class="imba-col imba-col-main">Вопрос</div>
                        <div class="imba-col">Время на ответ (сек.)</div>
                        <div class="imba-col">Время на подготовку (сек.)</div>
                        <div class="imba-col-action">&nbsp;</div>
                    </div>


                    <draggable v-model="vacancy.questions" @start="drag=true" @end="drag=false" :options="{handle:'.move-question'}">
                        <div v-for="(question, i) in vacancy.questions" :key="i" class="imba-row question-row">
                            <div class="imba-col-action move-question">
                                <div class="move-icon"></div>
                            </div>
                            <div class="imba-col imba-col-main question-text-col">
                                <textarea rows="2" class="imba-input" v-model="question.question"></textarea>
                            </div>
                            <div class="imba-col">
                                <input class="imba-input" v-model.number="question.durationMax" type="number" min="0" max="180">
                            </div>
                            <div class="imba-col">
                                <input class="imba-input" v-model.number="question.durationToRead" type="number" min="0">
                            </div>
                            <div class="imba-col-action">
                                <button @click="removeQuestion(i)">
                                    <vk-icon icon="trash"></vk-icon>
                                </button>
                            </div>
                        </div>
                    </draggable>
                </div>


                <el-button @click="addQuestion" type="text">+ Добавить вопрос</el-button>
            </div>

            <el-button class="save-button" type="primary" @click="saveVacancy">Сохранить</el-button>
        </slot>
    </div>
</template>

<script>
  import { Vacancies } from '../../api';
  import draggable from 'vuedraggable';

  export default {
    name: 'vacancy-edit',
    components: {draggable},
    data() {
      return {
        vacancy: {}
      };
    },
    computed: {
      id() {
        return this.$route.params.vacancyId;
      }
    },
    created() {
      this.$title('Редактирование вакансии');
      this.getVacancy();
    },

    methods: {
      getVacancy() {
        return Vacancies.get(this.id)
          .then(res => {
            this.vacancy = res.data;
            this.initQuestions();
          });
      },
      initQuestions() {
        this.vacancy.questions.sort((a, b) => a.orderNumber - b.orderNumber);
        this.vacancy.questions.forEach(e => {
          e.durationMax /= 1000;
          e.durationToRead /= 1000;
        });

      },
      saveVacancy() {
        const preparedQuestions = this.vacancy.questions.map((question, index) => {
          return {
            ...question,
            orderNumber: index,
            durationToRead: question.durationToRead * 1000,
            durationMax: question.durationMax * 1000
          };
        });

        Vacancies.put(this.id, {
          ...this.vacancy,
          questions: preparedQuestions
        })
          .then(() => {
            this.$router.replace(`/vacancies/${this.id}`);
          });
      },
      addQuestion() {
        this.vacancy.questions.push({
          'durationMax': 60,
          'durationToRead': 15,
          'isCompulsory': true,
          'skills': [],
          'question': ''
        });
      },
      removeQuestion(index) {
        this.vacancy.questions.splice(index, 1);
      }
    }
  };
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/variables";

    .view-vacancy-link {
        display: block;
        font-size: 14px;
        color: $secondary-color;
        margin-bottom: .5rem;
        text-decoration: none;

        &:hover {
            color: $primary-color;
        }
    }

    .vacancy-position-input {
        width: 100%;
        font-size: 24px;
        padding: 8px;
        margin-bottom: .5rem;
        border: 1px solid $secondary-color;
    }

    .vacancy-description {
        margin-bottom: 2rem;
    }

    .vacancy-questions {
        margin-bottom: 2rem;

        .question-item {
            display: flex;
            flex-direction: row;
            font-size: 14px;
            background-color: #fff;
            margin-bottom: .5rem;
            border-radius: 3px;
            padding: .5rem 1.25rem;
        }

        .question-actions {
            display: flex;
            margin-left: auto;
        }

        .question-duration-max, .question-duration-to-read {
            padding: 0 5px;
        }
    }

    .save-button {
        float: right;
    }
</style>