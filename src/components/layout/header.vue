<template>
    <header class="header">
        <h1 class="brand">
            <router-link to="/">{{ header.name }}</router-link>
        </h1>
        <nav class="toolbar">
            <menu-list :items="header.menus" />
            <ul class="list">
                <li class="item">
                    <a href="#" v-if="session.user">
                        Привет, {{ session.user.name }}!
                    </a>
                    <ul class="list">
                        <li class="item">
                            <router-link :to="{ name: 'profile' }">Profile</router-link>
                        </li>
                        <li class="item">
                            <router-link :to="{ name: 'profile' }">Edit profile</router-link>
                        </li>
                        <li class="divider"></li>
                        <li class="item"><a href="#" @click.prevent="logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MenuList from './menu';

  export default {
    name: 'app-header',

    components: {MenuList},

    computed: mapGetters({
      header: 'header',
      session: 'session'
    }),

    created() {
    },

    methods: {
      logout() {
        this.$store.dispatch('deleteToken');
        this.$store.dispatch('clearUserAndCompany');
        this.$router.replace({path: '/login'});
      }
    }
  };
</script>
