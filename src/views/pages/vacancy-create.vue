<template>
    <div>
        <div class="heading">
            <h1 class="title">Новая вакансия</h1>
        </div>

        <el-input placeholder="Название вакансии" v-model="position"></el-input>
        <br>
        <br>
        <yimo-vue-editor placeholder="Опишите вакансию" class="vacancy-description" v-model="description"></yimo-vue-editor>

        <h2>Вопросы</h2>
        <questions-editor v-model="questions"></questions-editor>

        <h3>Промо-видео вакансии или компании</h3>
        <div class="heading">
            <input type="text" v-model="video" class="heading-input">
        </div>
        <el-button class="create-button" @click="createVacancy" type="primary">Создать</el-button>
    </div>
</template>

<script>
    import {Companies} from '../../api';
    import {mapGetters} from 'vuex';
    import QuestionsEditor from '../../components/questions-editor';
    import YimoVueEditor from 'yimo-vue-editor'
    export default {
        name: 'vacancies',
        components: {QuestionsEditor, YimoVueEditor},
        data() {
            return {
                position: '',
                description: '',
                questions: [],
                video: ''
            };
        },
        computed: mapGetters({
            company: 'company'
        }),
        created() {
            this.$title('Новая вакансия');
        },
        methods: {
            createVacancy() {
                // TODO: вынести preparedQuestions
                const preparedQuestions = this.questions.map((question, index) => {
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

                Companies.createVacancy(this.company.id, {
                    creationDate: new Date().toISOString(),
                    description: this.description || '',
                    position: this.position || 'Должность без названия',
                    questions: preparedQuestions,
                    video: this.video
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