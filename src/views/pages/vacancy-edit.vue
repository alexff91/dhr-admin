<template>
    <div>
        <slot v-if="vacancy">
            <router-link :to="`/vacancies/${vacancy.id}`" class="go-back-link">← К просмотру вакансии</router-link>
            <div class="heading">
                <input class="heading-input" v-model="vacancy.position">
                <div class="sub-title">Вакансия создана {{new Date(vacancy.creationDate).toLocaleString()}}</div>
            </div>
            <h2>Описание</h2>
            <yimo-vue-editor class="vacancy-description" v-model="vacancy.description"></yimo-vue-editor>

            <h2>Вопросы</h2>
            <questions-editor v-model="vacancy.questions"></questions-editor>

            <h3>Промо-видео вакансии или компании</h3>
            <div class="heading">
                <input type="text" v-model="vacancy.video" class="heading-input">
            </div>

            <el-button class="save-button" type="primary" @click="saveVacancy">Сохранить</el-button>
        </slot>
    </div>
</template>

<script>
    import {Vacancies} from '../../api';
    import QuestionsEditor from '../../components/questions-editor';
    import YimoVueEditor from 'yimo-vue-editor'
    export default {
        name: 'vacancy-edit',
        components: {QuestionsEditor, YimoVueEditor},
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

    .save-button {
        float: right;
    }
</style>