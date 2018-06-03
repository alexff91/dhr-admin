<template>
    <div>
        <div class="heading">
            <h1 class="title">{{ title }}</h1>
        </div>
        <el-form class="edit-form" auto-complete="on" :model="model" :rules="rules" ref="edit-form"
                 label-position="top">
            <h2 class="heading">Параметры компании</h2>
            <el-form-item label="Название компании" prop="companyName">
                <el-input type="text" v-model="model.companyName" placeholder="Введите название компании" />
            </el-form-item>
            <el-form-item label="Описание компании" prop="companyDescription">
                <el-input type="text" v-model="model.companyDescription" placeholder="Введите описание компании" />
            </el-form-item>
            <el-form-item label="Лого компании" prop="companyLogoPath">
                <el-input type="text" v-model="model.companyLogoPath" placeholder="Введите путь к логотипу компании" />
            </el-form-item>
            <el-button type="primary">Загрузить лого<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button :plain="true" type="success" :loading="loading" @click="submit('edit-form')">{{ loading ?
                'Loading...' :
                'Сохранить' }}
            </el-button>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'settings',

    computed: {
      title() {
        const dist = {
          general: 'Настройки'
        };
        return dist[this.$route.params.type];
      }
    },
    data() {
      const model = {
        companyName: null,
        companyDescription: null,
        companyLogoPath: null
      };

      // form validate rules
      const rules = {
        companyName: [
          {required: true, message: 'Необходимо ввести имя компании'}
        ]
      };

      return {model: model, rules: rules, error: null, loading: false};
    },
    created() {
      // initial data
      this.loadCompany();
    },
    methods: {
      loadCompany() {
        // toggle loading
        this.loading = true;
        return this.$services.company.get("/1")
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

          return this.$services.company.get("/1")
            .then(res => {
              // response
              res.data.companyDescription = this.model.companyDescription;
              res.data.companyName = this.model.companyName;
              res.data.companyLogoPath = this.model.companyLogoPath;
              return this.$services.company.post(res.data)
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
