<template>
    <div>
        <div class="heading">
            <h1 class="title">Новая вакансия</h1>
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
            <el-button :plain="true" type="success" :loading="loading" @click="submit('edit-form')">
                {{ loading ? 'Loading...' : 'Сохранить' }}
            </el-button>
        </el-form>
    </div>

</template>

<script>
  import { VueEditor } from 'vue2-editor';
  import axios from 'axios';

  export default {
    name: 'newVacancy',
    components: {
      VueEditor
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

    },
    methods: {
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
          return axios.post('https://vi-hr.com:8082/api/v1/companies/1/vacancies',data)
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
