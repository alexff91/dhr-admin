<template>
    <div>
        <!--<app-header />-->
        <section class="main">
            <app-sidebar />
            <main class="content">
                <transition name="content">
                    <router-view class="inner" />
                </transition>
            </main>
        </section>
    </div>
</template>

<script>
  import Header from '../components/layout/header';
  import Sidebar from '../components/layout/sidebar';

  export default {
    name: 'layout',
    components: {
      'app-header': Header,
      'app-sidebar': Sidebar
    },
    created() {
      if (!this.$store.getters.company) {
        this.$store.dispatch('getUserAndCompany');
      }
    }
  };
</script>

<style lang="scss">
    .main {
        display: flex;
    }

    .content {
        flex-grow: 1;
        padding: 1.5rem;
        overflow: auto;

        .inner {
            max-width: 1200px;
        }

        h1 {
            margin-top: 0;
        }
    }
</style>
