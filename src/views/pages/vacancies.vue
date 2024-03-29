<template>
    <div class="container">
        <div class="heading">
            <h1 class="title">Список вакансий</h1>
        </div>

        <div class="imba-table">
            <div class="imba-row imba-row-head">
                <div class="imba-col imba-col-main">Позиция</div>
                <div class="imba-col imba-col-small">Отклики</div>
                <div class="imba-col imba-col-small">Создана</div>
                <div class="imba-col-action"></div>
                <div class="imba-col-action"></div>
                <div class="imba-col-action"></div>
            </div>
            <router-link :to="`/vacancies/${vacancy.id}`" v-for="(vacancy, i) in vacancies" :key="vacancy.id"
                         class="imba-row imba-row-link vacancy-row">
                <div class="vacancy-status-block is-active"></div>
                <div class="imba-col imba-col-main">
                    {{vacancy.position}}
                </div>
                <div class="imba-col imba-col-small" title="Откликов/Просмотров">
                    <b>{{vacancy.respondsCount}}</b>
                </div>
                <div class="imba-timestamp imba-col imba-col-small"
                     :title="new Date(vacancy.creationDate).toLocaleString()">
                    <vk-icon icon="clock" class="icon" :ratio="0.7"></vk-icon>
                    <span>{{ distanceInWords(new Date(vacancy.creationDate), new Date(), { locale: ru }) }} назад</span>
                </div>

                <div class="imba-col-action" title="Скопировать ссылку на вакансию">
                    <div class="imba-popper" v-if="vacancy.tooltipIsVisible">
                        Ссылка скопирована
                    </div>
                    <button @click.prevent="copyVacancyLink(vacancy)">
                        <vk-icon icon="link"></vk-icon>
                    </button>
                </div>

                <div class="imba-col-action" title="Редактировать">
                    <router-link :to="`/vacancies/${vacancy.id}/edit`">
                        <vk-icon icon="file-edit" ratio=".9"></vk-icon>
                    </router-link>
                </div>

                <div class="imba-col-action" title="Архивировать">
                    <button @click.prevent="archiveVacancy(vacancy, i)">
                        <vk-icon icon="future" ratio=".85"></vk-icon>
                    </button>
                </div>
            </router-link>

            <div v-if="archivedVacancies.length" class="archived-wrap">
                <h4>Архив</h4>

                <div class="imba-row imba-row-link vacancy-row is-archived"
                     v-for="(vacancy, i) in archivedVacancies"
                     :key="vacancy.id">
                    <div class="imba-col imba-col-main">
                        {{vacancy.position}}
                    </div>
                    <div class="imba-col-action" title="Восстановить">
                        <button @click.prevent="restoreVacancy(vacancy, i)">
                            <vk-icon icon="history" ratio=".85"></vk-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Companies, Vacancies} from '../../api';
    import {mapGetters} from 'vuex';
    import {distanceInWords} from 'date-fns';
    import ru from 'date-fns/locale/ru';
    import {VACANCY_URL} from '../../utils/constants';

    export default {
        name: 'vacancies',
        data() {
            return {
                vacancies: [],
                archivedVacancies: [],
                distanceInWords,
                ru
            };
        },
        computed: mapGetters({
            company: 'company'
        }),
        created() {
            this.$title('Вакансии');

            if (!this.company) {
                this.$store.dispatch('getUserAndCompany')
                    .then(this.getVacancies);
            } else {
                this.getVacancies();
            }
        },
        methods: {
            getVacancies() {
                Companies.getVacancies(this.company.id)
                    .then(res => {
                        this.vacancies =
                            res.data
                                .filter(e => !e.deleted)
                                .sort((a, b) => b.creationDate - a.creationDate)
                                .map(vacancy => {
                                    return {
                                        ...vacancy,
                                        tooltipIsVisible: false
                                    };
                                });

                        this.archivedVacancies = res.data.filter(e => e.deleted);
                    });
            },
            copyVacancyLink(vacancy) {
                this.$copyText(`${VACANCY_URL}/${vacancy.id}`).then(() => {
                    vacancy.tooltipIsVisible = true;
                    setTimeout(() => {
                        vacancy.tooltipIsVisible = false;
                    }, 2000);
                });
            },

            archiveVacancy(vacancy, index) {
                Vacancies.deleteVacancy(vacancy.id)
                    .then(() => {
                        this.vacancies.splice(index, 1);
                        this.archivedVacancies.push(vacancy);
                    });
            },

            restoreVacancy(vacancy, index) {
                Vacancies.restoreVacancy(vacancy.id)
                    .then(() => {
                        this.vacancies.push(vacancy);
                        this.archivedVacancies.splice(index, 1);
                    });
            }
        }
    };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .vacancy-row.is-archived {
        opacity: .5;
    }

    .vacancy-status-block {
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        border-radius: 3px 0 0 3px;

        &.is-active {
            background-color: #af25c4;
        }

        &.is-archived {
            background-color: #bbb94b;
        }
    }

    .archived-wrap {
        margin-top: 4rem;

        .vacancy-row {
            height: 40px;

            &:hover {
                box-shadow: none;
            }
        }

        h4 {
            font-size: 13px;
            margin-bottom: 2px;
            padding-left: 1rem;
            color: $secondary-color
        }
    }
</style>