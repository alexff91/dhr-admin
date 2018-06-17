<template>
    <div class="sidebar">

        <nav>
            <router-link :to="'/'" class="sidebar-item heading-item">
                <img src="../../assets/images/logo.png">
                <span>Dashboard</span>
            </router-link>
        </nav>

        <nav class="top-menu">

            <router-link :to="'/new-vacancy'" active-class="is-active" class="sidebar-button" exact>
                <vk-icon icon="plus-circle" class="icon" ratio=".75"></vk-icon>
                <span>Новая вакансия</span>
            </router-link>

            <router-link :to="'/'" active-class="is-active" class="sidebar-item" exact>
                <vk-icon icon="list" class="icon"></vk-icon>
                <span>Вакансии</span>
            </router-link>
            <router-link :to="'/skills'" active-class="is-active" class="sidebar-item" exact>
                <vk-icon icon="users" class="icon"></vk-icon>
                <span>Навыки кандидатов</span>
            </router-link>
            <router-link :to="'/company-settings'" active-class="is-active" class="sidebar-item" exact>
                <vk-icon icon="cog" class="icon"></vk-icon>
                <span>Настройка компании</span>
            </router-link>
        </nav>

        <nav class="secondary-menu">
            <button class="sidebar-item" @click="logout">
                <vk-icon icon="sign-out" class="icon"></vk-icon>
                <span>Выйти</span>
            </button>
        </nav>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MenuList from './menu';

  export default {
    name: 'app-sidebar',
    components: {MenuList},
    computed: mapGetters({
      sidebar: 'sidebar'
    }),
    methods: {
      logout() {
        this.$store.dispatch('deleteToken');
        this.$store.dispatch('clearUserAndCompany');
        this.$router.replace({path: '/login'});
      }
    }

  };
</script>

<style lang="scss">
    @import "../../assets/styles/variables";

    .sidebar {
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        width: 250px;
        height: 100%;
        background-color: #494D5D;
    }

    .sidebar-item, .sidebar-button {
        display: block;
        font-size: 14px;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        transition: all .1s linear;

        width: 100%;
        margin: 0 auto;
        padding: 1rem 1.5rem;

        .icon {
            vertical-align: middle;
            display: inline-flex;
        }
    }

    .sidebar-item {
        background-color: transparent;
        text-align: left;
        color: #B5BBCE;
        border-left: 3px solid transparent;

        &.is-active {
            color: #fff;
            background-color: #52576B;
            border-left: 3px solid $primary-color;

            .icon * {
                stroke: #fff;
            }
        }

        &:hover {
            background-color: #52576B;
        }

        .icon {
            margin-right: .75rem;

            * {
                stroke: #B5BBCE;
            }
        }
    }

    .sidebar-button {
        width: 80%;
        background-color: #24bb64;
        padding: .75rem 1.2rem;
        margin: 1rem auto;
        color: #fff;
        border-radius: 5px;
        text-align: center;

        &:hover {
            background-color: #25e384;
        }

        .icon {
            margin-right: .25rem;

            * {
                stroke: #fff;
            }
        }

        span {
            vertical-align: middle;
        }
    }

    .heading-item {
        background-color: #3C404E;
        font-size: 20px;
        color: $secondary-color;

        &:hover {
            background-color: #3C404E;
        }

        img {
            vertical-align: middle;
            width: 36px;
            margin-right: .5rem;
        }

        span {
            vertical-align: middle;
        }
    }

    .secondary-menu {
        margin-top: auto;
    }
</style>
