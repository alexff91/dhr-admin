<template>
    <div>
        <div class="heading">
            <h1 class="title" v-if="selections.length">{{ selections.length }} items selected</h1>
            <h1 class="title" v-else>{{ vacancies.length }} {{ type }}</h1>
            <transition name="fade">
                <ul class="action" v-show="selections.length">
                    <li><a href="#" class="icon-before icon-checkmark"></a></li>
                    <li><a href="#" class="icon-before icon-blocked"></a></li>
                    <li><a href="#" class="icon-before icon-bin"></a></li>
                    <li><a href="#" class="icon-before icon-copy"></a></li>
                </ul>
            </transition>
            <div class="search icon-before icon-search">
                <input type="text" placeholder="Search">
            </div>
            <router-link :to="{ name: 'newVacancy'}">
                <el-button type="primary" size="small" icon="el-icon-edit">Создать вакансию</el-button>
            </router-link>
        </div>
        <el-table v-if="vacancies.length" :data="vacancies" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="position" label="Позиция" show-overflow-tooltip />
            <!--<el-table-column prop="description" label="Описание" show-overflow-tooltip />-->
            <el-table-column prop="userId" label="Автор" width="100" />
            <el-table-column prop="creationDate" type="date" label="Дата создания" width="160" />
            <el-table-column prop="description" label="Описание" show-overflow-tooltip />
            <el-table-column prop="creationDate" type="date" label="Дата создания" width="120" />
            <el-table-column
                    label="Команды">
                <template slot-scope="scope">
                    <router-link :to="{ path: '/updateVacancy/'+scope.row.id }">
                        <el-button type="warning" size="mini" icon="el-icon-edit">Изменить</el-button>
                    </router-link>
                    <el-button
                            size="mini"
                            type="danger" icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)">Удалить
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'vacancies',

    data() {
      return {
        type: '',
        size: 50,
        vacancies: [],
        selections: []
      };
    },

    created() {
      this.$title(this.$route.params.type);
      this.loadVacancies();
    },

    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      loadVacancies() {
        // toggle loading
        this.loading = true;
        // paginate
        const params = {_page: this.page, _limit: this.size};
        // sort
        if (this.sort) {
          params._sort = this.sort;
        }
        if (this.order) {
          params._order = this.order;
        }
        // search
        if (this.search) {
          params.q = this.search;
        }
        // filter
        Object.assign(params, this.filter);
        // request
        return axios.get('https://vi-hr.com:8082/api/v1/companies/1/vacancies')
          .then(res => {
            // response
            this.vacancies = res.data;

            this.vacancies.forEach(vacancy => {
              vacancy.creationDate = new Date(vacancy.creationDate).toLocaleString();
            });

            this.total = res.headers['x-total-count'] - 0;
            // toggle loading
            this.loading = false;
          })
          .catch(err => {
            // handle error
            console.error(err);
            this.loading = false;
          });
        switch (this.$route.params.type) {
        case 'vacancy':
          this.type = 'Вакансий';
          break;
        }
      },
      handleSelectionChange(value) {
        this.selections = value;
      },
      handleSizeChange(value) {
        this.size = value;
        this.initData();
      },
      handleCurrentChange(value) {
        this.currentPage = value;
      }
    },

    // https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html#响应路由参数的变化
    // https://router.vuejs.org/zh-cn/advanced/data-fetching.html
    watch: {
      $route() {
        this.initData();
      }
    }
  };
</script>

<style>
    .el-pagination {
        margin: 1rem 0 2rem;
        text-align: right;
    }
</style>
