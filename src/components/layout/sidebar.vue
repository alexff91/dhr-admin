<template>
    <div class="sidebar">
        <el-menu default-active="1"
                 router
                 class="el-menu-vertical-demo">

            <el-menu-item index="1" :route="'/'">
                <i class="el-icon-menu"></i>
                <span>Вакансии</span>
            </el-menu-item>

            <el-menu-item index="2" :route="'/new-vacancy'">
                <i class="el-icon-plus"></i>
                <span>Новая вакансия</span>
            </el-menu-item>

            <el-menu-item index="3" :route="'/responses'">
                <i class="el-icon-document"></i>
                <span>Отклики кандидатов</span>
            </el-menu-item>
            <el-menu-item index="4" :route="'/company-settings'">
                <i class="el-icon-setting"></i>
                <span>Настройка компании</span>
            </el-menu-item>
        </el-menu>
    </div>
    <!--<aside class="sidebar" :class="{ collapse: sidebar.collapse }">-->
    <!--<nav class="menu">-->
    <!--<menu-list :items="sidebar.menus" active-class />-->
    <!--</nav>-->
    <!--<footer class="footer">-->
    <!--<a class="toggle icon-before icon-circle-left" title="Toggle navigation menu" @click="toggleCollapse"></a>-->
    <!--</footer>-->
    <!--</aside>-->
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import MenuList from './menu';

  export default {
    name: 'app-sidebar',
    components: {MenuList},
    computed: mapGetters({
      sidebar: 'sidebar'
    }),
    methods: mapActions({
      toggleCollapse: 'toggleSidebarCollapse'
    })
  };
</script>

<style lang="scss">
    .sidebar {
        width: 250px;
        height: 100%;
    }

    .badge-item {
        .el-badge__content {
            color: red;
        }
    }
</style>
