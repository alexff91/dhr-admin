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
            <router-link :to="{ name: 'new', params: { type: $route.params.type } }">
                <el-button type="primary" size="small" icon="el-icon-edit">写{{ type }}</el-button>
            </router-link>
        </div>
        <el-table :data="vacancies" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="position" label="Позиция" show-overflow-tooltip />
            <el-table-column prop="description" label="Описание" show-overflow-tooltip />
            <el-table-column prop="userId" label="Автор" width="100">
            </el-table-column>
            <el-table-column prop="creationDate" label="Дата создания" width="120" />
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="4"
                :page-sizes="[50, 100, 150, 200]"
                :page-size="50"
                :total="400">
        </el-pagination>
    </div>
</template>

<script>
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
        return this.$services.vacancies.get({params})
          .then(res => {
            // response
            this.vacancies = res.data;
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
