<template>
    <div>
        <div class="heading">
            <h1 class="title">Редактировать</h1>
        </div>
        <el-form class="edit-form" auto-complete="on" :model="model" :rules="rules" ref="edit-form"
                 label-position="top">
            <h2 class="heading">Параметры вакансии</h2>
            <el-form-item label="Позиция" prop="position">
                <el-input type="text" v-model="model.position" placeholder="Введите название вакинсии" />
            </el-form-item>
            <el-form-item label="Описание вакансии" prop="description">
                <vue-editor v-model="model.description"></vue-editor>
            </el-form-item>

            <el-button :plain="true" type="success" :loading="loading" @click="submit('edit-form')">{{ loading ?
                'Loading...' :
                'Обновить' }}
            </el-button>
        </el-form>
    </div>

</template>

<script>
  import { VueEditor } from 'vue2-editor';
  import axios from 'axios';

  export default {
    name: 'updateVacancy',
    components: {
      VueEditor
    },
    computed: {
      vacancyId() {
        return this.$route.params.vacancyId;
      }
    },
    data() {
      const model = {
        position: null,
        description: null,
        questions: []
      };

      // form validate rules
      const rules = {
        companyName: [
          {required: true, message: 'Необходимо ввести название вакансии'}
        ]
      };

      return {model: model, rules: rules, error: null, loading: false};
    },
    created() {
      // initial data
      this.loadVacancy();
    },
    methods: {
      loadVacancy() {
        // toggle loading
        this.loading = true;
        return axios.get('https://vi-hr.com:8082/api/v1/vacancies/' + this.vacancyId)
          .then(res => {
            // response
            this.model = res.data;
            // toggle loading
            this.loading = false;
          })
          .catch(err => {
            // handle error
            console.error(err);
            this.loading = false;
          });
      },
      submit(ref) {
        // form validate
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false;
          }

          // validated
          this.error = null;
          this.loading = true;

          let description = this.model.description;
          let position = this.model.position;
          let data = {
            'description': description,
            'position': position
          };
          return axios.put('https://vi-hr.com:8082/api/v1/vacancies/' + this.vacancyId, data)
            .then(res => {
              this.loading = false;
            }).catch(err => {
              // handle error
              console.error(err);
              this.loading = false;
            });

        });
      }
    }
  };
</script>
