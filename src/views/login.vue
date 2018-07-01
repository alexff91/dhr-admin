<template>
    <section class="login">
        <header class="login-header">
            <img class="logo" src="../assets/images/logo.png">
        </header>
        <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="login-form"
                 label-position="top">
            <h2 class="heading">Вход</h2>
            <el-form-item prop="username">
                <el-input type="text" v-model="model.username" placeholder="Логин" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="model.password" placeholder="Пароль" />
            </el-form-item>
            <el-button type="primary" :loading="loading" @click="submit('login-form')">{{ loading ? 'Загрузка...' :
                'Войти' }}
            </el-button>

            <br><br>

            <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon />
        </el-form>
    </section>
</template>

<script>
  export default {
    name: 'login',
    data() {
      const model = {
        username: '',
        password: ''
      };

      const rules = {
        username: [
          {required: true, message: 'Необходимо ввести имя пользователя'},
          {min: 2, max: 16, message: 'Минимальное количество символов 2, максимальное 16'}
        ],
        password: [
          {required: true, message: 'Необходимо ввести пароль'},
          {min: 6, max: 16, message: 'Минимальное количество символов 6, максимальное 16'}
        ]
      };

      return {model: model, rules: rules, error: null, loading: false};
    },

    created() {
      this.$title('Вход');
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

          // create token from remote
          this.$store.dispatch('createToken', this.model)
            .then(() => {
              this.$router.replace({path: this.$route.query.redirect || '/'});
              this.loading = false;
            })
            .catch(err => {
              this.error = {title: 'Ошибка', message: 'Неверный логин или пароль！'};
              switch (err.response && err.response.status) {
              case 401:
                this.error.message = 'Не удалось авторизироваться！';
                break;
              case 500:
                this.error.message = 'Ошибка сервера！';
                break;
              }
              this.loading = false;
            });
        });
      }
    }
  };
</script>

<style lang="scss">

    .login {
        flex: 1;
        width: 95%;
        max-width: 22rem;
        margin: 2rem auto 0;
        font-size: .875rem;

        &-header {
            margin-bottom: 1rem;
            text-align: center;

            img {
                width: 75px;
                height: 75px;
            }

            .brand {
                margin: 4.5rem 0 3.5rem;
                text-align: center;
                letter-spacing: .125rem;

                a {
                    margin: 0;
                    font: 300 3rem sans-serif;
                }
            }
        }

        &-form {
            margin-bottom: 2.5rem;
            padding: 1.875rem 1.25rem;
            background: #f1f1f1;

            .heading {
                margin: 0 0 1rem;
                font-weight: 400;
                font-size: 1.5rem;
            }

            .el-button {
                margin-top: .5rem;
                width: 100%;
            }
        }
    }
</style>
