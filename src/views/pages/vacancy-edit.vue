<template>
    <div>
        <slot v-if="vacancy">
            <router-link :to="`/vacancies/${vacancy.id}`" class="view-vacancy-link">← К просмотру вакансии</router-link>
            <div class="heading">
                <input class="heading-input" v-model="vacancy.position">
                <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
            </div>

            <wysiwyg class="vacancy-description" v-model="vacancy.description"></wysiwyg>

            <h2>Вопросы</h2>
            <questions-editor v-model="vacancy.questions"></questions-editor>

            <el-button class="save-button" type="primary" @click="saveVacancy">Сохранить</el-button>
        </slot>
    </div>
</template>

<script>
  import { Vacancies } from '../../api';
  import QuestionsEditor from '../../components/questions-editor';

  export default {
    name: 'vacancy-edit',
    components: {QuestionsEditor},
    data() {
      return {
        vacancy: {}
      };
    },
    computed: {
      id() {
        return this.$route.params.vacancyId;
      },
      company() {
        return this.$store.getters.company;
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
      },
      saveVacancy() {
        // TODO: вынести preparedQuestions
        const preparedQuestions = this.vacancy.questions.map((question, index) => {
          question.skills = question.skills.map(skill => {
            if (typeof skill === 'string') {
              return {name: skill};
            }
            return skill;
          });

          return {
            ...question,
            orderNumber: index
          };
        });

        Vacancies.setSecured(this.id, {
          ...this.vacancy,
          questions: preparedQuestions
        })
          .then(() => {
            this.$router.replace(`/vacancies/${this.id}`);
          });
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

    .save-button {
        float: right;
    }
</style>