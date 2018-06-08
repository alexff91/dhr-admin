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
      // initial data
      this.loadVacancy();
    },
    methods: {
      loadVacancy() {
        // toggle loading
        this.loading = true;
        return this.$services.vacancies.get('/1')
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

          return this.$services.vacancies.get('/1')
            .then(res => {
              // response
              res.data.description = this.model.description;
              res.data.position = this.model.position;
              return this.$services.vacancies.post(res.data)
                .then(res => {
                  this.loading = false;
                }).catch(err => {
                  // handle error
                  console.error(err);
                  this.loading = false;
                });
            })
            .catch(err => {
              // handle error
              console.error(err);
              this.loading = false;
            });
        });
      }
    }
  };
</script>
