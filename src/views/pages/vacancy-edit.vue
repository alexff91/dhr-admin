<template>
    <div>
        <slot v-if="vacancy">
            <div class="heading">
                <h1 class="title">{{vacancy.position}}</h1>
                <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
            </div>

            <wysiwyg class="vacancy-description" v-model="vacancy.description"></wysiwyg>


            <div v-if="questions.length" class="vacancy-questions">
                <h2>Вопросы</h2>
                <div v-for="question in questions" class="question-item">
                    <div class="question-text">{{question.question}}</div>
                    <div class="question-actions">
                        <div class="question-duration-max">{{question.durationMax}} мс</div>
                        <div class="question-duration-to-read">{{question.durationToRead}} мс</div>
                        <div class="question-is-compulsory">{{question.isCompulsory}}</div>
                    </div>

                </div>
            </div>


            <el-button class="save-button" type="primary" @click="saveVacancy">Сохранить</el-button>
        </slot>
    </div>
</template>

<script>
  import { Vacancies } from '../../api';

  export default {
    name: 'vacancy-edit',
    data() {
      return {
        vacancy: null,
        questions: []
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
      this.getQuestions();
    },

    methods: {
      getVacancy() {
        return Vacancies.get(this.id)
          .then(res => {
            this.vacancy = res.data;
          });
      },
      getQuestions() {
        return Vacancies.getQuestions(this.id)
          .then(res => {
            this.questions = res.data;
          });
      },
      saveVacancy() {
        Vacancies.put(this.id, this.vacancy);
      }
    }
  };
</script>

<style lang="scss" scoped>
    .heading {
        margin-bottom: 1.5rem;

        h1 {
            margin-bottom: .5rem;
        }

        .sub-title {
            font-size: 13px;
            color: gray;
        }
    }

    .vacancy-description {
        background-color: #fff;
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