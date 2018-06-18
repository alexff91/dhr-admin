<template>
    <div>
        <div class="heading">
            <h1 class="title">Новая вакансия</h1>
        </div>

        <el-input placeholder="Название вакансии" v-model="position"></el-input>
        <br>
        <br>
        <wysiwyg placeholder="Опишите вакансию" class="vacancy-description" v-model="description"></wysiwyg>

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

        <el-button class="create-button" @click="createVacancy" type="primary">Создать</el-button>
    </div>
</template>

<script>
  import { Companies } from '../../api';
  import { mapGetters } from 'vuex';
  import draggable from 'vuedraggable';

  export default {
    name: 'vacancies',
    components: {draggable},
    data() {
      return {
        position: '',
        description: '',
        questions: []
      };
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      this.$title('Новая вакансия');
    },
    methods: {
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

      createVacancy() {
        const preparedQuestions = this.questions.map((question, index) => {
          return {
            ...question,
            orderNumber: index,
            durationToRead: question.durationToRead * 1000,
            durationMax: question.durationMax * 1000
          };
        });

        Companies.createVacancy(this.company.id, {
          creationDate: new Date().toISOString(),
          description: this.description || '',
          position: this.position || 'Должность без названия',
          questions: preparedQuestions
        })
          .then(res => {
            this.$router.replace(`/vacancies/${res.data}`);
          });
      }
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .create-button {
        float: right;
    }


</style>