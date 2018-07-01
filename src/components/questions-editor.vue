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
                <div class="imba-col">Время на ответ</div>
                <div class="imba-col">Время на подготовку</div>
                <div class="imba-col-action">&nbsp;</div>
            </div>

            <draggable :list="value" @start="drag=true" @end="drag=false" :options="{handle:'.move-question'}">
                <div v-for="(question, i) in value" :key="i" class="imba-row question-row">
                    <div class="imba-col-action move-question">
                        <div class="move-icon"></div>
                    </div>
                    <div class="imba-col imba-col-main question-text-col">
                        <el-input type="textarea" autosize v-model="question.question" placeholder="Введите вопрос" size="mini"></el-input>
                        <!--<textarea rows="2" class="imba-input"  ></textarea>-->
                    </div>
                    <div class="imba-col imba-col-main">
                        <el-select
                                no-data-text="Добавьте новый навык"
                                v-model="question.skills"
                                multiple
                                filterable
                                allow-create
                                value-key="id"
                                placeholder="Выберите навык" size="small">
                            <el-option
                                    v-for="skill in companySkills.concat(question.skills)"
                                    :key="skill.id"
                                    :label="skill.name"
                                    :value="skill">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="imba-col duration-select-wrap">
                        <el-select v-model="question.durationMax" placeholder="Длительность" size="small">
                            <el-option v-for="duration in durationMaxOptions"
                                       :key="duration"
                                       :label="parseMillisecondsIntoReadableTime(duration)"
                                       :value="duration"></el-option>
                        </el-select>
                    </div>
                    <div class="imba-col duration-select-wrap">
                        <el-select v-model="question.durationToRead" placeholder="Длительность" size="mini">
                            <el-option v-for="duration in durationToReadOptions"
                                       :key="duration"
                                       :label="duration ? parseMillisecondsIntoReadableTime(duration) : 'Без подготовки'"
                                       :value="duration"></el-option>
                        </el-select>
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
  import { parseMillisecondsIntoReadableTime } from '../utils';

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
        companySkills: [],
        durationMaxOptions: [
          15000, 30000, 60000, 90000, 120000, 150000, 180000
        ],
        durationToReadOptions: [
          0, 5000, 10000, 15000
        ],
        parseMillisecondsIntoReadableTime
      };
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      Companies.getSkills(this.company.id)
        .then(res => {
          this.companySkills = res.data;
        });
    },
    methods: {
      addQuestion() {
        this.value.push({
          'durationMax': 120000,
          'durationToRead': 10000,
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