<template>
    <div>
        <div v-if="value.length === 0">
            Вы еще не добавили вопросы.
        </div>

        <div class="imba-table" v-if="value.length">
            <div class="imba-row imba-row-head">
                <div class="imba-col-action">&nbsp;</div>
                <div class="imba-col imba-col-main">Вопрос</div>
                <div class="imba-col imba-col-main">Навыки</div>
                <div class="imba-col">Время на ответ (сек.)</div>
                <div class="imba-col">Время на подготовку (сек.)</div>
                <div class="imba-col-action">&nbsp;</div>
            </div>

            <draggable :list="value" @start="drag=true" @end="drag=false" :options="{handle:'.move-question'}">
                <div v-for="(question, i) in value" :key="i" class="imba-row question-row">
                    <div class="imba-col-action move-question">
                        <div class="move-icon"></div>
                    </div>
                    <div class="imba-col imba-col-main question-text-col">
                        <textarea rows="2" class="imba-input" v-model="question.question" placeholder="Введите вопрос"></textarea>
                    </div>
                    <div class="imba-col imba-col-main">
                        <el-select
                                no-data-text="Добавьте новый навык"
                                v-model="question.skills"
                                multiple
                                filterable
                                allow-create
                                value-key="id"
                                placeholder="Выберите навык">
                            <el-option
                                    v-for="skill in skills"
                                    :key="skill.id"
                                    :label="skill.name"
                                    :value="skill">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="imba-col">
                        <input class="imba-input imba-number" v-model.number="question.durationMax" type="number" min="0" max="180">
                    </div>
                    <div class="imba-col">
                        <input class="imba-input imba-number" v-model.number="question.durationToRead" type="number" min="0" max="180">
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
</template>

<script>
  import { Companies } from '../api/index';
  import { mapGetters } from 'vuex';
  import draggable from 'vuedraggable';

  export default {
    name: 'questions-editor',
    components: {draggable},
    props: {
      value: {
        type: Array,
        default: () => [{}]
      }
    },
    data() {
      return {
        skills: []
      };
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      Companies.getSkills(this.company.id)
        .then(res => {
          this.skills = res.data;
        });
    },
    methods: {
      addQuestion() {
        this.value.push({
          'durationMax': 60,
          'durationToRead': 15,
          'isCompulsory': true,
          'skills': [],
          'question': ''
        });
      },
      removeQuestion(index) {
        this.value.splice(index, 1);
      }
    }
  };
</script>

<style scoped>

</style>