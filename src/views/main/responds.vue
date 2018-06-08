<template>
    <div>
        <div class="headinSg">
            <h1 class="title" v-if="selections.length">{{ selections.length }} выбрано</h1>
            <h1 class="title" v-else>{{ responds.length }} откликов на вакансию</h1>
            <transition name="fade">
                <ul class="action" v-show="selections.length">
                    <li><a href="#" class="icon-before icon-checkmark"></a></li>
                    <li><a href="#" class="icon-before icon-blocked"></a></li>
                    <li><a href="#" class="icon-before icon-bin"></a></li>
                </ul>
            </transition>
            <div class="search icon-before icon-search">
                <input type="text" placeholder="Поиск">
            </div>
        </div>
        <el-table :data="responds" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="name" label="Позиция" show-overflow-tooltip />
            <el-table-column prop="lastName" label="Описание" show-overflow-tooltip />
            <el-table-column prop="startDate" type="date" label="Дата создания" width="120" />
            <el-table-column prop="status" label="Статус" width="120" />
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
    name: 'responds',

    data() {
      return {
        type: '',
        size: 50,
        responds: [],
        selections: []
      };
    },

    created() {
      this.loadResponds();
    },

    methods: {
      handleSelectionChange(value) {
        this.selections = value;
      },
      handleSizeChange(value) {
        this.size = value;
        this.initData();
      },
      handleCurrentChange(value) {
        this.currentPage = value;
      },
      loadResponds() {
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
        return this.$services.vacancies.get('/1/responds/')
          .then(res => {
            // response
            this.responds = res.data;
            this.total = res.headers['x-total-count'] - 0;
            // toggle loading
            this.loading = false;
          })
          .catch(err => {
            // handle error
            console.error(err);
            this.loading = false;
          });
      }

    },
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
