<template>
    <div>
        <!--<app-header />-->
        <section class="main">
            <app-sidebar />
            <main class="content">
                <transition name="fade">
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
        this.$store.dispatch('getUserAndCompany')
          .then(this.getVacancies);
      }
    }
  };
</script>

<style lang="scss">
    .main {
        display: flex;
        overflow: hidden;
    }

    .content {
        background-color: #f1f1f1;
        flex-grow: 1;
        padding: 1.5rem;
        overflow: auto;

        h1 {
            margin-top: 0;
        }
    }
</style>
