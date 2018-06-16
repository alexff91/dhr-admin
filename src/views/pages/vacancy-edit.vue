<template>
    <div>
        <slot v-if="vacancy">
            <router-link :to="`/vacancies/${vacancy.id}`" class="view-vacancy-link">← К просмотру вакансии</router-link>
            <div class="heading">
                <input class="vacancy-position-input" v-model="vacancy.position">
                <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
            </div>

            <wysiwyg class="vacancy-description" v-model="vacancy.description"></wysiwyg>

            <div class="questions">
                <h2>Вопросы</h2>

                <div class="" v-if="questions.length === 0">
                    Вы еще не добавили вопросы.
                </div>

                <div class="imba-table" v-if="questions.length">
                    <div class="imba-row imba-row-head">
                        <div class="imba-col-action">&nbsp;</div>
                        <div class="imba-col imba-col-main">Вопрос</div>
                        <div class="imba-col">Время на ответ (сек.)</div>
                        <div class="imba-col">Время на подготовку (сек.)</div>
                        <div class="imba-col-action">&nbsp;</div>
                    </div>


                    <draggable v-model="questions" @start="drag=true" @end="drag=false" :options="{handle:'.move-question'}">
                        <div v-for="(question, i) in questions" :key="i" class="imba-row question-row">
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
      },

      // TODO: вынести в компонент
      getRandomQuestionContent() {
        const questions = [
          'Чем интересна наша вакансия?', 'Какая главная задача вашей позиции?',
          'Как вы проводите свободное время? Расскажите про ваше любимое хобби',
          'Расскажите про команду, в которой вы привыкли работать',
          'Расскажите немного о себе',
          'Как смотрите на жизнь, какие видите в ней сложности и как с ними справляетесь?',
          'Чем вас привлекает работа у нас в данной должности?',
          'Почему вы считаете себя достойным занять эту должность? В чем ваши преимущества перед другими кандидатами?',
          'Каковы ваши сильные стороны?',
          'Почему вы решили сменить место работы?',
          'Как вы представляете свое положение через пять (десять) лет?',
          'На какую зарплату вы рассчитываете?'
        ];

        return questions[Math.floor(Math.random() * questions.length)];
      },
      addQuestion() {
        this.questions.push({
          'durationMax': 120,
          'durationToRead': 15,
          'isCompulsory': true,
          'question': this.getRandomQuestionContent()
        });
      },
      removeQuestion(index) {
        this.questions.splice(index, 1);
      },
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