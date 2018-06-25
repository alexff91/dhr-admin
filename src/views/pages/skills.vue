<template>
    <div>
        <div class="heading">
            <h1 class="title">Навыки</h1>
            <p class="descriptor">
                К каждому вопросу интервью рекомендуется привязать ожидаемый навык.<br>
                Набор требуемых навыков помогает быстрее оставлять фидбек экспертами после просмотра видео ответа.
            </p>
        </div>

        <div v-if="skills.length">
            <div v-for="(skill, i) in skills" :key="skill.id" class="skill-block">
                <input ref="skill" type="text" v-model="skill.name" @focus="$event.target.select()">
                <button @click="removeSkill(i)" class="remove-button">
                    <vk-icon icon="close"></vk-icon>
                </button>
            </div>
        </div>

        <div class="add-skill-wrap">
            <el-button type="text" @click="addSkill">+ Добавить навык</el-button>
        </div>

        <el-button class="save-button" type="primary" @click="saveSkills">Сохранить</el-button>
    </div>
</template>

<script>
  import { Companies } from '../../api';
  import { mapGetters } from 'vuex';

  export default {
    name: 'skills',
    data() {
      return {
        skills: []
      };
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      if (!this.company) {
        this.$store.dispatch('getUserAndCompany')
          .then(this.getSkills);
      } else {
        this.getSkills();
      }

      this.$title('Конструктор навыков');
    },
    methods: {
      getSkills() {
        Companies.getSkills(this.company.id)
          .then(res => {
            this.skills = res.data;
          });
      },
      saveSkills() {
        Companies.setSkills(this.company.id, this.skills);
      },

      addSkill() {
        this.skills.push({
          name: 'Навык'
        });

        this.$nextTick(() => {
          this.$refs.skill[this.skills.length - 1].focus();
        });
      },

      removeSkill(i) {
        Companies.deleteSkill(this.company.id, this.skills[i].id)
          .then(res => {
            console.log(res);
            this.skills.splice(index, 1);
          });
      }
    }
  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .skill-block {
        display: block;
        max-width: 400px;
        margin-bottom: 6px;
        position: relative;

        input {
            width: 100%;
            height: 100%;
            padding: 14px 20px;
            font-size: 18px;
            color: #3b3e44;
            background-color: #f5f5f5;
            box-shadow: inset 0 0 0 2px #f1f1f1;
            border-radius: 4px;

            &:hover {
                background-color: #f1f1f1;
                box-shadow: inset 0 0 0 2px #e9e9e9;
            }

            &:focus {
                background-color: #eee;
                box-shadow: inset 0 0 0 2px #e1e1e1;
                color: #211a1e;
            }
        }

        &:hover .remove-button {
            opacity: 1;
        }

        .remove-button {
            position: absolute;
            opacity: 0;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            align-items: center;
            padding: 8px;
            box-sizing: content-box;
            width: 20px;
            height: 20px;
            cursor: pointer;

            * {
                stroke: $secondary-color;
            }

            &:hover * {
                stroke: $base-color;
            }
        }
    }

    .save-button {
        float: right;
    }
</style>